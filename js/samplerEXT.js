/**
 * Color sampler
 *
 * @author David Larsson
 */
document.addEventListener('DOMContentLoaded', function() {
    var value;
    var imagee;
    chrome.storage.onChanged.addListener(function() {


    chrome.storage.local.get("value", function(result) {
    value = result.value;
    document.getElementById("rgbfield").value = "rgb(" + value.a + ", " + value.b + ", " + value.c + ")";
        });
    });
    document.getElementById("sampler").addEventListener("click", function () {


        chrome.tabs.captureVisibleTab(null, {format: "png"}, function(image) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello", imagesrc: image}, function(response) {

            });
        });
    });
    });
});