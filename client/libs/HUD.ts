/// <reference path="../types-gt-mp/Declarations.d.ts" />
class HUD {
    //Speedometer stuff
    getPlayer: LocalHandle;
    playerInVehicle: boolean;
    getVehicle: LocalHandle;
    getVelocity: Vector3;
    getVehicleHealth: number;
    getVehicleClass: number;
    speed: number;
    speedInKnots: number;
    speedInMph: number;

    //Player info like money and shit idk
    getMoney: null;

    showSpeed() {
        this.getPlayer = API.getLocalPlayer();
        this.playerInVehicle = API.isPlayerInAnyVehicle(this.getPlayer);

        if(this.playerInVehicle)  {
            this.getVehicle = API.getPlayerVehicle(this.getPlayer);

            if(API.getPlayerVehicleSeat(this.getPlayer) == -1) {
                this.getVelocity = API.getEntityVelocity(this.getPlayer);

                this.speed = Math.sqrt(
                    this.getVelocity.X * this.getVelocity.X +
                    this.getVelocity.Y * this.getVelocity.Y +
                    this.getVelocity.Z * this.getVelocity.Z
                );

                this.getVehicleHealth = Math.round(API.getVehicleHealth(this.getVehicle) / 10);

                this.getVehicleClass = API.getVehicleClass(API.getEntityModel(this.getVehicle));

                this.speedInMph = Math.round(this.speed * 2.23694); // MPH because we are in 'Murica
                this.speedInKnots = Math.round(this.speed * 1.9438477170141); // Knots for Air/Water vehicles

                switch(this.getVehicleClass)  {
                    case 14: case 15: case 16: //boat, planes, helicopters
                        API.drawText(this.speedInKnots.toString(), 345, 950, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
                        API.drawText("Knt", 470, 950, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
                        break;
                    default: //Everything else
                        API.drawText(this.speedInMph.toString(), 345, 950, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
                        API.drawText("MPH", 470, 950, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
                        break;
                }
                API.drawText(this.getVehicleHealth.toString(), 345, 1000, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
                API.drawText("% health", 470, 1000, 1, 255, 255, 255, 255, 4, 0, false, false, 0);
            }
        }
    }
}
