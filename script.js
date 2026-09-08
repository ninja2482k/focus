/* Focus Me client-side application logic */

const STORAGE_KEYS = {
  settings: 'userSettings',
  tasks: 'focusMeTasks',
  activity: 'focusMeActivity'
};

const DEFAULT_TASKS = [
  { id: 'default-1', name: 'Finish dashboard UI', time: '', completed: true, createdAt: new Date().toISOString() },
  { id: 'default-2', name: 'Add authentication', time: '', completed: true, createdAt: new Date().toISOString() },
  { id: 'default-3', name: 'Polish styles', time: '', completed: true, createdAt: new Date().toISOString() },
  { id: 'default-4', name: 'Demo Task: Connect backend', time: '', completed: false, createdAt: new Date().toISOString() }
];

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch (error) {
    console.warn(`Unable to read ${key} from localStorage.`, error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Unable to save ${key} to localStorage.`, error);
    return false;
  }
}

function isValidTask(task) {
  return task &&
    typeof task.id === 'string' &&
    typeof task.name === 'string' &&
    task.name.length > 0 && task.name.length <= 120 &&
    typeof task.time === 'string' &&
    typeof task.completed === 'boolean';
}

function getTasks() {
  const tasks = readStorage(STORAGE_KEYS.tasks, null);
  if (!Array.isArray(tasks)) {
    writeStorage(STORAGE_KEYS.tasks, DEFAULT_TASKS);
    return DEFAULT_TASKS.map(task => ({ ...task }));
  }
  return tasks.filter(isValidTask);
}

function saveTasks(tasks) {
  return writeStorage(STORAGE_KEYS.tasks, tasks.filter(isValidTask));
}

function getActivity() {
  const activity = readStorage(STORAGE_KEYS.activity, {});
  if (!activity || typeof activity !== 'object' || Array.isArray(activity)) return {};
  return activity;
}

function saveActivity(activity) {
  return writeStorage(STORAGE_KEYS.activity, activity);
}

function recordActivity(date = new Date()) {
  const key = date.toISOString().slice(0, 10);
  const activity = getActivity();
  activity[key] = Number.isFinite(activity[key]) ? Math.max(0, activity[key]) + 1 : 1;
  saveActivity(activity);
}

function getSettingsFromForm() {
  const checkboxValues = selector => Array.from(document.querySelectorAll(selector)).map(input => input.checked);
  const notifications = checkboxValues('#notifications input[type="checkbox"]');
  const themeUi = checkboxValues('#theme-ui input[type="checkbox"]');
  const soundMusic = checkboxValues('#sound-music input[type="checkbox"]');

  return {
    profilePhoto: document.getElementById('profile-photo-preview')?.src || '',
    username: document.getElementById('username')?.value || '',
    email: document.getElementById('email')?.value || '',
    bio: document.getElementById('bio')?.value || '',
    timezone: document.getElementById('timezone')?.value || '',
    notifications: {
      email: !!notifications[0],
      daily: !!notifications[1],
      weekly: !!notifications[2],
      goal: !!notifications[3],
      streak: !!notifications[4],
      reminderTime: document.getElementById('notification-time')?.value || ''
    },
    theme: document.getElementById('theme')?.value || '',
    accentColor: document.getElementById('accent-color')?.value || '',
    language: document.getElementById('language')?.value || '',
    showAnimations: !!themeUi[0],
    compactMode: !!themeUi[1],
    masterVolume: document.getElementById('master-volume')?.value || '70',
    taskCompletionSounds: !!soundMusic[0],
    breakTimeAlerts: !!soundMusic[1],
    breakSound: document.getElementById('break-sound')?.value || ''
  };
}

function setSettingsToForm(settings) {
  if (!settings || typeof settings !== 'object') return;

  const setValue = (id, value) => {
    const element = document.getElementById(id);
    if (element && typeof value === 'string') element.value = value;
  };

  const setChecked = (selector, values) => {
    const inputs = document.querySelectorAll(selector);
    values.forEach((value, index) => {
      if (inputs[index] && typeof value === 'boolean') inputs[index].checked = value;
    });
  };

  const photo = document.getElementById('profile-photo-preview');
  if (photo && typeof settings.profilePhoto === 'string' && settings.profilePhoto.startsWith('data:image/')) {
    photo.src = settings.profilePhoto;
  }

  setValue('username', settings.username);
  setValue('email', settings.email);
  setValue('bio', settings.bio);
  setValue('timezone', settings.timezone);
  setValue('theme', settings.theme);
  setValue('accent-color', settings.accentColor);
  setValue('language', settings.language);
  setValue('master-volume', settings.masterVolume);
  setValue('break-sound', settings.breakSound);

  const notifications = settings.notifications || {};
  setValue('notification-time', notifications.reminderTime);
  setChecked('#notifications input[type="checkbox"]', [
    !!notifications.email, !!notifications.daily, !!notifications.weekly,
    !!notifications.goal, !!notifications.streak
  ]);
  setChecked('#theme-ui input[type="checkbox"]', [!!settings.showAnimations, !!settings.compactMode]);
  setChecked('#sound-music input[type="checkbox"]', [!!settings.taskCompletionSounds, !!settings.breakTimeAlerts]);

  const volumeValue = document.querySelector('.volume-value');
  if (volumeValue) volumeValue.textContent = `${settings.masterVolume || '70'}%`;
}

function initAuthForms() {
  const loginToggle = document.getElementById('login-toggle');
  const signupToggle = document.getElementById('signup-toggle');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const formToggle = document.querySelector('.form-toggle');

  if (loginToggle && signupToggle && loginForm && signupForm && formToggle) {
    const showForm = form => {
      form.classList.remove('form-fade');
      void form.offsetWidth;
      form.classList.add('form-fade');
    };

    loginToggle.addEventListener('click', () => {
      loginToggle.classList.add('active');
      signupToggle.classList.remove('active');
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
      formToggle.classList.remove('signup-active');
      showForm(loginForm);
    });

    signupToggle.addEventListener('click', () => {
      signupToggle.classList.add('active');
      loginToggle.classList.remove('active');
      signupForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
      formToggle.classList.add('signup-active');
      showForm(signupForm);
    });

    showForm(loginForm);
  }

  const demoForms = [
    ['login-form', 'Login form submitted (demo only).'],
    ['signup-form', 'Signup form submitted (demo only).'],
    ['forgot-password-form', 'Password reset link sent (demo only).']
  ];

  demoForms.forEach(([id, message]) => {
    const form = document.getElementById(id);
    if (form) form.addEventListener('submit', event => {
      event.preventDefault();
      alert(message);
    });
  });

  const resetForm = document.getElementById('reset-password-form');
  if (resetForm) {
    resetForm.addEventListener('submit', event => {
      event.preventDefault();
      const inputs = resetForm.querySelectorAll('input[type="password"]');
      if (inputs.length >= 2 && inputs[0].value !== inputs[1].value) {
        alert('Passwords do not match.');
        return;
      }
      alert('Password reset successful (demo only).');
    });
  }
}

function initDashboard() {
  const taskList = document.querySelector('.task-list');
  if (!taskList) return;

  const renderTasks = () => {
    const tasks = getTasks();
    taskList.replaceChildren();

    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-item';

      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.setAttribute('aria-label', `Complete task: ${task.name}`);

      checkbox.addEventListener('change', () => {
        const currentTasks = getTasks();
        const currentTask = currentTasks.find(item => item.id === task.id);
        if (!currentTask) return;

        const wasCompleted = currentTask.completed;
        currentTask.completed = checkbox.checked;
        saveTasks(currentTasks);

        if (!wasCompleted && currentTask.completed) recordActivity();
        updateDashboardProgress();
        renderHeatmap();
      });

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(` ${task.name}`));

      if (task.time) {
        const time = document.createElement('span');
        time.className = 'task-time';
        time.textContent = `(Time: ${task.time})`;
        label.appendChild(document.createTextNode(' '));
        label.appendChild(time);
      }

      li.appendChild(label);
      taskList.appendChild(li);
    });
  };

  const updateDashboardProgress = () => {
    const tasks = getTasks();
    const completed = tasks.filter(task => task.completed).length;
    const xp = completed * 25;
    const maxXP = Math.max(100, Math.ceil((xp + 1) / 100) * 100);
    const level = Math.max(1, Math.floor(xp / 100) + 1);
    const currentLevelXP = xp % 100;

    const fill = document.querySelector('.expbar-fill');
    const label = document.querySelector('.expbar-label');
    const levelNumber = document.querySelector('.level-number');
    if (fill) fill.style.width = `${currentLevelXP}%`;
    if (label) label.textContent = `${currentLevelXP}/${maxXP === 100 ? 100 : 100} XP`;
    if (levelNumber) levelNumber.textContent = String(level);
  };

  const quotes = [
    'Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill',
    'The only way to do great work is to love what you do. – Steve Jobs',
    'Don’t watch the clock; do what it does. Keep going. – Sam Levenson',
    'Believe you can and you’re halfway there. – Theodore Roosevelt',
    'It always seems impossible until it’s done. – Nelson Mandela',
    'Start where you are. Use what you have. Do what you can. – Arthur Ashe',
    'You don’t have to be great to start, but you have to start to be great. – Zig Ziglar',
    'Dream big and dare to fail. – Norman Vaughan'
  ];

  const quoteEl = document.getElementById('motivation-quote');
  if (quoteEl) {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.textContent = '';
    quoteEl.classList.add('typewriter');
    let index = 0;
    const typeWriter = () => {
      if (index < quote.length) {
        quoteEl.textContent += quote.charAt(index++);
        setTimeout(typeWriter, 28);
      } else {
        quoteEl.classList.remove('typewriter');
      }
    };
    typeWriter();
  }

  const logo = document.querySelector('.logo.dashboard-logo');
  if (logo) {
    logo.style.opacity = '0';
    logo.style.transform = 'translateX(-60px)';
    void logo.offsetWidth;
    logo.style.animation = 'logoSlideIn 1s cubic-bezier(0.77,0,0.175,1) 0.2s forwards';
  }

  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.classList.add('panel-transition');
    setTimeout(() => mainContent.classList.add('panel-visible'), 50);
  }

  const addTaskBtn = document.querySelector('.add-task');
  const addTaskModal = document.getElementById('addTaskModal');
  const closeModal = document.getElementById('closeModal');
  const taskForm = document.getElementById('taskForm');
  const taskNameInput = document.getElementById('taskName');
  const taskTimeInput = document.getElementById('taskTime');

  if (addTaskBtn && addTaskModal && closeModal && taskForm && taskNameInput && taskTimeInput) {
    addTaskBtn.addEventListener('click', () => {
      addTaskModal.style.display = 'block';
      taskNameInput.focus();
    });
    closeModal.addEventListener('click', () => { addTaskModal.style.display = 'none'; });
    window.addEventListener('click', event => {
      if (event.target === addTaskModal) addTaskModal.style.display = 'none';
    });

    taskForm.addEventListener('submit', event => {
      event.preventDefault();
      const taskName = taskNameInput.value.trim();
      const taskTime = taskTimeInput.value;

      if (!taskName || taskName.length > 120 || !taskTime) return;

      const tasks = getTasks();
      tasks.push({
        id: crypto.randomUUID ? crypto.randomUUID() : `task-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: taskName,
        time: taskTime,
        completed: false,
        createdAt: new Date().toISOString()
      });
      saveTasks(tasks);
      renderTasks();
      updateDashboardProgress();
      taskForm.reset();
      addTaskModal.style.display = 'none';
    });
  }

  renderTasks();
  updateDashboardProgress();
  renderHeatmap();

  const dashboardPhoto = document.getElementById('dashboard-profile-photo');
  const savedSettings = readStorage(STORAGE_KEYS.settings, null);
  if (dashboardPhoto && savedSettings?.profilePhoto?.startsWith('data:image/')) {
    dashboardPhoto.src = savedSettings.profilePhoto;
  }
}

