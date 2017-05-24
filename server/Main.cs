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
        int currentDim = 10000;
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
            EntityManager.Init();
            API.sendChatMessageToAll("~r~Roleplay has started!");

            string test = Utils.WebHelper.GetData("test");
            Console.WriteLine("GET TEST: " + test);

            Dictionary<string, string> data = new Dictionary<string, string>();
            data.Add("email", "test@test.com");
            data.Add("password", "test");
            test = Utils.WebHelper.PostData("test2", data);
            Console.WriteLine("POST TEST: " + test);
        }

        public void OnResourceStop()
        {
            API.sendChatMessageToAll("~r~Roleplay stopped!");
        }

        public void SpawnPlayer(Client player)
        {
            currentDim = currentDim + 1;
            API.setEntityDimension(player, currentDim);
            API.setPlayerSkin(player, PedHash.FreemodeMale01);
            API.setEntityPosition(player, new Vector3(246.4335, 214.0429, 106.2868));
        }

        public void OnUpdate()
        {

        }
    }
}
