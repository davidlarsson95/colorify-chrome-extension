/**
 * Color sampler
 *
 * @author David Larsson */

// TODO: FIND A PROXY AND TRY
var color = [];
var globalVar = {};

function pixelColor() {
    console.log("PING");

    var ssCanvas, ssContext;

    // Overlay to avoid clicking links etc while color sampling
    // Could not access in function properly.
    var overlay = document.createElement("div");
    overlay.setAttribute("class", "tempOverlayColorify");
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.right = "0";
    overlay.style.bottom = "0";
    overlay.style.height = window.innerHeight;
    overlay.style.background = "transparent";
    overlay.style.zIndex = "9999";

    function takeSS() {
        html2canvas(document.body, {
        //allowTaint: true,
        //proxy: "",
        onrendered: function(canvas) {
            //alert(canvas);
            ssCanvas = canvas;
            ssContext = ssCanvas.getContext("2d");
            var image = canvas.toDataURL("image/png");
            window.location.href=image;
        }
    });
        // Append the overlay.
        document.documentElement.appendChild(overlay);

    }
    setTimeout(function() {
    takeSS();
    }, 100);

    function clickEvent(e) {
        var x = e.pageX, y = e.pageY;
        var data = ssContext.getImageData(x, y, 1, 1).data;
        console.log(data);
        color = {a: data[0], b: data[1], c: data[2]};
        console.log(color);
        chrome.storage.local.set({'value': color}, function() {
            console.log("SAVED")
        });

        // Initiate the alert box
        popupBoxInit();

        // Remove the overlay
        document.documentElement.removeChild(overlay);
        document.removeEventListener("click", clickEvent);

    }

    document.addEventListener("click", clickEvent);
    window.onresize = takeSS();
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // Execute code here
        pixelColor();

        if (request.greeting === "hello") {
            sendResponse({farewell: color});
        }
    });


function popupBoxInit() {
    // Alert box start - BEING WORKED ON
    var alertDiv = document.createElement("div");
    alertDiv.setAttribute('id', 'alertDiv');
    alertDiv.style.height = "170px";
    alertDiv.style.width = "320px";
    alertDiv.style.background = "rgb(" + color.a + ", " + color.b + ", " + color.c + ")";
    alertDiv.style.borderStyle = "solid";
    alertDiv.style.zIndex = "999";
    alertDiv.style.position = "fixed";
    alertDiv.style.top = "25%";
    alertDiv.style.left = "50%";

    var alertDivText = document.createElement("p");
    alertDivText.innerHTML = "<br>You clicked the color " + "COLOR<br>" +
        "rgb(" + color.a + ", " + color.b + ", " + color.c + ")<br>" + "HEX: #HEXVALUE";
    alertDivText.style.marginLeft = "10px";
    alertDivText.style.fontSize = "22px";
    alertDivText.style.textShadow = "-1px 0 gray, 0 1px gray, 1px 0 gray, 0 -1px gray";
    alertDiv.appendChild(alertDivText);


    var closeButton = document.createElement("button");
    closeButton.innerHTML = "CLOSE";
    closeButton.style.position = "absolute";
    closeButton.style.bottom = "0";
    closeButton.style.right = "0";
    closeButton.style.marginBottom = "8px";
    closeButton.style.marginRight = "8px";

    closeButton.addEventListener("click", function() {
       document.documentElement.removeChild(alertDiv);
    });
    alertDiv.appendChild(closeButton);
    document.documentElement.appendChild(alertDiv);
    // Alert box end
}