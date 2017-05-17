using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SARoleplay.Data
{
    public class FactionVehicle
    {
        public int Id { get; set; }
        public int FactionId { get; set; }
        public string Hash { get; set; }

        public int ColorPrimaryR { get; set; }
        public int ColorPrimaryG { get; set; }
        public int ColorPrimaryB { get; set; }

        public int ColorSecondaryR { get; set; }
        public int ColorSecondaryG { get; set; }
        public int ColorSecondaryB { get; set; }

        public int Rank { get; set; }
        public Boolean Performance { get; set; }
    }
}
