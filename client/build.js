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
        if (this.open == true) {
            this.open = false;
            API.destroyCefBrowser(this.browser);
            API.showCursor(this.open);
        }
    };
    CefHelper.prototype.eval = function (string) {
        this.browser.eval(string);
    };
    CefHelper.prototype.isShowing = function () {
        return this.open;
    };
    return CefHelper;
}());
/// <reference path="../types-gtanetwork/index.d.ts" />
var HUD = (function () {
    function HUD() {
    }
    HUD.prototype.showSpeed = function () {
        this.getPlayer = API.getLocalPlayer();
        this.playerInVehicle = API.isPlayerInAnyVehicle(this.getPlayer);
        if (this.playerInVehicle) {
            this.getVehicle = API.getPlayerVehicle(this.getPlayer);
            if (API.getPlayerVehicleSeat(this.getPlayer) == -1) {
                this.getVelocity = API.getEntityVelocity(this.getPlayer);
                this.speed = Math.sqrt(this.getVelocity.X * this.getVelocity.X +
                    this.getVelocity.Y * this.getVelocity.Y +
                    this.getVelocity.Z * this.getVelocity.Z);
                this.getVehicleHealth = Math.round(API.getVehicleHealth(this.getVehicle) / 10);
                this.getVehicleClass = API.getVehicleClass(API.getEntityModel(this.getVehicle));
                this.speedInMph = Math.round(this.speed * 2.23694); // MPH because we are in 'Murica
                this.speedInKnots = Math.round(this.speed * 1.9438477170141); // Knots for Air/Water vehicles
                switch (this.getVehicleClass) {
                    case 14:
                    case 15:
                    case 16:
                        API.drawText(this.speedInKnots.toString(), 345, 950, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
                        API.drawText("Knt", 470, 950, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
                        break;
                    default:
                        API.drawText(this.speedInMph.toString(), 345, 950, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
                        API.drawText("MPH", 470, 950, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
                        break;
                }
                API.drawText(this.getVehicleHealth.toString(), 345, 1000, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
                API.drawText("% health", 470, 1000, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
            }
        }
    };
    return HUD;
}());
/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="libs/CefHelper.ts" />
/// <reference path="libs/HUD.ts" />
var cef = null;
var hud = null;
var phone = null;
API.onResourceStart.connect(function () {
    API.sendChatMessage("~g~CefBrowser started!");
    cef = new CefHelper('client/resources/boilerplate.html');
    phone = new CefHelper('client/phone/index.html');
});
API.onResourceStop.connect(function () {
    cef.hide();
});
API.onChatCommand.connect(function (c) {
    if (c == "/show") {
        cef.show();
    }
    else if (c == "/hide") {
        cef.hide();
    }
    else if (c == "/toggle") {
        if (cef.isShowing() == true) {
            cef.hide();
        }
        else {
            cef.show();
        }
    }
    else if (c == "/showphone") {
        phone.show();
    }
    else if (c == "/hidephone") {
        phone.hide();
    }
    else if (c == "/togglephone") {
        if (phone.isShowing() == true) {
            phone.hide();
        }
        else {
            phone.show();
        }
    }
});
API.onUpdate.connect(function () {
    hud = new HUD();
    hud.showSpeed();
});
