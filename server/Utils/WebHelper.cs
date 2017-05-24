﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SARoleplay.Utils
{
    public static class WebHelper
    {
        private static readonly string URL = "http://api.sa-roleplay.com/";
        private static readonly string AuthKey = "cmlwRWNsaXBzZVJQ";

        public static string GetData(string path)
        {
            WebClient wc = new WebClient();
            wc.Headers[HttpRequestHeader.Authorization] = AuthKey;
            string result = wc.DownloadString(URL + path);
            return result;
        }

        public static string PostData(string path, Dictionary<string, string> data)
        {
            var reqparm = new System.Collections.Specialized.NameValueCollection();
            foreach (KeyValuePair<string, string> r in data)
            {
                reqparm.Add(r.Key, r.Value);
            }
            
            WebClient wc = new WebClient();
            wc.Headers[HttpRequestHeader.ContentType] = "application/x-www-form-urlencoded";
            wc.Headers[HttpRequestHeader.Authorization] = AuthKey;
            byte[] result = wc.UploadValues(URL + path, "POST", reqparm);
            return Encoding.UTF8.GetString(result);
        }
    }
}
