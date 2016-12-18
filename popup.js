document.getElementById("clickme").addEventListener("click", function() {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    chrome.tabs.create({active: true, url: "watch.html"}, function(newTab) {
      chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
          if(request.action === 'geturl') {
              sendResponse({res: "ok", url: tabs[0].url});
          }
      });
    });
  });
})
