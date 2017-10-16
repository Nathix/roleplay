/// <reference path="types-gt-mp/Declarations.d.ts" />

var hud = null;
var phone = null;

API.onResourceStart.connect(() => {
    API.sendChatMessage("~g~Roleplay started!");
});

API.onUpdate.connect(() => {
    hud = new HUD();
    hud.showSpeed();
});
