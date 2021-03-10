using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
  public class AdminDashBoard
    {
        public Users UsersDetails { get; set; }
        public List<Account> AccountDetails { get; set; }
        public List<ContentModules> ModuleDetails { get; set; }
       
    }
}
