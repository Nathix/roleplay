using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GrandTheftMultiplayer.Server;
using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Elements;
using GrandTheftMultiplayer.Shared;

namespace SARoleplay.Houses
{
    public class HouseController : Script
    {
        public Data.House HouseData;

        public HouseController()
        {
            EntityManager.Add(this);
        }

        public static void LoadHouses()
        {
            // Load all houses
        }

        public void LoadHouse(int id)
        {
            // Load specific house
        }

        public static void UnloadHouses()
        {
            List<HouseController> Houses = EntityManager.GetHouseControllers();
            foreach (HouseController h in Houses)
            {
                h.UnloadHouse();
            }
        }

        public void UnloadHouse()
        {
            EntityManager.Remove(this);
        }
    }
}
