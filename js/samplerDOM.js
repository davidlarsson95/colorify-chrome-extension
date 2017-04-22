/**
 * Color sampler
 *
 * @author David Larsson
 */
function test() {
    document.body.style.background = "yellow";
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // Execute code here
        test();

        if (request.greeting === "hello")
            //sendResponse({farewell: "goodbye"});
    });
