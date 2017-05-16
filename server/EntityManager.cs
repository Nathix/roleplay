using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GTANetworkServer;
using GTANetworkShared;

namespace SARoleplay.Server
{
    public class EntityManager
    {
        private Dictionary<int, NetHandle> Vehicles = new Dictionary<int, NetHandle>();
        private Dictionary<int, NetHandle> Factions = new Dictionary<int, NetHandle>();
        private Dictionary<int, NetHandle> Houses = new Dictionary<int, NetHandle>();
        private Dictionary<int, NetHandle> Businesses = new Dictionary<int, NetHandle>();
        private Dictionary<int, NetHandle> Players = new Dictionary<int, NetHandle>();

        public static void Init()
        {

        }
    }
}
