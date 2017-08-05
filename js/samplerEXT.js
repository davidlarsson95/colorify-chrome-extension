/**
 * Color sampler
 *
 * @author David Larsson
 */
document.addEventListener("DOMContentLoaded", function() {
    var value;
    var colorClassifier = new ColorClassifier();


    // Get prev color from chrome storage and update fields.
    chrome.storage.local.get("value", function(result) {

        // If first time running extension, don't set values.
        if (typeof result.value === "undefined") {
            console.log("No item set - skipping next");
        } else {
            value = result.value;
            var rgb = "rgb(" + value.a + ", " + value.b + ", " + value.c + ")";
            var hex = colorToHex(rgb);
            document.getElementById("rgbfield").value = rgb;
            document.getElementById("hexfield").value = hex;
            document.body.style.background = hex;

            var button = document.getElementById("change");
            var colorName = colorClassifier.classify(hex);
            button.addEventListener("click", function() {
                colorName = colorClassifier.classifyS(hex);
                document.getElementById("namefield").innerHTML = colorName;
            });

            document.getElementById("namefield").innerHTML = colorName;
        }
    });

    // Button eventlistener -> Takes a screenshot of the tab and sends it to the samplerDOM.js
    var sampler = document.getElementById("sampler");
    sampler.addEventListener("click", function() {
        sampler.setAttribute("disabled", "disabled");

        chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {

            if (request.greeting === "scroll") {
                takeSS("goRefresh");
                sendResponse({farewell: "snapshot"});
            }
        });

        takeSS("go");

    });

    // Capture screen and send it to samplerDOM.js
    function takeSS(message) {
        chrome.tabs.captureVisibleTab(null, {format: "png"}, function(image) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {greeting: message, imagesrc: image}, function(response) {
                    console.log(response.farewell)
                });
            });
        });
    }

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
});
