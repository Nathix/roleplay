using System;
using GTANetworkServer;
using GTANetworkShared;

class vehicle_options : Script
{
    public vehicle_options()
    {
        API.onResourceStart += init;
        API.onClientEventTrigger += OnClientEvent;
    }

    public void init()
    {
        API.sendNotificationToAll("~g~Vehicle options started! press F2 to open the menu");
    }

    public void OnClientEvent(Client player, string eventName, params object[] arguments)
    {
        var inVehicle = API.isPlayerInAnyVehicle(player);
        var getVehicle = API.getPlayerVehicle(player);
        switch(eventName)
        {
            case "fixVehiclePlayer":
                if (inVehicle)
                {
                    API.repairVehicle(getVehicle);
                    API.sendNotificationToPlayer(player, "~g~Vehicle repaired");
                } else
                {
                    API.sendNotificationToPlayer(player, "~r~You're not in a vehicle!");
                }
                break;
            case "modVehiclePerformance":
                if(inVehicle)
                {
                    API.setVehicleMod(getVehicle, 11, 3);
                    API.setVehicleMod(getVehicle, 12, 3);
                    API.setVehicleMod(getVehicle, 13, 3);
                    API.setVehicleMod(getVehicle, 15, 3);
                    API.setVehicleMod(getVehicle, 18, 1);
                } else
                {
                    API.sendNotificationToPlayer(player, "~r~You're not in an vehicle!");
                }
                break;
        }
    }
}