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
/// <reference path="../types-gtanetwork/index.d.ts" />
var CefHelper = (function () {
    function CefHelper(resourcePath, local) {
        this.path = resourcePath;
        this.open = false;
        this.local = (local != null) ? local : true;
    }
    CefHelper.prototype.show = function (cursor) {
        if (this.open === false) {
            this.open = true;
            var resolution = API.getScreenResolution();
            this.browser = API.createCefBrowser(resolution.Width, resolution.Height, this.local);
            API.waitUntilCefBrowserInit(this.browser);
            API.setCefBrowserPosition(this.browser, 0, 0);
            API.loadPageCefBrowser(this.browser, this.path);
            API.showCursor((cursor != null) ? cursor : true);
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
/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="libs/CefHelper.ts" />
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
/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="libs/CefHelper.ts" />
"use strict";
/*
var rtcCef = null;

API.onResourceStart.connect(function () {
    API.sendChatMessage("~g~WebRTC started!");
    rtcCef = new CefHelper('https://www.sa-roleplay.com/pls/?name=' + API.getPlayerName(API.getLocalPlayer()), false);
    rtcCef.show(false);
});

API.onResourceStop.connect(function () {
    rtcCef.hide();
});
*/
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
"use strict";
/// <reference path="../types-gtanetwork/index.d.ts" />
var MenuHelper = (function () {
    function MenuHelper(title, subtitle, x, y, anchor) {
        this.title = title;
        this.subtitle = subtitle;
        this.x = (x == null) ? 0 : x;
        this.y = (y == null) ? 0 : y;
        this.anchor = (anchor == null) ? 6 : anchor;
        this.open = false;
        var test = API.createMenu("PLAYER", 0, 0, 6);
        this.element = test;
        this.element.ResetKey(menuControl.Back);
        this.element.Visible = true;
        var self = this;
        API.onUpdate.connect(function () {
            // Oh yeah.. this becomes the function local variable, not class..
            if (self.element != null && self.open == true) {
                API.drawMenu(self.element);
            }
        });
    }
    MenuHelper.prototype.show = function () {
        this.open = true;
        API.showCursor(true);
    };
    MenuHelper.prototype.hide = function () {
        this.open = false;
        API.showCursor(false);
    };
    MenuHelper.prototype.isShowing = function () {
        return this.element.Visible;
    };
    MenuHelper.prototype.setSelectedCallback = function (callback) {
        this.selectedCallBack = callback;
    };
    MenuHelper.prototype.callSelectedCallback = function (menu, item) {
        return this.selectedCallBack(menu, item);
    };
    MenuHelper.prototype.addMenuItem = function (label, description) {
        var temp = API.createMenuItem(label, description);
        this.element.AddItem(temp);
        temp.Activated.connect(this.callSelectedCallback);
        return temp;
    };
    MenuHelper.prototype.addColoredItem = function (label, description, hexColor, hexHighlightColor) {
        var temp = API.createColoredItem(label, description, hexColor, hexHighlightColor);
        this.element.AddItem(temp);
        temp.Activated.connect(this.callSelectedCallback);
        return temp;
    };
    MenuHelper.prototype.addCheckboxItem = function (label, description, isChecked) {
        var temp = API.createCheckboxItem(label, description, isChecked);
        this.element.AddItem(temp);
        temp.Activated.connect(this.callSelectedCallback);
        return temp;
    };
    MenuHelper.prototype.addListItem = function (label, description, list, index) {
        var temp = API.createListItem(label, description, list, index);
        this.element.AddItem(temp);
        temp.Activated.connect(this.callSelectedCallback);
        this.element.RefreshIndex();
        return temp;
    };
    return MenuHelper;
}());
/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="libs/MenuHelper.ts" />
"use strict";
API.onResourceStart.connect(function () {
    var Faces = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
    var CreationMenu = new MenuHelper("Character Creation", "Something here?", 0, 0, 6);
    var test = new List(String);
    test.Add("1");
    test.Add("2");
    test.Add("3");
    CreationMenu.addMenuItem("Test", "test");
    CreationMenu.addListItem("Person 1", "First person", test, 0);
    CreationMenu.addListItem("Person 2", "Second person", test, 0);
    CreationMenu.addListItem("Person 3", "Third person", test, 0);
    CreationMenu.show();
});
