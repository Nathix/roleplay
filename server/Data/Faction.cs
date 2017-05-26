using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GTANetworkShared;

namespace SARoleplay.Data
{
    public class Faction
    {
        public int Id { get; set; }

        public string LongName { get; set; }
        public string ShortName { get; set; }

        public int Type { get; set; }
        public int LeaderID { get; set; }

        public Vector3 GaragePosition { get; set; }
        public Boolean GarageLocked { get; set; }
        public Boolean HasGarage { get; set; }

        public Vector3 DutyPosition { get; set; }
        public Boolean HasDuty { get; set; }
    }
}
