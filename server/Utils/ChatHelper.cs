using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GrandTheftMultiplayer.Server;
using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Elements;
using GrandTheftMultiplayer.Shared;

namespace SARoleplay.Utils
{
    public static class ChatHelper
    {
        public static void SendCustomMessage(string message)
        {
            API.shared.sendChatMessageToAll(message);
        }

        public static void SendCustomMessage(Client player, string message)
        {
            API.shared.sendChatMessageToPlayer(player, message);
        }

        public static void SendSuccessMessage(string message)
        {
            API.shared.sendChatMessageToAll("~g~SUCCESS: ~w~" + message);
        }

        public static void SendSuccessMessage(Client player, string message)
        {
            API.shared.sendChatMessageToPlayer(player, "~g~SUCCESS: ~w~" + message);
        }

        public static void SendErrorMessage(string message)
        {
            API.shared.sendChatMessageToAll("~r~ERROR: ~w~" + message);
        }

        public static void SendErrorMessage(Client player, string message)
        {
            API.shared.sendChatMessageToPlayer(player, "~r~ERROR: ~w~" + message);
        }

        public static void SendWarningMessage(string message)
        {
            API.shared.sendChatMessageToAll("~y~WARNING: ~w~" + message);
        }

        public static void SendWarningMessage(Client player, string message)
        {
            API.shared.sendChatMessageToPlayer(player, "~y~WARNING: ~w~" + message);
        }

        public static void SendInformationMessage(string message)
        {
            API.shared.sendChatMessageToAll("~b~INFORMATION: ~w~" + message);
        }

        public static void SendInformationMessage(Client player, string message)
        {
            API.shared.sendChatMessageToPlayer(player, "~b~INFORMATION: ~w~" + message);
        }

        public static void SendLocalMessage(Client player, float radius, string color, string msg)
        {
            List<Client> localPlayers = API.shared.getPlayersInRadiusOfPlayer(radius, player);
            foreach (Client c in localPlayers)
            {
                API.shared.sendChatMessageToPlayer(c, color, msg);
            }
        }
    }
}
