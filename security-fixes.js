// Settings action handlers and compatibility fixes.
// Keep action targeting explicit so secondary buttons cannot be
// accidentally treated as Cancel or another settings action.
document.addEventListener('DOMContentLoaded', () => {
  const settingsContent = document.querySelector('.settings-content');
  if (!settingsContent) return;

  // Record activity using the browser's local calendar date. UTC date keys
  // can put late-night completions onto the following/previous heatmap day.
  window.recordActivity = (date = new Date()) => {
    const pad = value => String(value).padStart(2, '0');
    const key = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const raw = localStorage.getItem('focusMeActivity');
    let activity = {};
    try {
      const parsed = raw ? JSON.parse(raw) : {};
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) activity = parsed;
    } catch (error) {
      console.warn('Unable to read saved activity.', error);
    }
    activity[key] = Number.isFinite(activity[key]) ? Math.max(0, activity[key]) + 1 : 1;
    try {
      localStorage.setItem('focusMeActivity', JSON.stringify(activity));
    } catch (error) {
      console.warn('Unable to save activity.', error);
    }
  };

  const exportData = () => {
    const read = key => {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : {};
      } catch (error) {
        console.warn(`Unable to export ${key}.`, error);
        return {};
      }
    };

    const data = {
      settings: read('userSettings'),
      tasks: read('focusMeTasks'),
      activity: read('focusMeActivity')
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'focus-me-data.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const cancelButton = settingsContent.querySelector('[data-action="cancel-settings"]');
  if (cancelButton) {
    cancelButton.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const saved = localStorage.getItem('userSettings');
      if (!saved) return;
      try {
        if (typeof setSettingsToForm === 'function') setSettingsToForm(JSON.parse(saved));
        alert('Changes cancelled.');
      } catch (error) {
        console.warn('Unable to restore saved settings.', error);
      }
    }, true);
  }

  const exportButtons = settingsContent.querySelectorAll('[data-action="export-stats"], [data-action="export-data"]');
  exportButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      exportData();
    }, true);
  });

  const changePassword = Array.from(settingsContent.querySelectorAll('.btn-secondary'))
    .find(button => button.textContent.trim() === 'Change Password');
  if (changePassword) {
    changePassword.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      alert('Password changes will be available when authentication is implemented.');
    }, true);
  }

  const twoFactor = Array.from(settingsContent.querySelectorAll('.btn-secondary'))
    .find(button => button.textContent.trim() === 'Two-Factor Authentication');
  if (twoFactor) {
    twoFactor.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      alert('Two-factor authentication will be available when authentication is implemented.');
    }, true);
  }

  const resetStats = settingsContent.querySelector('[data-action="reset-stats"]');
  if (resetStats) {
    resetStats.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (!confirm('Reset saved tasks and productivity activity? This cannot be undone.')) return;
      // Keep an empty array so getTasks() does not recreate demo tasks.
      try {
        localStorage.setItem('focusMeTasks', '[]');
        localStorage.setItem('focusMeActivity', '{}');
        alert('Saved productivity data has been reset.');
      } catch (error) {
        console.warn('Unable to reset saved productivity data.', error);
        alert('Unable to reset saved productivity data.');
      }
    }, true);
  }
});
