/// <reference path="types-gtanetwork/index.d.ts" />

var res = API.getScreenResolution();

API.onUpdate.connect(function () {
    var player = API.getLocalPlayer();
    var inveh = API.isPlayerInAnyVehicle(player)

    if (inveh) {
        var veh = API.getPlayerVehicle(player);
        var vel = API.getEntityVelocity(player);
        var rpm = Math.floor(API.getVehicleRPM(veh) * 1000);
        var speed = Math.sqrt(
            vel.X * vel.X +
            vel.Y * vel.Y +
            vel.Z * vel.Z
            );
        var speedInMph = Math.round(speed * 2.23694); // MPH because we are in America
        var vehHealth = Math.round(API.getVehicleHealth(veh) / 10);

        API.drawText(speedInMph.toString(), 345, 900, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
        API.drawText("MPH", 470, 900, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
        API.drawText(rpm.toString(), 345, 950, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
        API.drawText("RPM", 470, 950, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
        API.drawText(vehHealth + "", 345, 1000, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
        API.drawText("% health", 470, 1000, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
    }
});