// Toggle between Login and Signup forms
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
} else {
  // Error handling for missing DOM elements
  if (!loginToggle) console.warn('Login toggle button not found.');
  if (!signupToggle) console.warn('Signup toggle button not found.');
  if (!loginForm) console.warn('Login form not found.');
  if (!signupForm) console.warn('Signup form not found.');
  if (!formToggle) console.warn('Form toggle container not found.');
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
});