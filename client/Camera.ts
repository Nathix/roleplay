/// <reference path="types-gtanetwork/index.d.ts" />

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
