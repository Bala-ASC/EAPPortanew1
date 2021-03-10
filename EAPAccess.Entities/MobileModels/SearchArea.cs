using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.MobileModels
{
   public class SearchArea
    {
        public int? ContentAreaId { get; set; }

        public int? UserId { get; set; }

        public string SearchText { get; set; }
    }
}
