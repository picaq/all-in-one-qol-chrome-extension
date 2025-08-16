const closeTab = () => {
  // window.close(); // This won't work with heightened browser security
  const url = window.location.href;
  const zoomPostAttendee = 1;
  const zoomSuccess = 1000;  // 300 * 1k = 5 minutes

  let type = 0;

  if (/https:\/\/(.*\.)?zoom\.us\/postattendee\?mn=.*/.test(url)) {
    type = zoomPostAttendee;
  } else if (/https:\/\/(.*\.)?zoom\.us\/.*#success/.test(url)) {
    type = zoomSuccess;
  } else {
    console.warn("Auto-close script loaded on unsupported URL:", url);
    return;
  }

  setTimeout(() => {
    chrome.runtime.sendMessage({ action: "closeTabByID" });
  }, 300 * type );  
  setTimeout(() => {
    console.error("Error closing tab");
  }, 300 * type + 700);
}

closeTab();