let tabMuteStatus = {};

chrome.storage.local.get(['tabMuteStatus'], (result) => {
  tabMuteStatus = result.tabMuteStatus || {};
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.storage.local.get(['tabMuteStatus'], (result) => {
    updateIcon(result.tabMuteStatus[activeInfo.tabId], activeInfo.tabId);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.mutedInfo || changeInfo.audible) {
    chrome.storage.local.get(['tabMuteStatus'], (result) => {
      const currentStatus = result.tabMuteStatus || {};
      currentStatus[tabId] = tab.mutedInfo.muted;
      chrome.storage.local.set({tabMuteStatus: currentStatus}, () => {
        updateIcon(currentStatus[tabId], tabId);
      });
    });
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get(['tabMuteStatus'], (result) => {
    const currentStatus = result.tabMuteStatus || {};
    const isMuted = currentStatus[tab.id] || false;
    chrome.tabs.update(tab.id, {muted: !isMuted}, () => {
      currentStatus[tab.id] = !isMuted;
      chrome.storage.local.set({tabMuteStatus: currentStatus}, () => {
        updateIcon(currentStatus[tab.id], tab.id);
      });
    });
  });
});

function updateIcon(muted, tabId) {
  const newIcon = muted ? "icons/icon_muted" : "icons/icon_unmuted";
  const newIconPath = {
    "16": `${newIcon}16.png`,
    "48": `${newIcon}48.png`,
    "128": `${newIcon}128.png`
  };

  chrome.action.setIcon({
    tabId: tabId,
    path: newIconPath
  });

  chrome.action.setTitle({
    tabId: tabId,
    title: muted ? "Click to unmute this tab" : "Click to mute this tab"
  });
}
