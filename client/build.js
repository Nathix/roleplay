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
        this.element = API.createMenu(title, subtitle, x, y, anchor);
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
        if (this.selectedCallBack != null)
            return this.selectedCallBack(menu, item);
        return false;
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
    MenuHelper.prototype.addListItem = function (label, description, list, index, callback) {
        var temp = API.createListItem(label, description, list, index);
        this.element.AddItem(temp);
        temp.Activated.connect(this.callSelectedCallback);
        if (callback != null)
            temp.OnListChanged.connect(function (listItem, newIndex) { callback(listItem, newIndex); });
        this.element.RefreshIndex();
        return temp;
    };
    return MenuHelper;
}());
/// <reference path="types-gtanetwork/index.d.ts" />
/// <reference path="libs/MenuHelper.ts" />
"use strict";
API.onResourceStart.connect(function () {
    var CreationMenu = new MenuHelper("Character Creation", "Create your character", 0, 0, 6);
    var Parents = new List(String);
    for (var i = 0; i <= 45; i++) {
        Parents.Add(i.toString());
    }
    var Gender = new List(String);
    Gender.Add("Male");
    Gender.Add("Female");
    var GenderItem = CreationMenu.addListItem("Gender", "Male or Female", Gender, 0, onListItemChange);
    var Parent1Item = CreationMenu.addListItem("Parent 1", "First Parent", Parents, 0, onListItemChange);
    var Parent2Item = CreationMenu.addListItem("Parent 2", "Second Parent", Parents, 1, onListItemChange);
    var Parent3Item = CreationMenu.addListItem("Parent 3", "Third Parent", Parents, 2, onListItemChange);
    CreationMenu.addMenuItem("Complete Character", "Finish creating your character");
    CreationMenu.show();
    function onListItemChange(listItem, index) {
        if (listItem == GenderItem) {
            API.sendChatMessage("Gender changed to " + ((index == 0) ? "Male" : "Female"));
        }
        else if (listItem == Parent1Item) {
            API.sendChatMessage("Parent 1 changed to " + index);
        }
        else if (listItem == Parent2Item) {
            API.sendChatMessage("Parent 2 changed to " + index);
        }
        else if (listItem == Parent3Item) {
            API.sendChatMessage("Parent 3 changed to " + index);
        }
    }
});
