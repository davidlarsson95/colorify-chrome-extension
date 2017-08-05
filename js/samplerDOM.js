/**
 * Color sampler
 *
 * @author David Larsson */

var color = [];
var screenshot = new Image();
var clickEventLoaded = 0;

function pixelColor(imageCapt) {
    var contextColorify = null;
    // Overlay to avoid clicking links etc while color sampling
    var overlay = document.createElement("div");
    overlay.setAttribute("class", "tempOverlayColorify");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.right = "0";
    overlay.style.bottom = "0";
    overlay.style.height = "100%";
    overlay.style.width = "100%";
    overlay.style.background = "transparent";
    overlay.style.zIndex = "9999";

    // Cursor position relative to tab size -> Fixed a huge bug!
    // TRACKS CURSOR POSITION FOR COLOR GRAB
    var x = null;
    var y = null;
    window.addEventListener("mousemove", function(windowEvent) {
        x = windowEvent.clientX;
        y = windowEvent.clientY;

    });

    function takeSS(message, refreshedImage) {
        var canvas = document.createElement("canvas");
        contextColorify = canvas.getContext("2d");
        screenshot.src = imageCapt;

        screenshot.onload = function() {
            canvas.width = screenshot.width;
            canvas.height = screenshot.height;
            contextColorify.drawImage(screenshot, 0, 0);

        };

    }

    takeSS();

    var scrolling;
    if (clickEventLoaded === 0)
    window.addEventListener("scroll", function(event) {
        clickEventLoaded = 1;
        window.clearTimeout(scrolling);
        scrolling = setTimeout(function() {
            // No longer scrolling
            console.log("scroll");
            chrome.runtime.sendMessage({greeting: "scroll"}, function(response) {

            });
        }, 350);
    }, false);

    function clickEvent() {
        var data = contextColorify.getImageData(x, y, 1, 1).data;
        color = {a: data[0], b: data[1], c: data[2]};
        chrome.storage.local.set({value: color}, function() {
        });

        // Initiate the alert box
        popupBoxInit();

        // Remove the overlay
        document.documentElement.removeChild(overlay);
        document.documentElement.style.cursor = "default";
        document.removeEventListener("click", clickEvent);

    }

    // Append the overlay.
    document.documentElement.appendChild(overlay);
    document.addEventListener("click", clickEvent);
    document.documentElement.style.cursor = "crosshair";
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        if (request.greeting === "go") {
            pixelColor(request.imagesrc);
            sendResponse({farewell: "hey"});
        }

        if (request.greeting === "goRefresh") {
            screenshot.src = request.imagesrc;
            sendResponse({farewell: "hey"});
        }
    });

function popupBoxInit() {
    var alertDiv = document.createElement("div");
    alertDiv.setAttribute("id", "alertDiv");
    alertDiv.style.height = "170px";
    alertDiv.style.width = "320px";
    alertDiv.style.background = "rgb(" + color.a + ", " + color.b + ", " + color.c + ")";
    alertDiv.style.borderStyle = "solid";
    alertDiv.style.zIndex = "999";
    alertDiv.style.position = "fixed";
    alertDiv.style.top = "25%";
    alertDiv.style.left = "50%";
    var rgb = "rgb(" + color.a + ", " + color.b + ", " + color.c + ")";
    var hex = colorToHex(rgb);
    var alertDivText = document.createElement("b");
    var colorClassifier = new ColorClassifier();
    alertDivText.innerHTML = "Color info: " + "<br>Color: " + colorClassifier.classify(hex) + "<br>" +
        "Simple color: " + colorClassifier.classifyS(hex) + "<br>rgb: " + rgb + "<br>" + "HEX: " + hex;
    alertDivText.style.fontSize = "20px";
    alertDivText.style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
    alertDivText.style.color = "white";
    alertDiv.appendChild(alertDivText);

    var closeButton = document.createElement("button");
    closeButton.innerHTML = "CLOSE";
    closeButton.style.position = "absolute";
    closeButton.style.bottom = "0";
    closeButton.style.right = "0";
    closeButton.style.marginBottom = "8px";
    closeButton.style.marginRight = "8px";
    closeButton.style.backgroundColor = "#ccc";
    closeButton.style.borderRadius = "5px";
    closeButton.style.color = "#fff";
    closeButton.style.fontFamily = "Oswald";
    closeButton.style.fontSize = "20px";
    closeButton.style.textDecoration = "none";
    closeButton.style.cursor = "pointer";
    closeButton.style.border = "none";

    closeButton.addEventListener("click", function() {
        document.documentElement.removeChild(alertDiv);
    });

    alertDiv.appendChild(closeButton);
    document.documentElement.appendChild(alertDiv);


    // Borrowed from: http://haacked.com/archive/2009/12/29/convert-rgb-to-hex.aspx/
    function colorToHex(color) {
        if (color.substr(0, 1) === "#") {
            return color;
        }

        var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

        var red = parseInt(digits[2]);
        var green = parseInt(digits[3]);
        var blue = parseInt(digits[4]);

        var rgb = blue | (green << 8) | (red << 16);
        return digits[1] + "#" + rgb.toString(16);
    }

}
