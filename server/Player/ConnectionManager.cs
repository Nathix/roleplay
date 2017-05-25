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
    public class ConnectionManager : Script
    {
        private static readonly Vector3 _startPos = new Vector3(246.4335, 214.0429, 106.2868);
        private static readonly Vector3 _startCamPos = new Vector3(671, 1284, 380);
        private static readonly Vector3 _startCamRot = new Vector3(0, 0, 160);
        private static readonly Vector3 _endCamPos = new Vector3(-1232, -2817, 200);
        private static readonly Vector3 _endCamRot = new Vector3(0, 0, -40);
        private static readonly int _camTime = 60 * 1000;

        public ConnectionManager()
        {
            API.onPlayerConnected += OnPlayerConnected;
            API.onPlayerFinishedDownload += OnPlayerFinishedDownload;
            API.onPlayerDisconnected += OnPlayerDisconnected;
            API.onClientEventTrigger += OnClientEventTrigger;
        }

        public void OnPlayerConnected(Client player)
        {
            // Check if player is banned
        }

        public void OnPlayerFinishedDownload(Client player)
        {
            // Start login
            player.position = _startPos;
            player.transparency = 0;
            player.nametagVisible = false;
            player.collisionless = true;
            player.invincible = true;
            player.freezePosition = true;
            player.setSkin(PedHash.FreemodeMale01);

            API.triggerClientEvent(player, "player:camera:interpolate", _camTime, _startCamPos, _endCamPos, _startCamRot, _endCamRot);
            API.triggerClientEvent(player, "player:login:show");
        }

        public void OnPlayerDisconnected(Client player, string reason)
        {
            // Save player
        }

        public void OnClientEventTrigger(Client player, string eventName, params object[] arguments)
        {
            if(eventName == "player:login:process")
            {
                Dictionary<string, string> data = new Dictionary<string, string>();
                data.Add("username", arguments[0].ToString());
                data.Add("password", arguments[1].ToString());
                data.Add("scname", player.socialClubName);
                string result = Utils.WebHelper.PostData("account/login", data);
                JObject test = JObject.Parse(result);

                if(test != null)
                {
                    if(test.Value<string>("status") == "error")
                    {
                        Utils.ChatHelper.SendErrorMessage(player, test.Value<string>("message"));
                    }
                    else if(test.Value<string>("status") == "success")
                    {
                        JObject accountData = test.Value<JObject>("data");
                        Utils.ChatHelper.SendSuccessMessage(player, "Welcome back " + accountData.Value<string>("social_club_name") + "!");
                        API.triggerClientEvent(player, "player:camera:stop");
                        API.triggerClientEvent(player, "player:login:hide");
                        API.triggerClientEvent(player, "player:character:selection:show");
                        //player.collisionless = false;
                        //player.invincible = false;
                        //player.freezePosition = false;
                    }
                    else
                    {
                        Utils.ChatHelper.SendErrorMessage(player, "Unknown error occurred.");
                    }
                }
                else
                {
                    Utils.ChatHelper.SendErrorMessage(player, "Invalid username / password! Please try again.");
                }
                API.triggerClientEvent(player, "player:login:reset");
            }
        }
    }
}
