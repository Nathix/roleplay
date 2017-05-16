using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GTANetworkServer;
using GTANetworkShared;

namespace SARoleplay.Factions
{
    public class FactionController : Script
    {
        public FactionController()
        {
            EntityManager.Add(this);
        }

        public static void LoadFactions()
        {
            // Load all factions
        }

        public void LoadFaction(int id)
        {
            // Load specific faction
        }

        public static void UnloadFactions()
        {
            List<FactionController> Factions = EntityManager.GetFactionControllers();
            foreach (FactionController f in Factions)
            {
                f.UnloadFaction();
            }
        }

        public void UnloadFaction()
        {
            EntityManager.Remove(this);
        }
    }
}
