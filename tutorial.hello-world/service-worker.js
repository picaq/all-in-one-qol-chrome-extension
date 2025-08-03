async function getCurrentTabId() {
  const tabs = await chrome.tabs.query({
    url: [
      "https://*.zoom.us/postattendee?mn=*",
      "https://zoom.us/postattendee?mn=*"
    ]
  });
  const numTabs = tabs.length;
  console.log(numTabs, "tabs found");
  if (numTabs > 0) {
    console.log(tabs.forEach(tab => console.log("Tab URL:", tab.url)));
  }
  return tabs[0]?.id || null;
}

const closeTab = () => {
  setTimeout(() => {
    getCurrentTabId().then((tabId) => {
      console.log("Tab ID:", tabId);
        if (tabId === null) {
          console.warn("No tab ID found to close.");
          return;
        }
      chrome.tabs.remove(tabId);
    });
  }, 30);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "closeTabByID") {
    closeTab();  // call background function
    sendResponse({ status: "done" });
  }
  return true; // required if sendResponse is async or used later
});