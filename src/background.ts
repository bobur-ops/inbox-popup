if (typeof chrome !== "undefined" && chrome.runtime) {
  // Running inside the extension
  chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create({ url: "http://localhost:5173" });
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openPopup") {
      chrome.tabs.create({ url: "popup.html" });
    }
  });
  chrome.browserAction.setIcon({ path: "/icon.png" });
}

export const setToken = (token: string) => {
  chrome.storage.local.set({ token: token });
};

export const getToken = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["token"], function (result) {
      const myToken = result.token || null;

      resolve(myToken);
    });
  });
};

export const deleteToken = () => {
  chrome.storage.local.remove("token");
};

export const setActiveEmail = (emailId: string) => {
  chrome.storage.local.set({ emailId });
};

export const getActiveEmail = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["emailId"], function (result) {
      const emailId = result.emailId || null;

      resolve(emailId);
    });
  });
};
