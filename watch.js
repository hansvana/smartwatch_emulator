var faces = {
  apple : {
    width: 272,
    height: 340,
    image: "applewatch.png",
    imgWidth: 709,
    imgHeight: 824
  },
  samsung : {
    width: 360,
    height: 360,
    image: "samsunggear.png",
    imgWidth: 850,
    imgHeight: 1016
  }
};

function changeFace(val) {
  var frame = document.getElementById("watchframe");
  var overlay = document.getElementById("overlay");
  var props = faces[val];

  if (props) {
    frame.style.width = props.width +"px";
    frame.style.height = props.height +"px";
    frame.style.marginLeft = - props.width/2 +"px";
    frame.style.marginTop = - props.height/2 +"px";
    overlay.style.width = props.imgWidth +"px";
    overlay.style.height = props.imgHeight +"px";
    overlay.style.marginLeft = - (props.imgWidth/2 - 1) +"px";
    overlay.style.marginTop = - props.imgHeight/2 +"px";
    overlay.style.backgroundImage = "url(img/"+props.image+")";
  }

  localStorage.setItem("watch_face", val);
}

var face = localStorage.getItem("watch_face");

changeFace(face ? face : "apple");

var radioElements = document.getElementsByName("face");
for(var i = 0; i < radioElements.length; i++){
    if (radioElements[i].value === face) {
      radioElements[i].checked = true;
    }
    radioElements[i].addEventListener("change", function(e) {
      changeFace(e.srcElement.value);
    });
}

function getFromStorage() {
    var src;
    try {
        src = JSON.parse(localStorage.getItem("watchSrc"));
    } catch (e) {
        return false;
    }
    return src;
}

var src = getFromStorage();

chrome.runtime.sendMessage({action: "geturl"}, function(response) {
  chrome.tabs.getCurrent( function(tab) {
    if (src && src.id === tab.id) {
      document.getElementById("watchframe").src = src.url;
    } else {
      console.log("response",response);
      document.getElementById("watchframe").src = response.url;
      localStorage.setItem("watchSrc", JSON.stringify({id: tab.id, url: response.url}));
    }
  });
});
