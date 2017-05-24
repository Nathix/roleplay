using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SARoleplay.Data
{
    public class FactionMember
    {
        public int Id { get; set; }
        public int FactionId { get; set; }
        public int CharacterId { get; set; }
        public int Rank { get; set; }
    }
}
