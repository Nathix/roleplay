var selectingDoor = false;
var lastDoor = null;
var lastDoorV = 0;

var ped1;
var ped2;
var ped3;

API.onServerEventTrigger.connect(function (eventname, args) {
    if (eventname == "player:character:selection:show") {
        ped1 = API.createPed(1885233650, new Vector3(256.5341, 212.1253, 106.2869), 30.5);
        ped2 = API.createPed(1885233650, new Vector3(253.4211, 213.1638, 106.2869), 3);
        ped3 = API.createPed(1885233650, new Vector3(250.5341, 214.2292, 106.2869), -72.5);

        var cam = API.createCamera(new Vector3(254.7309, 216.7014, 112.00), new Vector3(0, 0, 0));
        API.pointCameraAtEntity(cam, ped2, new Vector3(0, 0, 0));
        API.setActiveCamera(cam);
    }
});

API.onUpdate.connect(function () {
    if (lastDoor) {
        API.displaySubtitle("~g~Name: ~w~Bob~n~~g~Faction: ~w~Test");
    }

	if (selectingDoor) {
		var cursOp = API.getCursorPositionMantainRatio();
        var s2w = API.screenToWorldMantainRatio(cursOp);
        var rayCast = API.createRaycast(new Vector3(254.7309, 216.7014, 112.00), s2w, 4 | 8 | 12, null);
		var localH = null;
		var localV = 0;
        if (rayCast.didHitEntity) {
            localH = rayCast.hitEntity;
			localV = localH.Value;
		}

        if (localV != lastDoorV && localH != null) {
			if (localH != null) API.setEntityTransparency(localH, 50);
			if (lastDoor != null) API.setEntityTransparency(lastDoor, 255);
			lastDoor = localH;
			lastDoorV = localV;
		}		

		if (API.isDisabledControlJustPressed(24)) {
			API.showCursor(false);
			selectingDoor = false;

            if (localH != null) {
                if (localV == ped1.Value) {
                    API.sendChatMessage("You selected character 1");
                }
                else if (localV == ped2.Value) {
                    API.sendChatMessage("You selected character 2");
                }
                else if (localV == ped3.Value) {
                    API.sendChatMessage("You selected character 3");
                }
                //API.triggerServerEvent("doormanager_debug_createdoor", API.getEntityModel(localH), API.getEntityPosition(localH));
			}
		}
	}
});

API.onKeyDown.connect(function (sender, e) {
    if (e.KeyCode == Keys.Space) {
        selectingDoor = !selectingDoor;
        API.showCursor(selectingDoor);
    }
});