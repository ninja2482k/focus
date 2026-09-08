// Small compatibility layer for settings actions.
// Loaded after script.js so existing demo handlers cannot accidentally
// treat unrelated secondary buttons as the Cancel action.
document.addEventListener('DOMContentLoaded', () => {
  const settingsContent = document.querySelector('.settings-content');
  if (!settingsContent) return;

  const cancelButton = settingsContent.querySelector('[data-action="cancel-settings"]');
  if (cancelButton) {
    cancelButton.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
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
      localStorage.removeItem('focusMeTasks');
      localStorage.removeItem('focusMeActivity');
      alert('Saved productivity data has been reset.');
    }, true);
  }
});
