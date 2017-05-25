using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GTANetworkServer;
using GTANetworkShared;

namespace SARoleplay.Player
{
    public class PlayerController : Script
    {
        public Data.Account AccountData;
        public Data.Character CharacterData;
        public NetHandle player;

        public Boolean muted;

        public PlayerController()
        {
            API.onPlayerConnected += OnPlayerConnected;
            API.onPlayerDisconnected += OnPlayerDisconnected;
        }

        public PlayerController(NetHandle player)
        {
            this.player = player;
            this.muted = true;
            EntityManager.Add(this);
        }

        public void OnPlayerConnected(Client player)
        {
            PlayerController temp = new PlayerController(player);
        }

        public void OnPlayerDisconnected(Client player, string reason)
        {

        }

        public void LoadAccount(int id)
        {

        }

        public void UnloadAccount()
        {
            EntityManager.Remove(this);
        }
    }
}