function renderHeatmap() {
  const heatmap = document.getElementById('heatmap');
  if (!heatmap) return;

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = new Date().getFullYear();
  const firstDay = new Date(year, 0, 1);
  const start = new Date(firstDay);
  const day = start.getDay();
  const offset = day === 0 ? 6 : day - 1;
  start.setDate(start.getDate() - offset);
  const lastDay = new Date(year, 11, 31);
  const activity = getActivity();
  const allDates = [];

  for (const cursor = new Date(start); cursor <= lastDay; cursor.setDate(cursor.getDate() + 1)) {
    allDates.push(new Date(cursor));
  }

  const weeks = Math.ceil(allDates.length / 7);
  const oldMonths = heatmap.parentNode?.querySelector('.months-row');
  if (oldMonths) oldMonths.remove();

  const monthsRow = document.createElement('div');
  monthsRow.className = 'months-row';
  let lastMonth = -1;
  for (let week = 0; week < weeks; week++) {
    const date = allDates[week * 7];
    const label = document.createElement('span');
    label.className = 'month-label';
    label.textContent = date && date.getMonth() !== lastMonth ? monthsNames[date.getMonth()] : '';
    if (date) lastMonth = date.getMonth();
    monthsRow.appendChild(label);
  }
  heatmap.parentNode.insertBefore(monthsRow, heatmap);

  const heatmapBody = document.createElement('div');
  heatmapBody.className = 'heatmap-body';
  const daysColumn = document.createElement('div');
  daysColumn.className = 'days-column';
  daysOfWeek.forEach(dayName => {
    const label = document.createElement('span');
    label.className = 'day-label';
    label.textContent = dayName;
    daysColumn.appendChild(label);
  });
  heatmapBody.appendChild(daysColumn);

  const grid = document.createElement('div');
  grid.className = 'heatmap-grid';
  for (let week = 0; week < weeks; week++) {
    const weekCol = document.createElement('div');
    weekCol.className = 'heatmap-col';
    weekCol.style.display = 'contents';
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const dateIndex = week * 7 + dayIndex;
      if (dateIndex >= allDates.length) break;
      const date = allDates[dateIndex];
      const dateKey = date.toISOString().slice(0, 10);
      const count = Math.min(4, Math.max(0, Number(activity[dateKey]) || 0));
      const cell = document.createElement('span');
      cell.className = `cell level-${count}`;
      cell.title = `${dateKey}: ${activity[dateKey] || 0} contributions`;
      weekCol.appendChild(cell);
    }
    grid.appendChild(weekCol);
  }
  heatmapBody.appendChild(grid);
  heatmap.replaceChildren(heatmapBody);
}

