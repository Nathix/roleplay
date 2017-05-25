using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GTANetworkServer;
using GTANetworkShared;
using Newtonsoft.Json.Linq;

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

        public void LoadCharacter(int charID)
        {
            string result = Utils.WebHelper.GetData("account/characters/load/" + charID.ToString());
            JObject json = JObject.Parse(result);
            JObject data = json.Value<JObject>("data");

            if(data != null)
            {
                this.CharacterData.Id = data.Value<int>("id");
                this.CharacterData.AccountId = data.Value<int>("account_id");
                this.CharacterData.FirstName = data.Value<string>("firstname");
                this.CharacterData.LastName = data.Value<string>("lastname");
                this.CharacterData.RegisteredDate = data.Value<string>("registered_date");
                this.CharacterData.LastOnlineDate = data.Value<string>("last_online_date");
                this.CharacterData.PlaytimeHours = data.Value<int>("playtime_hours");
                this.CharacterData.PlaytimeMinutes = data.Value<int>("playtime_minutes");
                this.CharacterData.PositionX = data.Value<float>("position_x");
                this.CharacterData.PositionY = data.Value<float>("position_y");
                this.CharacterData.PositionZ = data.Value<float>("position_z");
                this.CharacterData.Rotation = data.Value<float>("rotation");
                this.CharacterData.Money = data.Value<int>("money");
                this.CharacterData.Bank = data.Value<int>("bank");
                this.CharacterData.JobID = data.Value<int>("job_id");
                this.CharacterData.FactionID = data.Value<int>("faction_id");
                this.CharacterData.Online = true;

                API.triggerClientEvent(player, "player:character:selection:hide");
                player.movePosition(new Vector3(this.CharacterData.PositionX, this.CharacterData.PositionY, this.CharacterData.PositionZ), 3);

                player.collisionless = false;
                player.invincible = false;
                player.freezePosition = false;
                this.SelectedCharacter = true;
            }
        }
    }
}
