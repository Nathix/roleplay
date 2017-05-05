using GTANetworkServer;
using GTANetworkShared;

namespace server
{
    class Main : Script
    {
        public Main()
        {
            API.onResourceStart += init;
            API.onResourceStop += stop;
            

            API.onPlayerRespawn += spawnPlayer;
            API.onPlayerFinishedDownload += spawnPlayer;
            API.onUpdate += update;
        }

        public void init()
        {
            API.sendChatMessageToAll("~r~Roleplay has started!");
        }

        public void stop()
        {
            API.sendChatMessageToAll("~r~Roleplay stopped!");
        }

        public void spawnPlayer(Client player)
        {

        }

        public void update()
        {

        }
    }
}
