/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="libs/CefHelper.ts" />

var rtcCef = null;

API.onResourceStart.connect(function () {
    API.sendChatMessage("~g~WebRTC started!");
    rtcCef = new CefHelper('https://www.sa-roleplay.com/pls/?name=' + API.getPlayerName(API.getLocalPlayer()), false);
    rtcCef.show(false);
});

API.onResourceStop.connect(function () {
    rtcCef.hide();
});