chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        chrome.tabs.create({active: true, url: "watch.html"}, function(newTab) {
            chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
                if(request.action === 'geturl') {
                    sendResponse({url: tabs[0].url});
                }
                return true;
            });
        });
    })
});
