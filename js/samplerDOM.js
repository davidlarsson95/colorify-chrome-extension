/**
 * Color sampler
 *
 * @author David Larsson */

// TODO: FIND A PROXY AND TRY
var color = [];
var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

function pixelColor() {
    console.log("PING");

    var ssCanvas, ssContext;
    // OVERLAY - (To avoid clicking links etc when getting sample)
    var overlay = document.createElement("div");
    overlay.setAttribute("id", "tempOverlay");
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
        allowTaint: true,
        proxy: "",
        onrendered: function(canvas) {
            //alert(canvas);
            ssCanvas = canvas;
            ssContext = ssCanvas.getContext("2d");
            var image = canvas.toDataURL("image/png");
            window.location.href=image;
        }
    });

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
        //alert("RGB of the color you clicked is: " + "rgb(" + color.a + ", " + color.b + ", " + color.c + ")");

        // Alert box start - BEING WORKED ON
        var alertDiv = document.createElement("div");
        alertDiv.setAttribute('id', 'alertDiv');
        alertDiv.style.height = "300px";
        alertDiv.style.width = "300px";
        alertDiv.style.background = "red";
        alertDiv.style.zIndex = "999";
        alertDiv.style.position = "fixed";
        alertDiv.style.top = "25%";
        alertDiv.style.left = "50%";
        //document.documentElement.appendChild(alertDiv);
        // Alert box end

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
