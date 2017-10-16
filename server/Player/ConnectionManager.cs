using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GrandTheftMultiplayer.Server;
using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Constant;
using GrandTheftMultiplayer.Server.Elements;
using GrandTheftMultiplayer.Shared;
using GrandTheftMultiplayer.Shared.Math;
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

            Utils.ChatHelper.SendCustomMessage(player, "Welcome to San Andreas Roleplay");
            Utils.ChatHelper.SendInformationMessage(player, "Please /login or register at SA-ROLEPLAY.COM");
        }

        public void OnPlayerDisconnected(Client player, string reason)
        {
            // Save player
        }

        public void OnClientEventTrigger(Client player, string eventName, params object[] arguments)
        {
            if(eventName == "player:character:selection:selected")
            {
                PlayerController playerController = EntityManager.GetPlayerFromClient(player);
                if (playerController != null)
                {
                    playerController.LoadCharacter((int)arguments[0]);
                }
                else
                {
                    // This should be impossible but just incase.
                    Console.WriteLine("Couldn't find a player controller for player " + player.name + " ~ " + player.socialClubName);
                    player.kick("Unknown error occured.");
                }
            }
            else if(eventName == "player:character:selection:create")
            {
                API.triggerClientEvent(player, "player:character:selection:hide");
                API.triggerClientEvent(player, "player:character:creation:show");
            }
            else if(eventName == "player:character:creation:finish")
            {
                JObject data = JObject.Parse(arguments[0].ToString());

                Dictionary<string, string> nameCheckData = new Dictionary<string, string>();
                nameCheckData.Add("firstname", data.Value<string>("firstname"));
                nameCheckData.Add("lastname", data.Value<string>("lastname"));
                string result = Utils.WebHelper.PostData("account/characters/check", nameCheckData);
                JObject NameCheck = JObject.Parse(result);

                if(NameCheck.Value<string>("status") == "error")
                {
                    Utils.ChatHelper.SendErrorMessage(player, NameCheck.Value<string>("message"));
                }
                else
                {
                    Utils.ChatHelper.SendSuccessMessage(player, "Character available, creating..");
                    PlayerController playerController = EntityManager.GetPlayerFromClient(player);
                    string accountID = playerController.AccountData.Id.ToString();

                    string creationResult = Utils.WebHelper.PostData("account/characters/create/" + accountID, data.ToString());
                    JObject creationData = JObject.Parse(creationResult);

                    if(creationData.Value<string>("status") == "success")
                    {
                        playerController.LoadCharacter(creationData.Value<int>("data"));
                        API.triggerClientEvent(player, "player:character:creation:hide");
                    }
                    else
                    {
                        Utils.ChatHelper.SendErrorMessage(player, NameCheck.Value<string>("message"));
                    }
                }
            }
        }
    }
}
