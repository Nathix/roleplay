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

        public static PlayerController GetPlayerFromAccountId(int id)
        {
            return Players.Where(x => x.AccountData.Id == id).ToList<PlayerController>()[0];
        }

        public static PlayerController GetPlayerFromCharacterId(int id)
        {
            return Players.Where(x => x.CharacterData.Id == id).ToList<PlayerController>()[0];
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

        public static VehicleController GetVehicleFromHandle(Vehicle vehicle)
        {
            return Vehicles.Where(x => x.vehicle == vehicle).ToList<VehicleController>()[0];
        }

        public static VehicleController GetVehicleFromId(int id)
        {
            return Vehicles.Where(x => x.VehicleData.Id == id).ToList<VehicleController>()[0];
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

        public static HouseController GetHouseFromId(int id)
        {
            return Houses.Where(x => x.HouseData.Id == id).ToList<HouseController>()[0];
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

        public static FactionController GetFactionFromId(int id)
        {
            return Factions.Where(x => x.FactionData.Id == id).ToList<FactionController>()[0];
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

        public static BusinessController GetBusinessFromId(int id)
        {
            return Businesses.Where(x => x.BusinessData.Id == id).ToList<BusinessController>()[0];
        }
    }
}
