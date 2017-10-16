using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GrandTheftMultiplayer.Server;
using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Elements;
using GrandTheftMultiplayer.Server.Managers;
using GrandTheftMultiplayer.Shared;
using Newtonsoft.Json.Linq;
using SARoleplay;
using SARoleplay.Player;

namespace SARoleplay.Commands
{
    public class AccountCommands : Script
    {
        public AccountCommands()
        {
            
        }

        [Command("login", "Usage: /login [username] [password]", SensitiveInfo = true)]
        public void LoginCmd(Client player, string username, string password)
        {
            PlayerController playerController = EntityManager.GetPlayerFromClient(player);
            if (playerController != null)
            {
                if (playerController.LoggedIn == false)
                {
                    Dictionary<string, string> data =
                        new Dictionary<string, string>
                        {
                            {"username", username},
                            {"password", password},
                            {"scname", player.socialClubName},
                            {"ip", player.address}
                        };
                    string result = Utils.WebHelper.PostData("account/login", data);
                    JObject test = JObject.Parse(result);

                    if (test != null)
                    {
                        if (test.Value<string>("status") == "error")
                        {
                            Utils.ChatHelper.SendErrorMessage(player, test.Value<string>("message"));
                        }
                        else if (test.Value<string>("status") == "success")
                        {
                            JObject accountData = test.Value<JObject>("data");
                            Utils.ChatHelper.SendSuccessMessage(player,
                                "Welcome back " + accountData.Value<string>("social_club_name") + "!");
                            API.triggerClientEvent(player, "player:camera:stop");
                            API.triggerClientEvent(player, "player:login:hide");
                            API.triggerClientEvent(player, "player:character:selection:show");

                            playerController.AccountData.Id = accountData.Value<int>("id");
                            playerController.AccountData.ForumId = accountData.Value<int>("forum_id");
                            playerController.AccountData.SocialClubName = accountData.Value<string>("social_club_name");
                            playerController.AccountData.IP = player.address;
                            playerController.AccountData.RegisteredDate = accountData.Value<string>("registered_date");
                            playerController.AccountData.LastOnlineDate = accountData.Value<string>("last_online_date");
                            playerController.AccountData.Online = true;
                            playerController.AccountData.Admin = accountData.Value<Boolean>("admin");
                            playerController.AccountData.Support = accountData.Value<Boolean>("support");
                            playerController.AccountData.AdminName = accountData.Value<string>("admin_name");
                            playerController.LoggedIn = true;
                            //player.collisionless = false;
                            //player.invincible = false;
                            //player.freezePosition = false;

                            var charData =
                                Utils.WebHelper.GetData("account/characters/get/" + playerController.AccountData.Id);
                            API.triggerClientEvent(player, "player:character:selection:data", charData);
                        }
                        else
                        {
                            // This should be impossible but just incase.
                            Utils.ChatHelper.SendErrorMessage(player, "Unknown error occurred.");
                            player.kick("Unknown error occured.");
                        }
                    }
                    else
                    {
                        Utils.ChatHelper.SendErrorMessage(player, "Invalid username / password! Please try again.");
                    }
                    API.triggerClientEvent(player, "player:login:reset");
                }
                else
                {
                    Utils.ChatHelper.SendErrorMessage(player, "You are already logged in.");
                }
            }
            else
            {
                // This should be impossible but just incase.
                Console.WriteLine("Couldn't find a player controller for player " + player.name + " ~ " + player.socialClubName);
                player.kick("Unknown error occured.");
            }
        }
    }
}
