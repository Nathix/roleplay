using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GrandTheftMultiplayer.Server;
using GrandTheftMultiplayer.Shared;
using GrandTheftMultiplayer.Server.Elements;

using SARoleplay;
using SARoleplay.Vehicles;
using SARoleplay.Houses;
using SARoleplay.Factions;
using SARoleplay.Businesses;
using SARoleplay.Player;

namespace SARoleplay
{
    public class EntityManager 
    {
        private static List<VehicleController> Vehicles = new List<VehicleController>();
        private static List<FactionController> Factions = new List<FactionController>();
        private static List<HouseController> Houses = new List<HouseController>();
        private static List<BusinessController> Businesses = new List<BusinessController>();
        private static List<PlayerController> Players = new List<PlayerController>();

        public static void Init()
        {
            VehicleController.LoadVehicles();
            FactionController.LoadFactions();
            HouseController.LoadHouses();
            BusinessController.LoadBusinesses();
        }

        /* Player Entity Functions */
        public static void Add(PlayerController player)
        {
            Players.Add(player);
        }

        public static void Remove(PlayerController player)
        {
            Players.Remove(player);
        }

        public static List<PlayerController> GetPlayerControllers()
        {
            return Players;
        }

        public static PlayerController GetPlayerFromClient(Client player)
        {
            return Players.Where(x => x.player == player).ToList<PlayerController>()[0];
        }

        /* Vehicle Entity Functions */
        public static void Add(VehicleController vehicle)
        {
            Vehicles.Add(vehicle);
        }

        public static void Remove(VehicleController vehicle)
        {
            Vehicles.Remove(vehicle);
        }

        public static List<VehicleController> GetVehicleControllers()
        {
            return Vehicles;
        }

        /* House Entity Functions */
        public static void Add(HouseController house)
        {
            Houses.Add(house);
        }

        public static void Remove(HouseController house)
        {
            Houses.Remove(house);
        }

        public static List<HouseController> GetHouseControllers()
        {
            return Houses;
        }

        /* Faction Entity Functions */
        public static void Add(FactionController faction)
        {
            Factions.Add(faction);
        }

        public static void Remove(FactionController faction)
        {
            Factions.Remove(faction);
        }

        public static List<FactionController> GetFactionControllers()
        {
            return Factions;
        }

        /* Business Entity Functions */
        public static void Add(BusinessController business)
        {
            Businesses.Add(business);
        }

        public static void Remove(BusinessController business)
        {
            Businesses.Remove(business);
        }

        public static List<BusinessController> GetBusinessControllers()
        {
            return Businesses;
        }
    }
}
