using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SARoleplay.Data
{
    public class Faction
    {
        public int Id { get; set; }

        public string LongName { get; set; }
        public string ShortName { get; set; }

        public int Type { get; set; }
        public int LeaderID { get; set; }

        public float GaragePosX { get; set; }
        public float GaragePosY { get; set; }
        public float GaragePosZ { get; set; }
        public float GarageRotX { get; set; }
        public float GarageRotY { get; set; }
        public float GarageRotZ { get; set; }

        public float DutyPosX { get; set; }
        public float DutyPosY { get; set; }
        public float DutyPosZ { get; set; }
        public float DutyRotX { get; set; }
        public float DutyRotY { get; set; }
        public float DutyRotZ { get; set; }

        public int Bank { get; set; }
    }
}
