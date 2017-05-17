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
            EntityManager.Init();
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
