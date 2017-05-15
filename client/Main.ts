/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="libs/CefHelper.ts" />
/// <reference path="libs/HUD.ts" />

var cef = null;
var hud = null;

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
        } else {
            cef.show();
        }
    }
});

API.onUpdate.connect(function() {
  hud = new HUD();
  hud.showSpeed();
});
