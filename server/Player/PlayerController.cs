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
        public Client player;

        public Boolean muted;
        public Boolean LoggedIn;
        public Boolean SelectedCharacter;

        public PlayerController()
        {
            API.onPlayerConnected += OnPlayerConnected;
            API.onPlayerDisconnected += OnPlayerDisconnected;
        }

        public PlayerController(Client player)
        {
            this.AccountData = new Data.Account();
            this.CharacterData = new Data.Character();

            this.player = player;
            this.muted = true;
            this.LoggedIn = false;
            this.SelectedCharacter = false;

            EntityManager.Add(this);
        }

        public void OnPlayerConnected(Client player)
        {
            new PlayerController(player);
        }

        public void OnPlayerDisconnected(Client player, string reason)
        {
            EntityManager.GetPlayerFromClient(player).UnloadAccount();
        }

        public void UnloadAccount()
        {
            EntityManager.Remove(this);
        }
    }
}
