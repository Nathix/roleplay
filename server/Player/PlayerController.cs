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
            API.onResourceStop += OnResourceStop;
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
            PlayerController pc = EntityManager.GetPlayerFromClient(player);
            if(pc != null)
            {
                pc.UnloadAccount();
            }
        }

        public void OnResourceStop()
        {
            var pcs = EntityManager.GetPlayerControllers();
            for (int i = 0; i < pcs.Count; i++)
            {
                PlayerController pc = pcs[i];
                pc.UnloadAccount();
            }
        }

        public void UnloadAccount()
        {
            if (this.SelectedCharacter == true)
            {
                JObject data = new JObject();

                data.Add("id", this.CharacterData.Id);
                data.Add("account_id", this.CharacterData.AccountId);
                data.Add("firstname", this.CharacterData.FirstName);
                data.Add("lastname", this.CharacterData.LastName);
                data.Add("character_style", this.CharacterData.CharacterStyle);
                data.Add("playtime_hours", this.CharacterData.PlaytimeHours);
                data.Add("playtime_minutes", this.CharacterData.PlaytimeMinutes);
                data.Add("money", this.CharacterData.Money);
                data.Add("bank", this.CharacterData.Bank);
                data.Add("job_id", this.CharacterData.JobID);
                data.Add("faction_id", this.CharacterData.FactionID);

                Vector3 pos = this.player.position;
                Vector3 rot = this.player.rotation;
                data.Add("position_x", pos.X);
                data.Add("position_y", pos.Y);
                data.Add("position_z", pos.Z);
                data.Add("rotation", pos.Z);

                Utils.WebHelper.PostData("account/characters/save/" + this.CharacterData.Id, data.ToString());
            }

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
                this.CharacterData.Gender = data.Value<int>("gender");
                this.CharacterData.CharacterStyle = data.Value<string>("character_style");
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

                API.setPlayerSkin(player, ((this.CharacterData.Gender == 0) ? PedHash.FreemodeMale01 : PedHash.FreemodeFemale01));
                player.movePosition(new Vector3(this.CharacterData.PositionX, this.CharacterData.PositionY, this.CharacterData.PositionZ), 1);
                player.moveRotation(new Vector3(0, 0, this.CharacterData.Rotation), 1);

                player.collisionless = false;
                player.invincible = false;
                player.freezePosition = false;
                player.nametagVisible = true;
                player.transparency = 255;
                player.dimension = 1;

                this.muted = false;
                this.SelectedCharacter = true;

                player.name = this.CharacterData.FirstName + "_" + this.CharacterData.LastName;

                //JObject charStyleData = JObject.Parse(this.CharacterData.CharacterStyle);
                //player.setSyncedData("player:character:data", this.CharacterData.CharacterStyle);

                //player.setClothes(2, charStyleData.Value<int>("hairStyle"), 0);
                //API.sendNativeToPlayer(player, Hash._SET_PED_HAIR_COLOR, player, charStyleData.Value<int>("hairColor"), 0);
                //API.sendNativeToPlayer(player, Hash.SET_PED_HEAD_BLEND_DATA, player, charStyleData.Value<int>("parent1"), charStyleData.Value<int>("parent2"), 0, charStyleData.Value<int>("parent1"), charStyleData.Value<int>("parent2"), 0, 50.00, 50.00, 0, false);
            }
        }
    }
}
