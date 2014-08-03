chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('chrome-extension/home.html', {
		"bounds": {
			"width": window.screen.availWidth,
			"height": window.screen.availHeight
		}
	});
});