using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SARoleplay.Data
{
    public class Vehicle
    {
        public int Id { get; set; }
        public int CharacterId { get; set; }
        public int Price { get; set; }

        public float PositionX { get; set; }
        public float PositionY { get; set; }
        public float PositionZ { get; set; }

        public float RotationX { get; set; }
        public float RotationY { get; set; }
        public float RotationZ { get; set; }

        public Boolean Locked { get; set; }
        public Boolean ForSale { get; set; }
    }
}
