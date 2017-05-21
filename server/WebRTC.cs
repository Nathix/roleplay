using System;
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
        Dictionary<Client, IWebSocketConnection> playerSockets = new Dictionary<Client, IWebSocketConnection>(); // Player linked sockets only
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

                        Client temp;
                        socketPlayers.TryGetValue(socket, out temp);

                        if (temp != null)
                        {
                            socketPlayers.Remove(socket);
                            playerSockets.Remove(temp);
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
                                playerSockets.Add(API.getPlayerFromName(data.data), socket);
                                socketPlayers.Add(socket, API.getPlayerFromName(data.data));
                            }
                            else
                            {
                                socket.Send("{\"type\": \"error\",\"message\": \"No GTAN player found\"}");
                                socket.Close();
                            }
                        }
                        else
                        {
                            //Console.WriteLine(data.type);
                        }

                        /*foreach (var c in allSockets.ToList())
                        {
                            // TODO: Compare player locations
                            if (socket != c && socket.IsAvailable == true)
                            {
                                //dynamic players = API.shared.getPlayersInRadiusOfPlayer(25.0f, )
                                //API.shared.getPlayersInRadiusOfPlayer
                                //socketPlayers
                                c.Send(message);
                            }
                        }*/
                        Client thePlayer;
                        socketPlayers.TryGetValue(socket, out thePlayer);
                        if(thePlayer != null)
                        {
                            List<Client> Clients = API.shared.getPlayersInRadiusOfPlayer(100.0f, thePlayer);
                            foreach(var c in Clients)
                            {
                                IWebSocketConnection s;
                                playerSockets.TryGetValue(c, out s);
                                s.Send(message);
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
