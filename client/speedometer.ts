/// <reference path="types-gtanetwork/index.d.ts" />

var res = API.getScreenResolution();

API.onUpdate.connect(function () {
    var player = API.getLocalPlayer();
    var inveh = API.isPlayerInAnyVehicle(player)

    if (inveh) {
        var veh = API.getPlayerVehicle(player);

        if (API.getPlayerVehicleSeat(player) == -1) {
            var vel = API.getEntityVelocity(player);
            var speed = Math.sqrt(
                vel.X * vel.X +
                vel.Y * vel.Y +
                vel.Z * vel.Z
            );

            var vehHealth = Math.round(API.getVehicleHealth(veh) / 10);

            var vehClass = API.getVehicleClass(API.getEntityModel(veh));
            switch (vehClass) {
                case 14: // Boats
                case 15: // Helicopters
                case 16: // Planes
                    var speedInKnots = Math.round(speed * 1.9438477170141); // Knots for Air/Water vehicles
                    API.drawText(speedInKnots.toString(), 345, 900, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
                    API.drawText("Kts", 470, 900, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
                    break;
                default: // Everything else
                    var speedInMph = Math.round(speed * 2.23694); // MPH because we are in America
                    API.drawText(speedInMph.toString(), 345, 900, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
                    API.drawText("MPH", 470, 900, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
                    break;
            }
            API.drawText(vehHealth + "", 345, 950, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
            API.drawText("% health", 470, 950, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
        }
    }
});