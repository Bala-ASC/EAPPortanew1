using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
  public class ContentViewHistory
    {
        public int ContentModuleViewId { get; set; }
        public int ContentModuleId { get; set; }
        public int UserId { get; set; }
        public DateTime ViewStartOn { get; set; }
        public DateTime ViewEndOn { get; set; }
        public decimal TimeSpentInMins { get; set; }
    }
}
