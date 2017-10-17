using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GrandTheftMultiplayer.Server;
using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Elements;
using GrandTheftMultiplayer.Shared;
using Newtonsoft.Json.Linq;
using SARoleplay.Data;

namespace SARoleplay.Factions
{
    public class FactionController : Script
    {
        public Data.Faction FactionData;
        public Dictionary<int, Data.FactionRank> FactionRankData;
        public Dictionary<int, Data.FactionVehicle> FactionVehicleData;
        public Dictionary<int, Data.FactionMember> FactionMemberData;

        public FactionController()
        {
            API.onResourceStop += OnResourceStop;
        }

        public FactionController(int id)
        {
            this.FactionData = new Data.Faction();
            this.FactionRankData = new Dictionary<int, FactionRank>();
            this.FactionVehicleData = new Dictionary<int, FactionVehicle>();
            this.FactionMemberData = new Dictionary<int, FactionMember>();

            this.LoadFaction(id);
            EntityManager.Add(this);
        }

        public static void LoadFactions()
        {
            string result = Utils.WebHelper.GetData("faction/ids");
            dynamic json = JObject.Parse(result);
            var data = json.data;

            if (data != null)
            {
                Console.WriteLine("- Loading Factions!");
                foreach (var item in json.data)
                {
                    new FactionController((int)item);
                }
            }
        }

        public void LoadFaction(int id)
        {
            string result = Utils.WebHelper.GetData("faction/data/load/" + id.ToString());
            JObject json = JObject.Parse(result);
            JObject data = json.Value<JObject>("data");

            if (data != null)
            {
                this.FactionData.Id = data.Value<int>("id");
                this.FactionData.LongName = data.Value<string>("long_name");
                this.FactionData.ShortName = data.Value<string>("short_name");
                this.FactionData.Type = data.Value<int>("type");
                this.FactionData.LeaderID = data.Value<int>("leader_id");
                
                JObject garageData = JObject.Parse(data.Value<string>("garage_data"));
                this.FactionData.GaragePosX = garageData.Value<float>("posX");
                this.FactionData.GaragePosY = garageData.Value<float>("posY");
                this.FactionData.GaragePosZ = garageData.Value<float>("posZ");
                this.FactionData.GarageRotX = garageData.Value<float>("rotX");
                this.FactionData.GarageRotY = garageData.Value<float>("rotY");
                this.FactionData.GarageRotZ = garageData.Value<float>("rotZ");

                JObject dutyData = JObject.Parse(data.Value<string>("duty_data"));
                this.FactionData.DutyPosX = dutyData.Value<float>("posX");
                this.FactionData.DutyPosY = dutyData.Value<float>("posY");
                this.FactionData.DutyPosZ = dutyData.Value<float>("posZ");
                this.FactionData.DutyRotX = dutyData.Value<float>("rotX");
                this.FactionData.DutyRotY = dutyData.Value<float>("rotY");
                this.FactionData.DutyRotZ = dutyData.Value<float>("rotZ");

                this.FactionData.Bank = data.Value<int>("leader_id");

                Console.WriteLine("Loaded faction: " + this.FactionData.LongName);
            }
        }

        public static void UnloadFactions()
        {
            Console.WriteLine("- Saving Factions!");

            List<FactionController> factions = EntityManager.GetFactionControllers();
            for (int i = factions.Count - 1; i >= 0; i--)
            {
                factions[i].UnloadFaction();
            }
        }

        public void UnloadFaction()
        {
            Console.WriteLine("Saving Faction: " + this.FactionData.LongName);

            JObject data = new JObject();
            data.Add("id", this.FactionData.Id);
            data.Add("long_name", this.FactionData.LongName);
            data.Add("short_name", this.FactionData.ShortName);
            data.Add("type", this.FactionData.Type);
            data.Add("leader_id", this.FactionData.LeaderID);
            data.Add("bank", this.FactionData.Bank);

            Utils.WebHelper.PostData("faction/data/save/" + this.FactionData.Id, data.ToString());

            EntityManager.Remove(this);
        }

        public void OnResourceStop()
        {
            UnloadFactions();
        }
    }
}
