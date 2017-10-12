using System;
using System.Threading;
using GrandTheftMultiplayer.Server;
using GrandTheftMultiplayer.Shared;
using Newtonsoft.Json.Linq;

namespace SARoleplay.Utils
{
    public static class LogHelper
    {
        public static void WriteLog(string logType, string logMessage)
        {
            JObject data = new JObject();

            data.Add("logType", logType);
            data.Add("logMessage", logMessage);

            Utils.WebHelper.PostData("logging/write/" + logType, data.ToString());
        }

        public static void GetLog(string logType)
        {
            var data = Utils.WebHelper.GetData("/logging/get/" + logType);
            Console.WriteLine(data); //for now
        }
    }
}
