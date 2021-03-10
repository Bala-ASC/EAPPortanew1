using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
   public class Roles
    {
        public int RoleId { get; set; }
        public string RoleCode { get; set; }
        public string RoleName { get; set; }
        public Boolean IsActive { get; set; }
    }
}
