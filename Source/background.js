let tabMuteStatus = {};

// Uygulama yüklendiğinde gerekli temizliği yap
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['tabMuteStatus'], (result) => {
    tabMuteStatus = result.tabMuteStatus || {};
    cleanUpTabMuteStatus();
  });
});

// Tab değiştiğinde durumu kontrol et ve ikonu güncelle
chrome.tabs.onActivated.addListener((activeInfo) => {
  updateIcon(tabMuteStatus[activeInfo.tabId], activeInfo.tabId);
});

// Yalnızca mutedInfo veya audible değiştiğinde çalışacak şekilde optimize edildi
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.mutedInfo || changeInfo.audible) {
    tabMuteStatus[tabId] = tab.mutedInfo.muted;
    chrome.storage.local.set({ tabMuteStatus }, () => {
      updateIcon(tabMuteStatus[tabId], tabId);
    });
  }
});

// Uzantı simgesine tıklandığında mute/unmute işlemini yap
chrome.action.onClicked.addListener((tab) => {
  const isMuted = tabMuteStatus[tab.id] || false;
  chrome.tabs.update(tab.id, { muted: !isMuted }, () => {
    tabMuteStatus[tab.id] = !isMuted;
    chrome.storage.local.set({ tabMuteStatus }, () => {
      updateIcon(tabMuteStatus[tab.id], tab.id);
    });
  });
});

// Gereksiz tab verilerini temizlemek için fonksiyon
function cleanUpTabMuteStatus() {
  chrome.tabs.query({}, (tabs) => {
    const activeTabIds = tabs.map((tab) => tab.id);
    tabMuteStatus = Object.fromEntries(
      Object.entries(tabMuteStatus).filter(([tabId]) =>
        activeTabIds.includes(parseInt(tabId))
      )
    );
    chrome.storage.local.set({ tabMuteStatus });
  });
}

// İkonu güncelle
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

// Sekme kapandığında veriyi temizle
chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabMuteStatus[tabId];
  chrome.storage.local.set({ tabMuteStatus });
});
