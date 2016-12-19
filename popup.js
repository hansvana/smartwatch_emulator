chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        chrome.tabs.create({active: true, url: "watch.html?url="+tabs[0].url}, function() {});
    })
});
