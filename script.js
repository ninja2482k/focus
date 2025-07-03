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