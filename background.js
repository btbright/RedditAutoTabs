//Display the page action when the user is on reddit
var showPageAction = function (tab) {
  chrome.pageAction.show(tab.tabId);
};
chrome.webNavigation.onCommitted.addListener(showPageAction,{url : [{hostContains:'.reddit.com'}]});

//When the user is on reddit and clicks the pageAction button
//ask the content script to find all the urls and report back
var findUrls = function(tab) {
  chrome.tabs.executeScript(tab.id, {file: "contentscript.js"});
};
chrome.pageAction.onClicked.addListener(findUrls);

//When the content script reports back the urls, open them
var openUrls = function(message) {
  var urls = message.urls;
  var urlsLen = urls.length;
  for (var i=0;i<urlsLen;i++){
    chrome.tabs.create({url:urls[i],selected:false});
  }
};
chrome.extension.onMessage.addListener(openUrls);