using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GTANetworkServer;
using GTANetworkShared;

namespace SARoleplay.Utils
{
    public static class PlayerHelper
    {
        public static List<Client> GetPlayersInRadiusOfPlayer(float radius, Client player)
        {
            List<Client> clients = new List<Client>();

            List<Client> radiusPlayers = API.shared.getPlayersInRadiusOfPlayer(radius, player);
            foreach (Client c in radiusPlayers)
            {
                if (c.dimension == player.dimension)
                    clients.Add(c);
            }

            return clients;
        }
    }
}
