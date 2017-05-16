using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GTANetworkServer;
using GTANetworkShared;

namespace SARoleplay.Player
{
    public class ChatManager : Script
    {
        public ChatManager()
        {
            API.onChatMessage += OnChatMessageHandler;
        }

        public void OnChatMessageHandler(Client player, string message, CancelEventArgs e)
        {
            SendLocalMessage(player, 15.0f, "~#FFFFFF~", player.name + " says: " + message);
            e.Cancel = true;
        }

        public static void SendLocalMessage(Client player, float radius, string color, string msg)
        {
            List<Client> localPlayers = API.shared.getPlayersInRadiusOfPlayer(radius, player);
            foreach (Client c in localPlayers)
            {
                API.shared.sendChatMessageToPlayer(c, color, msg);
            }
        }

        public static void SendGlobalMessage(string color, string msg)
        {
            foreach (Client c in API.shared.getAllPlayers())
            {
                API.shared.sendChatMessageToPlayer(c, color, msg);
            }
        }
        
        [Command("me", GreedyArg = true)]
        public void CommandMe(Client player, string msg)
        {
            SendLocalMessage(player, 15.0f, "~#C2A2DA~", player.name + " " + msg);
        }

        [Command("do", GreedyArg = true)]
        public void CommandDo(Client player, string message)
        {
            SendLocalMessage(player, 15.0f, "~#C2A2DA~", "* " + message + " (( " + player.name + " ))");
        }

        [Command("s", Alias = "shout", GreedyArg = true)]
        public void CommandShout(Client player, string message)
        {
            SendLocalMessage(player, 25.0f, "~#FFFFFF~", player.name + " shouts: " + message + "!");
        }

        [Command("w", Alias = "whisper", GreedyArg = true)]
        public void CommandWhisper(Client player, string message)
        {
            SendLocalMessage(player, 7.5f, "~#FFFFFF~", player.name + " whispers: " + message);
        }

        [Command("b", Alias = "booc,looc", GreedyArg = true)]
        public void CommandLocalOOC(Client player, string msg)
        {
            SendLocalMessage(player, 15.0f, "~#FFFFFF~", player.name + ": (( " + msg + " ))");
        }

        [Command("o", Alias = "ooc", GreedyArg = true)]
        public void CommandOOC(Client player, string msg)
        {
            SendGlobalMessage("~#FFFFFF~", "(( " + player.name + ": " + msg + " ))");
        }
       
    }
}
