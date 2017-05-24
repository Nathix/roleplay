using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SARoleplay.Data
{
    public class House
    {
        public int Id { get; set; }
        public int CharacterId { get; set; }
        public int Price { get; set; }
        public int Interior { get; set; }

        public float PositionX { get; set; }
        public float PositionY { get; set; }
        public float PositionZ { get; set; }

        public Boolean Locked { get; set; }
        public Boolean ForSale { get; set; }
    }
}
