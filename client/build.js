"use strict";
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
/// <reference path="types-gtanetwork/index.d.ts" />
"use strict";
var res = API.getScreenResolution();
API.onUpdate.connect(function () {
    var player = API.getLocalPlayer();
    var inveh = API.isPlayerInAnyVehicle(player);
    if (inveh) {
        var veh = API.getPlayerVehicle(player);
        //if (API.getPlayerVehicleSeat(player) == 1) {
            var vel = API.getEntityVelocity(player);
            var rpm = Math.floor(API.getVehicleRPM(veh) * 1000);
            var speed = Math.sqrt(vel.X * vel.X +
                vel.Y * vel.Y +
                vel.Z * vel.Z);
            var speedInMph = Math.round(speed * 2.23694); // MPH because we are in America
            var vehHealth = Math.round(API.getVehicleHealth(veh) / 10);
            API.drawText(speedInMph.toString(), 345, 900, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
            API.drawText("MPH", 470, 900, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
            API.drawText(rpm.toString(), 345, 950, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
            API.drawText("RPM", 470, 950, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
            API.drawText(vehHealth + "", 345, 1000, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
            API.drawText("% health", 470, 1000, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
        //}
    }
});
/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="libs/CefHelper.ts" />
/// <reference path="speedometer.ts" />
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
