const tabMuteStatus = {};

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    updateIcon(tab);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.audible !== undefined || changeInfo.mutedInfo !== undefined) {
    if (tab.mutedInfo) {
      tabMuteStatus[tabId] = tab.mutedInfo.muted;
    }
    updateIcon(tab);
  }
});

chrome.action.onClicked.addListener((tab) => {
  const isMuted = tabMuteStatus[tab.id] || false;

  chrome.tabs.update(tab.id, { muted: !isMuted }, () => {
    tabMuteStatus[tab.id] = !isMuted;
    updateIcon(tab);
  });
});

function updateIcon(tab) {
  if (tab.mutedInfo) {
    const isMuted = tab.mutedInfo.muted;
    const newIcon = isMuted ? "icons/icon_muted" : "icons/icon_unmuted";
    const newIconPath = {
      "16": `${newIcon}16.png`,
      "48": `${newIcon}48.png`,
      "128": `${newIcon}128.png`
    };

    chrome.action.setIcon({
      path: newIconPath
    });

    chrome.action.setTitle({
      title: isMuted ? "Click to unmute this tab" : "Click to mute this tab"
    });
  }
}
