using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GTANetworkServer;
using GTANetworkShared;

enum LogLevel { Debug, Info, Error, Trace }

namespace SARoleplay.Utils
{
    public static class Logger
    {
        public static void LogFromClient(Client player, params object[] args)
        {
            for (int i = 0; i < args.Count(); i++)
            {
                Console.WriteLine(args[i]);
            }
        }

        public static void Log(Enum LogLevel, string message)
        {
            switch(LogLevel.ToString())
            {
                case "Debug":
                    Console.WriteLine("DEBUG: " + message);
                    break;
                case "Info":
                    Console.WriteLine(string.Format("[{0}] {1}: {2}", DateTime.Now, LogLevel.ToString(), message));
                    break;
                case "Error":
                    Console.WriteLine("ERROR: " + message);
                    break;
                case "Trace":
                    Console.WriteLine("TRACE: " + message);
                    break;
            }
        }
    }
}