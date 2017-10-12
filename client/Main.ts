/// <reference path="types-gt-mp/Declarations.d.ts" />
/// <reference path="libs/CefHelper.ts" />

var hud = null;
var phone = null;

API.onResourceStart.connect(function() {
    API.sendChatMessage("~g~CefBrowser started!");
    phone = new CefHelper('client/phone/index.html');
});

API.onChatCommand.connect(function(c) {
    if (c == "/showphone") {
        phone.show();
    }
    else if (c == "/hidephone") {
        phone.hide();
    }
    else if (c == "/togglephone") {
        if (phone.isShowing() == true) {
            phone.hide();
        } else {
            phone.show();
        }
    }
});

API.onUpdate.connect(function() {
    hud = new HUD();
    hud.showSpeed();
});
