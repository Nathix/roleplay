/// <reference path="types-gt-mp/Declarations.d.ts" />

API.onServerEventTrigger.connect((name, args) => {
    if (name === "player:camera:interpolate") {
        const startCamera = API.createCamera(args[1], args[3]);
        const endCamera = API.createCamera(args[2], args[4]);

        API.interpolateCameras(startCamera, endCamera, args[0], true, true);
    }
    else if (name === "player:camera:stop") {
        API.setGameplayCameraActive();
    }
});
