using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SARoleplay.Data
{
    public class Account
    {
        public int Id { get; set; }
        public int ForumId { get; set; }
        public string SocialClubName { get; set; }
        public string IP { get; set; }
        public DateTime RegisteredDate { get; set; }
        public DateTime LastOnlineDate { get; set; }
        public Boolean Online { get; set; }
        public int Admin { get; set; }
        public string AdminName { get; set; }
    }
}
