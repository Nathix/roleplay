using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SARoleplay.Data
{
    public class Character
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public DateTime RegisteredDate { get; set; }
        public DateTime LastOnlineData { get; set; }
        public Boolean Online { get; set; }
        public int PlaytimeHours { get; set; }
        public int PlaytimeMinutes { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public float PositionX { get; set; }
        public float PositionY { get; set; }
        public float PositionZ { get; set; }
        public float Rotation { get; set; }

        public int Money { get; set; }
        public int Bank { get; set; }

        public int JobID { get; set; }
    }
}
