// Only run login/signup toggle code on index.html
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
  const loginToggle = document.getElementById('login-toggle');
  const signupToggle = document.getElementById('signup-toggle');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const formToggle = document.querySelector('.form-toggle');

  if (loginToggle && signupToggle && loginForm && signupForm && formToggle) {
    function animateFormShow(form) {
      form.classList.remove('form-fade');
      // Force reflow to restart animation
      void form.offsetWidth;
      form.classList.add('form-fade');
    }

    loginToggle.addEventListener('click', () => {
      loginToggle.classList.add('active');
      signupToggle.classList.remove('active');
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
      formToggle.classList.remove('signup-active');
      animateFormShow(loginForm);
    });

    signupToggle.addEventListener('click', () => {
      signupToggle.classList.add('active');
      loginToggle.classList.remove('active');
      signupForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
      formToggle.classList.add('signup-active');
      animateFormShow(signupForm);
    });
    // Initial animation for login form
    animateFormShow(loginForm);
  }
}

// --- GitHub-style Heatmap Generation ---
(function() {
  const heatmap = document.getElementById('heatmap');
  if (!heatmap) return;

  // Use Mon-Sun for day labels (chronological order)
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Get current year
  const year = new Date().getFullYear();
  // Find first Monday of the year
  let firstDay = new Date(year, 0, 1);
  while (firstDay.getDay() !== 1) { // 1 = Monday
    firstDay.setDate(firstDay.getDate() + 1);
  }
  // Find last day of the year
  const lastDay = new Date(year, 11, 31);

  // Build a list of all dates from first Monday to last day of year
  const allDates = [];
  let d = new Date(firstDay);
  while (d <= lastDay) {
    allDates.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }

  // Calculate number of weeks
  const totalDays = allDates.length;
  const weeks = Math.ceil(totalDays / 7);

  // Generate random data for demo: 0-4 contributions per day
  const data = allDates.map(() => Math.floor(Math.random() * 5));

  // --- Create months row ---
  const monthsRow = document.createElement('div');
  monthsRow.className = 'months-row';
  let lastMonth = null;
  for (let week = 0; week < weeks; week++) {
    // Get the month of the first day in this week
    const dateIndex = week * 7;
      const date = allDates[dateIndex];
      const month = date ? date.getMonth() : null;
    let showMonth = false;
      if (week === 0 || (month !== null && month !== lastMonth)) {
      showMonth = true;
        lastMonth = month;
    }
    const monthLabel = document.createElement('span');
    monthLabel.className = 'month-label';
    monthLabel.style.display = 'inline-block';
    monthLabel.style.width = '100%';
    monthLabel.style.textAlign = 'center';
    monthLabel.style.fontSize = '10px';
    monthLabel.style.color = '#bdbdbd';
      monthLabel.textContent = showMonth && month !== null ? monthsNames[month] : '';
    monthsRow.appendChild(monthLabel);
    }
  heatmap.parentNode.insertBefore(monthsRow, heatmap);

  // --- Create heatmap body (days column + grid) ---
  const heatmapBody = document.createElement('div');
  heatmapBody.className = 'heatmap-body';

  // Days column (Mon-Sun, all 7 rows, all labeled, no margin)
  const daysColumn = document.createElement('div');
  daysColumn.className = 'days-column';

  for (let i = 0; i < 7; i++) {
    const dayLabel = document.createElement('span');
    dayLabel.className = 'day-label';
      dayLabel.textContent = daysOfWeek[i];
    daysColumn.appendChild(dayLabel);
  }
  heatmapBody.appendChild(daysColumn);

  // Grid (weeks as columns)
  const grid = document.createElement('div');
  grid.className = 'heatmap-grid';
  for (let week = 0; week < weeks; week++) {
    const weekCol = document.createElement('div');
    weekCol.className = 'heatmap-col';
    weekCol.style.display = 'contents';
    for (let day = 0; day < 7; day++) {
      const dateIndex = week * 7 + day;
        if (dateIndex >= allDates.length) break;
      const cell = document.createElement('span');
        const count = data[dateIndex];
      cell.className = 'cell level-' + count;
        cell.title = `${allDates[dateIndex].toISOString().slice(0, 10)}: ${count} contributions`;
      weekCol.appendChild(cell);
    }
    grid.appendChild(weekCol);
  }
  heatmapBody.appendChild(grid);

  // Clear old grid and append new structure
  heatmap.innerHTML = '';
  heatmap.appendChild(heatmapBody);

  // Add animation classes to cells
  const cells = heatmap.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.style.opacity = '0';
    cell.style.transform = 'scale(0)';
    cell.style.transition = 'all 0.3s ease';
    
    // Stagger the animation
    setTimeout(() => {
      cell.style.opacity = '1';
      cell.style.transform = 'scale(1)';
    }, index * 10); // 10ms delay between each cell
  });
})();

