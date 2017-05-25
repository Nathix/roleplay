API.onServerEventTrigger.connect(function (name, args) {
    if (name == "player:camera:interpolate") {
        var startCamera = API.createCamera(args[1], args[3]);
        var endCamera = API.createCamera(args[2], args[4]);
        API.interpolateCameras(startCamera, endCamera, args[0], true, true);
    }
    else if (name == "player:camera:stop") {
        API.setGameplayCameraActive();
    }
});
var CefHelper = (function () {
    function CefHelper(resourcePath, local) {
        this.path = resourcePath;
        this.local = (local == null) ? true : local;
        this.open = false;
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
var hud = null;
var phone = null;
API.onResourceStart.connect(function () {
    API.sendChatMessage("~g~CefBrowser started!");
    phone = new CefHelper('client/phone/index.html');
});
API.onChatCommand.connect(function (c) {
    if (c == "/showphone") {
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
                this.speedInMph = Math.round(this.speed * 2.23694);
                this.speedInKnots = Math.round(this.speed * 1.9438477170141);
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
var loginCef = null;
var registerCef = null;
var spamProtection = false;
API.onServerEventTrigger.connect(function (name, args) {
    if (name == "player:login:show") {
        API.setCanOpenChat(false);
        loginCef = new CefHelper('client/resources/pages/account/login.html');
        loginCef.show();
        spamProtection = false;
    }
    else if (name == "player:login:hide") {
        loginCef.hide();
        API.setCanOpenChat(true);
        spamProtection = false;
    }
    else if (name == "player:login:reset") {
        spamProtection = false;
    }
});
function LoginHandler(username, password) {
    if (!spamProtection) {
        API.triggerServerEvent("player:login:process", username, password);
        spamProtection = true;
    }
}
function RegisterHandler() {
    loginCef.hide();
    registerCef = new CefHelper("https://forum.sa-roleplay.com/register/", false);
    registerCef.show();
}
var selectionActive = false;
var selectingCharacter = false;
var lastCharacter = null;
var lastCharacterValue = 0;
var peds = [];
var ped1;
var ped2;
var ped3;
var positions = [
    new Vector3(256.5341, 212.1253, 106.2869),
    new Vector3(253.4211, 213.1638, 106.2869),
    new Vector3(250.5341, 214.2292, 106.2869)
];
var rotations = [
    30.5,
    -1,
    -72.5
];
API.onServerEventTrigger.connect(function (eventname, args) {
    if (eventname == "player:character:selection:show") {
        var cam = API.createCamera(new Vector3(254.7309, 216.7014, 112.00), new Vector3(0, 0, 0));
        API.pointCameraAtPosition(cam, new Vector3(253.4211, 213.1638, 106.2869));
        API.setActiveCamera(cam);
        selectionActive = true;
        selectingCharacter = true;
        API.showCursor(true);
    }
    else if (eventname == "player:character:selection:data") {
        var data = JSON.parse(args[0]);
        API.sendChatMessage("Data received | " + data.length);
        for (var i = 0; i < data.length; i++) {
            var ped = API.createPed(1885233650, positions[i], rotations[i]);
            peds[ped.Value] = data[i];
        }
        if (data.length < 1)
            ped1 = API.createPed(-407694286, positions[0], rotations[0]);
        if (data.length < 2)
            ped2 = API.createPed(-407694286, positions[1], rotations[1]);
        if (data.length < 3)
            ped3 = API.createPed(-407694286, positions[2], rotations[2]);
    }
    else if (eventname == "player:character:selection:hide") {
        selectionActive = false;
        selectingCharacter = false;
        API.showCursor(false);
        API.setGameplayCameraActive();
    }
});
API.onUpdate.connect(function () {
    if (!selectionActive)
        return false;
    var cursor = API.getCursorPosition();
    if (lastCharacter != null) {
        if (peds[lastCharacterValue] != null) {
            var str = "~g~Name: ~w~" + peds[lastCharacterValue].firstname + " " + peds[lastCharacterValue].lastname;
            if (peds[lastCharacterValue].faction_id != 0)
                str += "~n~~g~Faction: ~w~Yes";
            str += "~n~~g~Money: ~w~" + (parseInt(peds[lastCharacterValue].money) + parseInt(peds[lastCharacterValue].bank)) + " $";
            if (peds[lastCharacterValue].last_online_date != null)
                str += "~n~~g~Last Online: ~w~" + peds[lastCharacterValue].last_online_date;
            if (peds[lastCharacterValue].last_online_date == null)
                str += "~n~~g~Last Online: ~w~Never";
            API.displaySubtitle(str + "~n~~b~Press '~y~SPACE~b~' to spawn!");
        }
        else {
            API.displaySubtitle("~b~Press '~y~SPACE~b~' to create a character!");
        }
    }
    else {
        API.displaySubtitle("~w~Hover over a character.");
    }
    if (selectingCharacter) {
        var cursOp = API.getCursorPositionMantainRatio();
        var s2w = API.screenToWorldMantainRatio(cursOp);
        var rayCast = API.createRaycast(new Vector3(254.7309, 216.7014, 112.00), s2w, 4 | 8 | 12, null);
        var localH = null;
        var localV = 0;
        if (rayCast.didHitEntity) {
            localH = rayCast.hitEntity;
            localV = localH.Value;
        }
        if (localV != lastCharacterValue && localH != null) {
            if (localH != null)
                API.setEntityTransparency(localH, 255);
            if (lastCharacter != null)
                API.setEntityTransparency(lastCharacter, 120);
            lastCharacter = localH;
            lastCharacterValue = localV;
        }
    }
});
API.onKeyDown.connect(function (sender, e) {
    if (e.KeyCode == Keys.Space) {
        if (lastCharacterValue != null) {
            if (peds[lastCharacterValue] != null) {
                API.sendChatMessage("You selected to play as: " + peds[lastCharacterValue].firstname + " " + peds[lastCharacterValue].lastname);
                API.triggerServerEvent("player:character:selection:selected", peds[lastCharacterValue].id);
            }
            else {
                API.sendChatMessage("You selected to create a character");
            }
        }
    }
});
