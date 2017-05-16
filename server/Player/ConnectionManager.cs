using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GTANetworkServer;
using GTANetworkShared;

namespace SARoleplay.Player
{
    public class ConnectionManager : Script
    {
        private static readonly Vector3 _startPos = new Vector3(671, 1284, 363);
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
        }

        public void OnPlayerConnected(Client player)
        {
            // Check if player is banned
        }

        public void OnPlayerFinishedDownload(Client player)
        {
            // Start login
            API.triggerClientEvent(player, "player:camera:interpolate", _camTime, _startCamPos, _endCamPos, _startCamRot, _endCamRot);
            player.position = _startPos;
            player.transparency = 0;
            player.nametagVisible = false;
            player.freeze(true);
            API.triggerClientEvent(player, "player:login:show");
        }

        public void OnPlayerDisconnected(Client player, string reason)
        {
            // Save player
        }
    }
}
