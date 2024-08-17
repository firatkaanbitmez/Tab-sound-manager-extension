document.addEventListener('DOMContentLoaded', () => {
  const settingsForm = document.getElementById('settingsForm');

  chrome.storage.sync.get(['muteAllTabs', 'autoUnmute', 'autoMuteNewTabs'], (settings) => {
    document.getElementById('muteAllTabs').checked = settings.muteAllTabs || false;
    document.getElementById('autoUnmute').checked = settings.autoUnmute || false;
    document.getElementById('autoMuteNewTabs').checked = settings.autoMuteNewTabs || false;
  });

  settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    chrome.storage.sync.set({
      muteAllTabs: document.getElementById('muteAllTabs').checked,
      autoUnmute: document.getElementById('autoUnmute').checked,
      autoMuteNewTabs: document.getElementById('autoMuteNewTabs').checked
    }, () => {
      alert('Settings saved!');
    });
  });
});
