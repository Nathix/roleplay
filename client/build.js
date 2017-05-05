"use strict";
var CefHelper = (function () {
    function CefHelper(resourcePath) {
        this.resourcePath = resourcePath;
        this.path = resourcePath;
        this.open = false;
    }
    CefHelper.prototype.show = function () {
        if (this.open === false) {
            this.open = true;
            var resolution = API.getScreenResolution();
            this.browser = API.createCefBrowser(resolution.Width, resolution.Height, true);
            API.waitUntilCefBrowserInit(this.browser);
            API.setCefBrowserPosition(this.browser, 0, 0);
            API.loadPageCefBrowser(this.browser, this.path);
            API.showCursor(!API.isCursorShown());
        }
    };
    CefHelper.prototype.hide = function () {
        this.open = false;
        API.destroyCefBrowser(this.browser);
        API.showCursor(!API.isCursorShown());
    };
    CefHelper.prototype.eval = function (string) {
        this.browser.eval(string);
    };
    CefHelper.prototype.isShowing = function () {
        return this.open;
    };
    return CefHelper;
}());
"use strict";
/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="libs/CefHelper.ts" />
"use strict";
var cef = null;
API.onResourceStart.connect(function () {
    API.sendChatMessage("~g~CefBrowser started!");
    cef = new CefHelper('client/resources/boilerplate.html');
});
API.onResourceStop.connect(function () {
    cef.hide();
});
API.onChatCommand.connect(function (test) {
    if (test == "/show") {
        cef.show();
    }
    else if (test == "/hide") {
        cef.hide();
    }
    else if (test == "/toggle") {
        if (cef.isShowing() == true) {
            cef.hide();
        }
        else {
            cef.show();
        }
    }
});
