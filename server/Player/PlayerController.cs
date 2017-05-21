﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GTANetworkServer;
using GTANetworkShared;

namespace SARoleplay.Player
{
    public class PlayerController : Script
    {
        public Data.Account AccountData;
        public Data.Character CharacterData;
        public NetHandle player;

        public PlayerController()
        {

        }

        public PlayerController(NetHandle player)
        {
            this.player = player;
            EntityManager.Add(this);
        }

        public void LoadAccount(int id)
        {

        }

        public void UnloadAccount()
        {
            EntityManager.Remove(this);
        }
    }
}