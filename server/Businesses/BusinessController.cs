﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GrandTheftMultiplayer.Server;
using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Elements;
using GrandTheftMultiplayer.Shared;

namespace SARoleplay.Businesses
{
    public class BusinessController : Script
    {
        public Data.Business BusinessData;

        public BusinessController()
        {
            EntityManager.Add(this);
        }

        public static void LoadBusinesses()
        {
            // Load all businesses
        }

        public void LoadBusiness(int id)
        {
            // Load specific business
        }

        public static void UnloadBusinesses()
        {
            List<BusinessController> Factions = EntityManager.GetBusinessControllers();
            foreach (BusinessController f in Factions)
            {
                f.UnloadBusiness();
            }
        }

        public void UnloadBusiness()
        {
            EntityManager.Remove(this);
        }
    }
}