function initSettings() {
  const settingsContent = document.querySelector('.settings-content');
  if (!settingsContent) return;

  const savedSettings = readStorage(STORAGE_KEYS.settings, null);
  if (savedSettings) setSettingsToForm(savedSettings);

  const masterVolumeSlider = document.getElementById('master-volume');
  const volumeValue = document.querySelector('.volume-value');
  if (masterVolumeSlider && volumeValue) {
    masterVolumeSlider.addEventListener('input', () => {
      volumeValue.textContent = `${masterVolumeSlider.value}%`;
    });
    volumeValue.textContent = `${masterVolumeSlider.value}%`;
  }

  const navItems = document.querySelectorAll('.nav-item');
  const panels = document.querySelectorAll('.settings-panel');
  navItems.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      navItems.forEach(nav => nav.classList.remove('active'));
      panels.forEach(panel => panel.classList.remove('active'));
      item.classList.add('active');
      const target = document.getElementById(item.getAttribute('data-section'));
      if (target) target.classList.add('active');
    });
  });

  const saveButton = settingsContent.querySelector('.btn-primary');
  if (saveButton) {
    saveButton.addEventListener('click', event => {
      event.preventDefault();
      const settings = getSettingsFromForm();
      if (writeStorage(STORAGE_KEYS.settings, settings)) {
        if (settings.profilePhoto) writeStorage('profilePhoto', settings.profilePhoto);
        alert('Settings saved successfully!');
      } else {
        alert('Unable to save settings. Your browser storage may be full.');
      }
    });
  }

  const cancelButton = settingsContent.querySelector('.btn-secondary');
  if (cancelButton) {
    cancelButton.addEventListener('click', event => {
      event.preventDefault();
      const current = readStorage(STORAGE_KEYS.settings, null);
      if (current) setSettingsToForm(current);
      alert('Changes cancelled.');
    });
  }

  const deleteButton = settingsContent.querySelector('.btn-danger');
  if (deleteButton) {
    deleteButton.addEventListener('click', event => {
      event.preventDefault();
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        alert('Account deletion requested (demo only).');
      }
    });
  }

  settingsContent.querySelectorAll('.btn-secondary').forEach(button => {
    if (button.textContent.includes('Export')) {
      button.addEventListener('click', event => {
        event.preventDefault();
        const data = {
          settings: readStorage(STORAGE_KEYS.settings, {}),
          tasks: getTasks(),
          activity: getActivity()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'focus-me-data.json';
        link.click();
        URL.revokeObjectURL(url);
      });
    }
  });

  const photoInput = document.getElementById('profile-photo-input');
  const photoPreview = document.getElementById('profile-photo-preview');
  const uploadBtn = document.getElementById('upload-photo-btn');
  const MAX_IMAGE_SIZE = 1.5 * 1024 * 1024;

  if (uploadBtn && photoInput && photoPreview) {
    uploadBtn.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', event => {
      const file = event.target.files?.[0];
      if (!file) return;
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please choose a JPG, PNG, or WebP image.');
        photoInput.value = '';
        return;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        alert('Please choose an image smaller than 1.5 MB.');
        photoInput.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string' && reader.result.startsWith('data:image/')) {
          photoPreview.src = reader.result;
        }
      };
      reader.onerror = () => alert('Unable to read that image.');
      reader.readAsDataURL(file);
    });
  }

  const navItemsForAnimation = document.querySelectorAll('.settings-nav .nav-item');
  navItemsForAnimation.forEach((item, index) => {
    item.style.opacity = '0';
    setTimeout(() => {
      item.style.opacity = '';
      item.classList.remove('nav-animated');
      void item.offsetWidth;
      item.classList.add('nav-animated');
    }, 80 + index * 80);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initAuthForms();
  initDashboard();
  initSettings();
});
