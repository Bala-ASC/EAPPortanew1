using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.MobileModels
{
   public class PreferedArea
    {
        public int UserId { get; set; }

        public int? ContentAreaId { get; set; }

        public string AreaName { get; set; }

        public string IconImage { get; set; }

        public bool? IsPrefered { get; set; }

    }
}
