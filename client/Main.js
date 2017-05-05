/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="libs/CefHelper.ts" />
var cef = null;
API.onResourceStart.connect(function () {
    API.sendChatMessage("~g~CefBrowser started!");
    cef = new CefHelper('client/resources/boilerplate.html');
});
API.onKeyDown.connect(function (sender, e) {
    if (e.KeyCode === Keys.F12 && cef.isShowing() == false) {
        cef.show();
    }
    else if (e.KeyCode === Keys.F12 && cef.isShowing() == true) {
        cef.hide();
    }
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
