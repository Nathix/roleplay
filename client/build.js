"use strict";
/// <reference path="types-gtanetwork/index.d.ts" />
"use strict";
API.onServerEventTrigger.connect(function (name, args) {
    if (name == "player:login:show") {
        var cef = new CefHelper('client/resources/pages/account/login.html');
        cef.show();
        API.sendNotification("Login!");
    }
});
/// <reference path="types-gtanetwork/index.d.ts" />
"use strict";
API.onServerEventTrigger.connect(function (name, args) {
    if (name == "player:camera:interpolate") {
        var startCamera = API.createCamera(args[1], args[3]);
        var endCamera = API.createCamera(args[2], args[4]);
        API.interpolateCameras(startCamera, endCamera, args[0], true, true);
    }
});
"use strict";
var CefHelper = (function () {
    function CefHelper(resourcePath, local) {
        this.path = resourcePath;
        this.open = false;
        this.local = (local != null) ? local : true;
    }
    CefHelper.prototype.show = function () {
        if (this.open === false) {
            this.open = true;
            var resolution = API.getScreenResolution();
            this.browser = API.createCefBrowser(resolution.Width, resolution.Height, this.local);
            API.waitUntilCefBrowserInit(this.browser);
            API.setCefBrowserPosition(this.browser, 0, 0);
            API.loadPageCefBrowser(this.browser, this.path);
            API.showCursor(!API.isCursorShown());
        }
    };
    CefHelper.prototype.hide = function () {
        this.open = false;
        //API.destroyCefBrowser(this.browser); // Broken
        API.showCursor(this.open);
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
"use strict";
var rtcCef = null;
API.onResourceStart.connect(function () {
    API.sendChatMessage("~g~WebRTC started!");
    rtcCef = new CefHelper('https://www.sa-roleplay.com/pls/', false);
    rtcCef.show();
});
API.onResourceStop.connect(function () {
    rtcCef.hide();
});
/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="libs/CefHelper.ts" />
/// <reference path="libs/HUD.ts" />
/// <reference path="Camera.ts" />
/// <reference path="Account.ts" />
/// <reference path="WebRTC.ts" />
"use strict";
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
        }
        else {
            cef.show();
        }
    }
});
API.onUpdate.connect(function () {
    hud = new HUD();
    hud.showSpeed();
});
