using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
  public class Users
    {
        public string  NewUserText { get; set; }
        public int NewUserCount { get; set; }
        public decimal NewUserPercentage { get; set; }
        public string UnInstallUserText { get; set; }
        public int UnInstallUserCount { get; set; }
        public decimal UnInstallUserPercentage { get; set; }
        public string NetNewUserText { get; set; }
        public int NetNewUserCount { get; set; }
        public decimal NetNewUserPercentage { get; set; }
        public string ActiveUserText { get; set; }
        public int ActiveUserCount { get; set; }
        public decimal ActiveUserPercentage { get; set; }
    }
}
