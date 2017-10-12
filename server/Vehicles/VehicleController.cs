using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GrandTheftMultiplayer.Server;
using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Elements;
using GrandTheftMultiplayer.Shared;

namespace SARoleplay.Vehicles
{
    public class VehicleController : Script
    {
        public Data.Vehicle VehicleData;
        public Vehicle vehicle;

        public VehicleController()
        {

        }

        public VehicleController(Vehicle vehicle)
        {
            this.vehicle = vehicle;
            EntityManager.Add(this);
        }

        public static void LoadVehicles()
        {
            // Load all vehicles
        }

        public void LoadVehicle(int id)
        {
            // Load specific vehicle
        }

        public static void UnloadVehicles()
        {
            List<VehicleController> Vehicles = EntityManager.GetVehicleControllers();
            foreach (VehicleController v in Vehicles)
            {
                v.UnloadVehicle();
            }
        }

        public void UnloadVehicle()
        {
            vehicle.delete();
            EntityManager.Remove(this);
        }
    }
}
