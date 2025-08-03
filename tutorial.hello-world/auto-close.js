const closeTab = () => {
  // window.close(); // This won't work with heightened browser security
  setTimeout(() => {
    chrome.runtime.sendMessage({ action: "closeTabByID" });
  }, 300);  
  setTimeout(() => {
    console.error("Error closing tab");
  }, 1000);
}

closeTab();