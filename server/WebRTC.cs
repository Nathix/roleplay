﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

using GrandTheftMultiplayer.Server;
using GrandTheftMultiplayer.Shared;
using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Elements;
using Fleck;
using Newtonsoft.Json.Linq;

namespace SARoleplay
{
    public class WebRTC : Script
    {
        List<IWebSocketConnection> allSockets = new List<IWebSocketConnection>(); // all socket connections
        Dictionary<Client, IWebSocketConnection> playerSockets = new Dictionary<Client, IWebSocketConnection>(); // Player linked sockets only
        Dictionary<IWebSocketConnection, Client> socketPlayers = new Dictionary<IWebSocketConnection, Client>(); // Player linked sockets only

        public WebRTC()
        {
            // Don't need WebRTC for now!
            //Thread thread = new Thread(new ThreadStart(WebRTCServer));
            //thread.Start();
        }
        
        public void WebRTCServer()
        {
            try
            {
                var server = new WebSocketServer("wss://0.0.0.0:4500");
                server.Certificate = new System.Security.Cryptography.X509Certificates.X509Certificate2("cert.pfx");
                server.ListenerSocket.NoDelay = true;
                server.RestartAfterListenError = true;

                server.Start(socket =>
                {
                    socket.OnOpen = () =>
                    {
                        Console.WriteLine("New Client!");
                        allSockets.Add(socket);
                    };

                    socket.OnClose = () =>
                    {
                        Console.WriteLine("Rip Client!");
                        allSockets.Remove(socket);

                        if(socketPlayers.ContainsKey(socket))
                        {
                            Client temp = socketPlayers[socket];

                            if (temp != null)
                            {
                                socketPlayers.Remove(socket);
                                playerSockets.Remove(temp);
                            }
                        }
                    };

                    socket.OnMessage = (message) =>
                    {
                        dynamic data = JObject.Parse(message);


                        if (data.type == "hello")
                        {
                            Console.WriteLine("Hello '" + data.data + "'!");

                            Client test = API.getPlayerFromName((string)data.data);
                            if (test != null)
                            {
                                playerSockets.Add(test, socket);
                                socketPlayers.Add(socket, test);
                            }
                            else
                            {
                                socket.Send("{\"type\": \"error\",\"message\": \"No GTAN player found\"}");
                                socket.Close();
                            }
                        }

                        if(socketPlayers.ContainsKey(socket))
                        {
                            Client thePlayer = socketPlayers[socket];
                            List<Client> Clients = API.shared.getPlayersInRadiusOfPlayer(30.0f, thePlayer);
                            foreach (var c in Clients)
                            {
                                if(c != thePlayer)
                                {
                                    if (playerSockets.ContainsKey(c))
                                    {
                                        playerSockets[c].Send(message);
                                    }
                                }
                            }
                        }
                    };
                });
            }
            catch(System.Security.Cryptography.CryptographicException e)
            {
                ConsoleColor tmp = Console.BackgroundColor;
                Console.BackgroundColor = ConsoleColor.Red;
                Console.WriteLine("[VOICE] Voice server not started");
                Console.Write(e.Message);
                Console.BackgroundColor = tmp;
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
