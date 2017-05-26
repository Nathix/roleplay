/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="libs/CefHelper.ts" />

var hud = null;
var phone = null;

API.onResourceStart.connect(function() {
    phone = new CefHelper('client/phone/index.html');

    // Request Motorsport
    //var interiorID = API.returnNative("0xB0F7F8663821D9C3", 0, -59.793598175048828, -1098.7840576171875, 27.2612);
    //API.sendChatMessage(interiorID.toString());
    //API.callNative("0x55E86AF2712B36A1", interiorID, "csr_beforeMission");
    //API.callNative("0x41F37C3427C75AE0", interiorID);
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
