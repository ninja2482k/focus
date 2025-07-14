// Only run login/signup toggle code on index.html
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
  const loginToggle = document.getElementById('login-toggle');
  const signupToggle = document.getElementById('signup-toggle');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const formToggle = document.querySelector('.form-toggle');

  if (loginToggle && signupToggle && loginForm && signupForm && formToggle) {
    loginToggle.addEventListener('click', () => {
      loginToggle.classList.add('active');
      signupToggle.classList.remove('active');
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
      formToggle.classList.remove('signup-active');
    });

    signupToggle.addEventListener('click', () => {
      signupToggle.classList.add('active');
      loginToggle.classList.remove('active');
      signupForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
      formToggle.classList.add('signup-active');
    });
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
})();

// --- Motivation Quote Randomizer ---
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
  }
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
    quoteEl.textContent = quotes[randomIndex];
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
  
  if (masterVolumeSlider && volumeValue) {
    // Update volume display when slider changes
    masterVolumeSlider.addEventListener('input', function() {
      volumeValue.textContent = this.value + '%';
    });
    
    // Initialize volume display
    volumeValue.textContent = masterVolumeSlider.value + '%';
  }

  // Settings sidebar navigation
  const navItems = document.querySelectorAll('.nav-item');
  const settingsPanels = document.querySelectorAll('.settings-panel');
  
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all nav items and panels
      navItems.forEach(nav => nav.classList.remove('active'));
      settingsPanels.forEach(panel => panel.classList.remove('active'));
      
      // Add active class to clicked nav item
      this.classList.add('active');
      
      // Show corresponding panel
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
        alert('Settings saved successfully!');
      });
    }
    
    if (cancelButton) {
      cancelButton.addEventListener('click', function(e) {
        e.preventDefault();
        // Reset form to original values
        const inputs = settingsForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
          if (input.type === 'checkbox') {
            input.checked = input.defaultChecked;
          } else {
            input.value = input.defaultValue;
          }
        });
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