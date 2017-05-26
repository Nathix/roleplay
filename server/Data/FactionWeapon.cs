using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server.Data
{
    class FactionWeapon
    {

        public int Id { get; set; }
        public int FactionId { get; set; }
        public string Hash { get; set; }

        public int Rank { get; set; }
        public int Ammo { get; set; }
    }
}
