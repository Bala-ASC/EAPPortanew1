using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.MobileModels
{
   public class MobileRoles
    {
        public int RoleId { get; set; }
        public string RoleCode { get; set; }
        public string RoleName { get; set; }
        public Boolean IsActive { get; set; }
    }
}
