using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using GTANetworkServer;
using GTANetworkShared;

namespace SARoleplay
{
    class Main : Script
    {
        public Main()
        {
            API.onResourceStart += OnResourceStart;
            API.onResourceStop += OnResourceStop;
            

            API.onPlayerRespawn += SpawnPlayer;
            API.onPlayerFinishedDownload += SpawnPlayer;
            API.onUpdate += OnUpdate;
        }

        public void OnResourceStart()
        {
            API.setGamemodeName("SARP Alpha");
            API.sendChatMessageToAll("~r~Roleplay has started!");

            Utils.WebHelper.GetData("reset");

            EntityManager.Init();
        }

        public void OnResourceStop()
        {
            API.sendChatMessageToAll("~r~Roleplay stopped!");
        }

        public void SpawnPlayer(Client player)
        {

        }

        public void OnUpdate()
        {

        }
    }
}
