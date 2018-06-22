using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SARoleplay.Utils
{
    class MoneyHelper
    {
        //Deposit money to bank
        //Withdraw money from bank
        //Pay for something with pocket money -- fails if funds are insufficient.
        //Pay for something with your `credit card` -- this is the backup if pocket money was insufficient, if this is also insufficient stop the transaction all together
        //Lose money you have in your pocket when killed
        public void depositMoney(int amount)
        {
            //Amount will not be based on user input but how rockstar does it in their maze bank website

        }
    }
}
