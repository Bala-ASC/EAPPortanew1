using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
   public class ChangePassword
    {
        public int UserId { get; set; }
        public string Password { get; set; }
        public string OldPassword { get; set; }
    }
}
