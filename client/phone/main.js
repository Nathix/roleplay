"use strict";
/// <reference path="../types-gtanetwork/index.d.ts" />
"use strict";
class CefHelper {
    constructor(resourcePath) {
        this.path = resourcePath;
        this.open = false;
    }
    show() {
        if (this.open === false) {
            this.open = true;
            var resolution = API.getScreenResolution();
            this.browser = API.createCefBrowser(resolution.Width, resolution.Height, true);
            API.waitUntilCefBrowserInit(this.browser);
            API.setCefBrowserPosition(this.browser, 0, 0);
            API.loadPageCefBrowser(this.browser, this.path);
            //API.showCursor(true);
        }
    }
    destroy() {
        this.open = false;
        API.destroyCefBrowser(this.browser);
        //API.showCursor(false);
    }
    eval(string) {
        this.browser.eval(string);
    }
}
/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="Classes/CefHelper.ts"/>
"use strict";
var cef = null;
API.onResourceStart.connect(function () {
    cef = new CefHelper('www/phone/index.html');
    cef.show();
});
API.onResourceStop.connect(function () {
    cef.destroy();
});
PI.onChatCommand.connect(function (test) {
    if (test == "/cursor") {
		
        API.showCursor(true);
    }
});