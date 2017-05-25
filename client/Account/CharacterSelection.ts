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

        if (data.length < 1) ped1 = API.createPed(-407694286, positions[0], rotations[0]);
        if (data.length < 2) ped2 = API.createPed(-407694286, positions[1], rotations[1]);
        if (data.length < 3) ped3 = API.createPed(-407694286, positions[2], rotations[2]);
    }
    else if (eventname == "player:character:selection:hide") {
        selectionActive = false;
        selectingCharacter = false;
        API.showCursor(false);
        API.setGameplayCameraActive();

        var allPeds = API.getAllPeds();
        for (var i = 0; i < allPeds.Length; i++) {
            if (peds[allPeds[i].Value] != null) {
                API.deleteEntity(allPeds[i]);
                peds[allPeds[i].Value] = null;
            }
        }

        if (ped1 != null) API.deleteEntity(ped1);
        if (ped2 != null) API.deleteEntity(ped2);
        if (ped3 != null) API.deleteEntity(ped3);
    }
});

API.onUpdate.connect(function () {
    if (!selectionActive) return false;
    var cursor = API.getCursorPosition();

    if (lastCharacter != null) {
        if (peds[lastCharacterValue] != null) {
            var str = "~g~Name: ~w~" + peds[lastCharacterValue].firstname + " " + peds[lastCharacterValue].lastname;
            if (peds[lastCharacterValue].faction_id != 0) str += "~n~~g~Faction: ~w~Yes";
            str += "~n~~g~Money: ~w~" + (parseInt(peds[lastCharacterValue].money) + parseInt(peds[lastCharacterValue].bank)) + " $";
            if (peds[lastCharacterValue].last_online_date != null) str += "~n~~g~Last Online: ~w~" + peds[lastCharacterValue].last_online_date;
            if (peds[lastCharacterValue].last_online_date == null) str += "~n~~g~Last Online: ~w~Never";
            API.displaySubtitle(str + "~n~~b~Press '~y~SPACE~b~' to spawn!");
        } else {
            API.displaySubtitle("~b~Press '~y~SPACE~b~' to create a character!");
        }
    } else {
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
            if (localH != null) API.setEntityTransparency(localH, 255);
            if (lastCharacter != null) API.setEntityTransparency(lastCharacter, 120);
            lastCharacter = localH;
            lastCharacterValue = localV;
        }
	}
});


API.onKeyDown.connect(function (sender, e) {
    if (!selectionActive) return false;
    if (e.KeyCode == Keys.Space) {
        if (lastCharacterValue != null) {
            if (peds[lastCharacterValue] != null) {
                API.sendChatMessage("You selected to play as: " + peds[lastCharacterValue].firstname + " " + peds[lastCharacterValue].lastname);
                API.triggerServerEvent("player:character:selection:selected", peds[lastCharacterValue].id);
            } else {
                API.sendChatMessage("You selected to create a character");
            }
        }
    }
});
