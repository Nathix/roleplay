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
        public string RegisteredDate { get; set; }
        public string LastOnlineDate { get; set; }
        public Boolean Online { get; set; }
        public Boolean Admin { get; set; }
        public Boolean Support { get; set; }
        public string AdminName { get; set; }
    }
}
