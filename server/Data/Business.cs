using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SARoleplay.Data
{
    public class Business
    {
        public int Id { get; set; }
        public int CharacterId { get; set; }
        public int Price { get; set; }
        public int Interior { get; set; }
        public Boolean InteriorEnabled { get; set; }
        public int Type { get; set; }

        public float PositionX { get; set; }
        public float PositionY { get; set; }
        public float PositionZ { get; set; }

        public float ExtraPositionX { get; set; }
        public float ExtraPositionY { get; set; }
        public float ExtraPositionZ { get; set; }

        public int Money { get; set; }
        public int Stock { get; set; }

        public Boolean Locked { get; set; }
        public Boolean ForSale { get; set; }
    }
}
