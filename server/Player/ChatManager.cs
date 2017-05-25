using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GTANetworkServer;
using GTANetworkShared;
using SARoleplay;

namespace SARoleplay.Player
{
    public class ChatManager : Script
    {
        public ChatManager()
        {
            API.onChatMessage += OnChatMessageHandler;
        }
        
        public void OnChatMessageHandler(Client client, string message, CancelEventArgs e)
        {
            PlayerController player = EntityManager.GetPlayerFromHandle(client.handle);

            if(player.muted)
            {
                Utils.ChatHelper.SendErrorMessage(client, "You are muted.");
            }
            else
            {
                SendLocalMessage(client, 15.0f, "~#FFFFFF~", client.name + " says: " + message);
            }
            e.Cancel = true;
        }

        public static void SendLocalMessage(Client client, float radius, string color, string message)
        {
            PlayerController player = EntityManager.GetPlayerFromHandle(client.handle);
            if (player.muted)
            {
                Utils.ChatHelper.SendErrorMessage(client, "You are muted.");
            }
            else
            {
                Utils.ChatHelper.SendLocalMessage(client, radius, color, message);
            }
        }

        public static void SendGlobalMessage(Client client, string color, string msg)
        {
            PlayerController player = EntityManager.GetPlayerFromHandle(client.handle);
            if (player.muted)
            {
                Utils.ChatHelper.SendErrorMessage(client, "You are muted.");
            }
            else
            {
                foreach (Client c in API.shared.getAllPlayers())
                {
                    API.shared.sendChatMessageToPlayer(c, color, msg);
                }
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
            SendGlobalMessage(player, "~#FFFFFF~", "(( " + player.name + ": " + msg + " ))");
        }
       
    }
}
