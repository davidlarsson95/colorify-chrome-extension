/**
 * Color sampler
 *
 * @author David Larsson
 */
document.addEventListener('DOMContentLoaded', function() {
    var value;
    chrome.storage.onChanged.addListener(function(test1) {


    chrome.storage.local.get("value", function(result) {
    value = result.value;
    document.getElementById("rgbfield").value = "rgb(" + value.a + ", " + value.b + ", " + value.c + ")";
    });
    });
    document.getElementById("sampler").addEventListener("click", function () {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {

            });
        });
    });
});