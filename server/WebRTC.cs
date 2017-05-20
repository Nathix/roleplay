﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

using GTANetworkServer;
using Fleck;
using Newtonsoft.Json.Linq;

namespace SARoleplay
{
    public class WebRTC : Script
    {
        List<IWebSocketConnection> allSockets = new List<IWebSocketConnection>(); // all socket connections
        Dictionary<IWebSocketConnection, Client> socketPlayers = new Dictionary<IWebSocketConnection, Client>(); // Player linked sockets only

        public WebRTC()
        {
            Thread thread = new Thread(new ThreadStart(WebRTCServer));
            thread.Start();
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

                        if (socketPlayers.ContainsKey(socket) == true)
                        {
                            socketPlayers.Remove(socket);
                        }
                    };

                    socket.OnMessage = (message) =>
                    {
                        dynamic data = JObject.Parse(message);


                        if (data.type == "hello")
                        {
                            Console.WriteLine("Hello " + data.data + "!");

                            Client test = API.getPlayerFromName((string)data.data);
                            if (test != null)
                            {
                                socketPlayers.Add(socket, API.getPlayerFromName(data.data));
                            }
                            else
                            {
                                //Console.WriteLine("Connection closed, no gtan player found");
                                //socket.Close();
                                // Comment if testing with chrome!
                            }
                        }
                        else
                        {
                            //Console.WriteLine(data.type);
                        }

                        foreach (var c in allSockets.ToList())
                        {
                            // TODO: Compare player locations
                            if (socket != c)
                            {
                                c.Send(message);
                            }
                        }
                    };
                });
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