// --- Motivation Quote Randomizer + Typewriter Effect ---
document.addEventListener('DOMContentLoaded', function() {
  // Dynamic EXP Bar for Dashboard
  if (window.location.pathname.endsWith('dashboard.html')) {
    // Example values; replace with real data as needed
    const currentXP = 120;
    const maxXP = 200;
    const percent = Math.min(100, (currentXP / maxXP) * 100);
    const fill = document.querySelector('.expbar-fill');
    const label = document.querySelector('.expbar-label');
    if (fill) fill.style.width = percent + '%';
    if (label) label.textContent = `${currentXP}/${maxXP} XP`;

    // --- Level Counter Animation ---
    const levelNumberEl = document.querySelector('.level-number');
    if (levelNumberEl) {
      const targetLevel = parseInt(levelNumberEl.textContent, 10) || 1;
      let current = 0;
      levelNumberEl.textContent = '0';
      const duration = 900; // ms
      const stepTime = Math.max(20, Math.floor(duration / targetLevel));
      function animateLevel() {
        if (current < targetLevel) {
          current++;
          levelNumberEl.textContent = current;
          setTimeout(animateLevel, stepTime);
        } else {
          levelNumberEl.textContent = targetLevel;
        }
      }
      animateLevel();
    }

    // --- Typewriter effect for motivation quote ---
    const quotes = [
      "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
      "The only way to do great work is to love what you do. – Steve Jobs",
      "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
      "Believe you can and you’re halfway there. – Theodore Roosevelt",
      "It always seems impossible until it’s done. – Nelson Mandela",
      "Start where you are. Use what you have. Do what you can. – Arthur Ashe",
      "You don’t have to be great to start, but you have to start to be great. – Zig Ziglar",
      "Dream big and dare to fail. – Norman Vaughan"
    ];
    const quoteEl = document.getElementById('motivation-quote');
    if (quoteEl) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      quoteEl.textContent = '';
      quoteEl.classList.add('typewriter');
      let i = 0;
      function typeWriter() {
        if (i < quote.length) {
          quoteEl.textContent += quote.charAt(i);
          i++;
          setTimeout(typeWriter, 28);
        } else {
          quoteEl.classList.remove('typewriter'); // Remove cursor after typing
        }
      }
      typeWriter();
    }

    // --- Logo slide-in (ensure re-animation on reload) ---
    const logo = document.querySelector('.logo.dashboard-logo');
    if (logo) {
      logo.style.opacity = '0';
      logo.style.transform = 'translateX(-60px)';
      // Force reflow to restart animation if needed
      void logo.offsetWidth;
      logo.style.animation = 'logoSlideIn 1s cubic-bezier(0.77,0,0.175,1) 0.2s forwards';
    }

    // --- Smooth Panel Transitions (basic setup) ---
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.classList.add('panel-transition');
      setTimeout(() => {
        mainContent.classList.add('panel-visible');
      }, 50);
    }
  }

  // --- Prevent default form submission for all forms ---
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Login form submitted (demo only).');
    });
  }

  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Signup form submitted (demo only).');
    });
  }

  const forgotForm = document.getElementById('forgot-password-form');
  if (forgotForm) {
    forgotForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Password reset link sent (demo only).');
    });
  }

  const resetForm = document.getElementById('reset-password-form');
  if (resetForm) {
    resetForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const inputs = resetForm.querySelectorAll('input[type="password"]');
      if (inputs.length >= 2) {
        const pw1 = inputs[0].value;
        const pw2 = inputs[1].value;
        if (pw1 !== pw2) {
          alert('Passwords do not match.');
          return;
        }
      }
      alert('Password reset successful (demo only).');
    });
  }

  // --- Settings Page Functionality ---
  const masterVolumeSlider = document.getElementById('master-volume');
  const volumeValue = document.querySelector('.volume-value');

  // Animate sidebar nav items on load
  if (window.location.pathname.endsWith('settings.html')) {
    document.addEventListener('DOMContentLoaded', function() {
      // Sidebar nav staggered animation
      const navItems = document.querySelectorAll('.settings-nav .nav-item');
      navItems.forEach((item, i) => {
        item.style.opacity = '0';
        setTimeout(() => {
          item.style.opacity = '';
          item.classList.remove('nav-animated');
          void item.offsetWidth;
          item.classList.add('nav-animated');
        }, 80 + i * 80);
      });
      // Animate form elements in active panel
      function animatePanel(panel) {
        const elems = panel.querySelectorAll('.setting-item, .settings-input, .checkbox-label, .upload-photo-btn');
        elems.forEach((el, i) => {
          el.style.opacity = '0';
          el.classList.remove('form-animated');
          setTimeout(() => {
            el.style.opacity = '';
            void el.offsetWidth;
            el.classList.add('form-animated');
          }, 100 + i * 60);
        });
      }
      // Animate initial panel
      const activePanel = document.querySelector('.settings-panel.active');
      if (activePanel) animatePanel(activePanel);
      // Animate on panel switch
      const navs = document.querySelectorAll('.nav-item');
      const panels = document.querySelectorAll('.settings-panel');
      navs.forEach(nav => {
        nav.addEventListener('click', function() {
          setTimeout(() => {
            const active = document.querySelector('.settings-panel.active');
            if (active) animatePanel(active);
          }, 10);
        });
      });
      // Profile photo glow on hover
      const photo = document.getElementById('profile-photo-preview');
      if (photo) {
        photo.addEventListener('mouseenter', () => photo.classList.add('glow'));
        photo.addEventListener('mouseleave', () => photo.classList.remove('glow'));
      }
      // Profile photo upload animation
      const photoInput = document.getElementById('profile-photo-input');
      if (photoInput && photo) {
        photoInput.addEventListener('change', function(e) {
          setTimeout(() => {
            photo.classList.remove('upload-anim');
            void photo.offsetWidth;
            photo.classList.add('upload-anim');
          }, 100);
        });
      }
    });
  }

  // Helper: Get all settings values from the form
  function getSettingsFromForm() {
    return {
      profilePhoto: document.getElementById('profile-photo-preview')?.src || '',
      username: document.getElementById('username')?.value || '',
      email: document.getElementById('email')?.value || '',
      bio: document.getElementById('bio')?.value || '',
      timezone: document.getElementById('timezone')?.value || '',
      notifications: {
        email: document.querySelector('#notifications input[type="checkbox"]:nth-of-type(1)')?.checked || false,
        daily: document.querySelector('#notifications input[type="checkbox"]:nth-of-type(2)')?.checked || false,
        weekly: document.querySelector('#notifications input[type="checkbox"]:nth-of-type(3)')?.checked || false,
        goal: document.querySelector('#notifications input[type="checkbox"]:nth-of-type(4)')?.checked || false,
        streak: document.querySelector('#notifications input[type="checkbox"]:nth-of-type(5)')?.checked || false,
        reminderTime: document.getElementById('notification-time')?.value || ''
      },
      theme: document.getElementById('theme')?.value || '',
      accentColor: document.getElementById('accent-color')?.value || '',
      language: document.getElementById('language')?.value || '',
      showAnimations: document.querySelector('#theme-ui input[type="checkbox"]:nth-of-type(1)')?.checked || false,
      compactMode: document.querySelector('#theme-ui input[type="checkbox"]:nth-of-type(2)')?.checked || false,
      masterVolume: document.getElementById('master-volume')?.value || '70',
      taskCompletionSounds: document.querySelector('#sound-music input[type="checkbox"]:nth-of-type(1)')?.checked || false,
      breakTimeAlerts: document.querySelector('#sound-music input[type="checkbox"]:nth-of-type(2)')?.checked || false,
      breakSound: document.getElementById('break-sound')?.value || ''
    };
  }

  // Helper: Set all settings values to the form
  function setSettingsToForm(settings) {
    if (!settings) return;
    if (settings.profilePhoto && document.getElementById('profile-photo-preview')) {
      document.getElementById('profile-photo-preview').src = settings.profilePhoto;
    }
    if (settings.username) document.getElementById('username').value = settings.username;
    if (settings.email) document.getElementById('email').value = settings.email;
    if (settings.bio) document.getElementById('bio').value = settings.bio;
    if (settings.timezone) document.getElementById('timezone').value = settings.timezone;
    if (settings.notifications) {
      const notif = settings.notifications;
      const notifChecks = document.querySelectorAll('#notifications input[type="checkbox"]');
      if (notifChecks[0]) notifChecks[0].checked = notif.email;
      if (notifChecks[1]) notifChecks[1].checked = notif.daily;
      if (notifChecks[2]) notifChecks[2].checked = notif.weekly;
      if (notifChecks[3]) notifChecks[3].checked = notif.goal;
      if (notifChecks[4]) notifChecks[4].checked = notif.streak;
      if (notif.reminderTime) document.getElementById('notification-time').value = notif.reminderTime;
    }
    if (settings.theme) document.getElementById('theme').value = settings.theme;
    if (settings.accentColor) document.getElementById('accent-color').value = settings.accentColor;
    if (settings.language) document.getElementById('language').value = settings.language;
    const themeChecks = document.querySelectorAll('#theme-ui input[type="checkbox"]');
    if (themeChecks[0]) themeChecks[0].checked = settings.showAnimations;
    if (themeChecks[1]) themeChecks[1].checked = settings.compactMode;
    if (settings.masterVolume) document.getElementById('master-volume').value = settings.masterVolume;
    if (volumeValue) volumeValue.textContent = (settings.masterVolume || '70') + '%';
    const soundChecks = document.querySelectorAll('#sound-music input[type="checkbox"]');
    if (soundChecks[0]) soundChecks[0].checked = settings.taskCompletionSounds;
    if (soundChecks[1]) soundChecks[1].checked = settings.breakTimeAlerts;
    if (settings.breakSound) document.getElementById('break-sound').value = settings.breakSound;
  }

  // On DOMContentLoaded, load settings from localStorage
  if (window.location.pathname.endsWith('settings.html')) {
    document.addEventListener('DOMContentLoaded', function() {
      const savedSettings = localStorage.getItem('userSettings');
      if (savedSettings) {
        try {
          setSettingsToForm(JSON.parse(savedSettings));
        } catch (e) {}
      }
    });
  }

  if (masterVolumeSlider && volumeValue) {
    masterVolumeSlider.addEventListener('input', function() {
      volumeValue.textContent = this.value + '%';
    });
    volumeValue.textContent = masterVolumeSlider.value + '%';
  }

  // Settings sidebar navigation
  const navItems = document.querySelectorAll('.nav-item');
  const settingsPanels = document.querySelectorAll('.settings-panel');
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      navItems.forEach(nav => nav.classList.remove('active'));
      settingsPanels.forEach(panel => panel.classList.remove('active'));
      this.classList.add('active');
      const targetSection = this.getAttribute('data-section');
      const targetPanel = document.getElementById(targetSection);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // Settings form handling
  const settingsForm = document.querySelector('.settings-content');
  if (settingsForm) {
    const saveButton = settingsForm.querySelector('.btn-primary');
    const cancelButton = settingsForm.querySelector('.btn-secondary');

    if (saveButton) {
      saveButton.addEventListener('click', function(e) {
        e.preventDefault();
        // Save all settings to localStorage
        const settings = getSettingsFromForm();
        localStorage.setItem('userSettings', JSON.stringify(settings));
        alert('Settings saved successfully!');
      });
    }

    if (cancelButton) {
      cancelButton.addEventListener('click', function(e) {
        e.preventDefault();
        // Reset form to saved values
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
          setSettingsToForm(JSON.parse(savedSettings));
        }
        alert('Changes cancelled.');
      });
    }

    // Handle danger buttons
    const deleteButton = settingsForm.querySelector('.btn-danger');
    if (deleteButton) {
      deleteButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
          alert('Account deletion requested (demo only).');
        }
      });
    }

    // Handle export buttons
    const exportButtons = settingsForm.querySelectorAll('.btn-secondary');
    exportButtons.forEach(button => {
      if (button.textContent.includes('Export')) {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          alert('Export functionality (demo only).');
        });
      }
    });
  }
});

