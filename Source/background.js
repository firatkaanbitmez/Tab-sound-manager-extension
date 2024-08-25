let tabMuteStatusCache = {};

// Function to initialize or recover the mute status from persistent storage
async function initializeTabMuteStatus() {
  try {
    const storedData = await chrome.storage.local.get('tabMuteStatus');
    tabMuteStatusCache = storedData.tabMuteStatus || {};

    // Ensure icons are updated for active tabs only
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    for (const tab of tabs) {
      const isMuted = tabMuteStatusCache[tab.id] ?? false;
      updateIcon(isMuted, tab.id);
    }
  } catch (error) {
    console.error('Initialization error:', error);
    tabMuteStatusCache = {}; // Fallback to an empty cache
  }
}

// Function to persist the current cache state to chrome.storage.local
async function syncCacheToStorage() {
  try {
    await chrome.storage.local.set({ tabMuteStatus: tabMuteStatusCache });
  } catch (error) {
    console.error('Storage sync error:', error);
  }
}

// Run initialization when the extension is installed or the browser starts
chrome.runtime.onInstalled.addListener(initializeTabMuteStatus);
chrome.runtime.onStartup.addListener(initializeTabMuteStatus);

// Handle tab activation to update the icon based on mute status
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const isMuted = tabMuteStatusCache[activeInfo.tabId] ?? false;
  updateIcon(isMuted, activeInfo.tabId);
});

// Handle tab updates like mute state changes
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.mutedInfo) {
    tabMuteStatusCache[tabId] = tab.mutedInfo.muted;
    await syncCacheToStorage(); // Persist updated cache to storage
    updateIcon(tab.mutedInfo.muted, tabId);
  }
});

// Toggle mute state when the extension icon is clicked
chrome.action.onClicked.addListener(async (tab) => {
  const isMuted = tabMuteStatusCache[tab.id] ?? false;
  await chrome.tabs.update(tab.id, { muted: !isMuted });
  tabMuteStatusCache[tab.id] = !isMuted;
  await syncCacheToStorage(); // Persist updated cache to storage
  updateIcon(!isMuted, tab.id);
});

// Clean up cache data when a tab is closed
chrome.tabs.onRemoved.addListener(async (tabId) => {
  delete tabMuteStatusCache[tabId];
  await syncCacheToStorage(); // Persist updated cache to storage
});

// Function to clean up old or invalid cache data
function cleanUpTabMuteStatus() {
  chrome.tabs.query({}, (tabs) => {
    const activeTabIds = new Set(tabs.map((tab) => tab.id));
    tabMuteStatusCache = Object.fromEntries(
      Object.entries(tabMuteStatusCache).filter(([tabId]) =>
        activeTabIds.has(parseInt(tabId))
      )
    );
    syncCacheToStorage(); // Ensure persistent storage is updated
  });
}

// Function to update the icon and title based on the mute status
function updateIcon(muted, tabId) {
  const iconPath = muted ? "icons/icon_muted" : "icons/icon_unmuted";
  const newIcon = {
    "16": `${iconPath}16.png`,
    "48": `${iconPath}48.png`,
    "128": `${iconPath}128.png`
  };

  chrome.action.setIcon({ tabId, path: newIcon });
  chrome.action.setTitle({
    tabId,
    title: muted ? "Click to unmute this tab" : "Click to mute this tab"
  });
}

// Ensure that cache is initialized even if the storage is cleared
initializeTabMuteStatus();
