using GTANetworkServer;
using GTANetworkShared;

namespace SARoleplay.Server
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
            API.sendChatMessageToAll("~r~Roleplay has started!");
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