// --- Profile Photo Upload & Preview for Settings Page ---
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith('settings.html')) {
    const photoInput = document.getElementById('profile-photo-input');
    const photoPreview = document.getElementById('profile-photo-preview');
    const uploadBtn = document.getElementById('upload-photo-btn');
    // Load photo from settings, not localStorage directly
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings && photoPreview) {
      try {
        const settings = JSON.parse(savedSettings);
        if (settings.profilePhoto) photoPreview.src = settings.profilePhoto;
      } catch (e) {}
    }
    if (uploadBtn && photoInput && photoPreview) {
      uploadBtn.addEventListener('click', function() {
        photoInput.click();
      });
      photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function(evt) {
            // Only update preview, do not save yet
            photoPreview.src = evt.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }
});

// --- Add Task Modal Logic ---
document.addEventListener('DOMContentLoaded', function() {
  const addTaskBtn = document.querySelector('.add-task');
  const addTaskModal = document.getElementById('addTaskModal');
  const closeModal = document.getElementById('closeModal');
  const taskForm = document.getElementById('taskForm');

  if (addTaskBtn && addTaskModal && closeModal && taskForm) {
    addTaskBtn.addEventListener('click', function() {
      addTaskModal.style.display = 'block';
    });
    closeModal.addEventListener('click', function() {
      addTaskModal.style.display = 'none';
    });
    window.addEventListener('click', function(event) {
      if (event.target === addTaskModal) {
        addTaskModal.style.display = 'none';
      }
    });
    taskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const taskName = document.getElementById('taskName').value;
      const taskTime = document.getElementById('taskTime').value;
      // Add the new task to the task list with time
      const taskList = document.querySelector('.task-list');
      if (taskList && taskName && taskTime) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `<label><input type="checkbox"> ${taskName} <span class="task-time">(Time: ${taskTime})</span></label>`;
        taskList.appendChild(li);
      }
      addTaskModal.style.display = 'none';
      taskForm.reset();
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const dashboardPhoto = document.getElementById('dashboard-profile-photo');
  const savedPhoto = localStorage.getItem('profilePhoto');
  if (dashboardPhoto && savedPhoto) {
    dashboardPhoto.src = savedPhoto;
  }
});