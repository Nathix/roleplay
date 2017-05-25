var selectionActive = false;
var selectingCharacter = false;
var lastCharacter = null;
var lastCharacterValue = 0;

var ped1;
var ped2;
var ped3;

API.onServerEventTrigger.connect(function (eventname, args) {
    if (eventname == "player:character:selection:show") {
        ped1 = API.createPed(1885233650, new Vector3(256.5341, 212.1253, 106.2869), 30.5);
        ped2 = API.createPed(-407694286, new Vector3(253.4211, 213.1638, 106.2869), -1);
        ped3 = API.createPed(-407694286, new Vector3(250.5341, 214.2292, 106.2869), -72.5);

        var cam = API.createCamera(new Vector3(254.7309, 216.7014, 112.00), new Vector3(0, 0, 0));
        API.pointCameraAtEntity(cam, ped2, new Vector3(0, 0, 0));
        API.setActiveCamera(cam);
        selectionActive = true;
        selectingCharacter = true;
        API.showCursor(true);
    }
});

API.onUpdate.connect(function () {
    if (!selectionActive) return false;
    var cursor = API.getCursorPosition();

    if (lastCharacter != null) {
        if (lastCharacterValue == ped1.Value) {
            API.displaySubtitle("~g~Name: ~w~Bob~n~~g~Faction: ~w~Test ~g~Money: ~w~0$~n~~g~Last Used: ~w~00/00/0000 00:00~n~~b~Press '~y~SPACE~b~' to spawn!");
        } else {
            API.displaySubtitle("~b~Press '~y~SPACE~b~' to create a character!");
        }
    } else {
        API.displaySubtitle("~w~Hover over a character to continue.");
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
            if (lastCharacter != null) API.setEntityTransparency(lastCharacter, 160);
            lastCharacter = localH;
            lastCharacterValue = localV;
        }
	}
});


API.onKeyDown.connect(function (sender, e) {
    if (e.KeyCode == Keys.Space) {
        if (lastCharacterValue != null) {
            if (lastCharacterValue == ped1.Value) {
                API.sendChatMessage("You selected character 1 - spawn");
            }
            else if (lastCharacterValue == ped2.Value) {
                API.sendChatMessage("You selected character 2 - create");
            }
            else if (lastCharacterValue == ped3.Value) {
                API.sendChatMessage("You selected character 3 - create");
            }
        }
    }
});
