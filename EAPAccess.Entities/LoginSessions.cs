using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
   public class LoginSessions
    {
        public int LoginLogId { get; set; }
        public int UserId { get; set; }
        public DateTime LoggedInOn { get; set; }
        public DateTime LoggedOutOn { get; set; }
    }
}
