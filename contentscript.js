var urls = [];
var links = document.querySelectorAll(".entry a.title");

[].forEach.call(links,function(link){
  urls.push(link.getAttribute("href"));
});

chrome.extension.sendRequest(urls);