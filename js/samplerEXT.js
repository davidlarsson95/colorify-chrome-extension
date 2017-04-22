/**
 * Color sampler
 *
 * @author David Larsson
 */
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("sampler").addEventListener("click", function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
            // Deal with samplerDOM response.
            });
        });
    });
});