chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('chrome-extension/home.html', {
		"state": "maximized",
		"bounds": {
			"width": window.screen.availWidth,
			"height": window.screen.availHeight
		}
	});
});