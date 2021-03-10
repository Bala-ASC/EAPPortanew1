using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
    public class ContentVideoViewHistory
    {
        public int VideoViewId { get; set; }
        public int ConentVideoId { get; set; }
        public int UserId { get; set; }
        public DateTime ViewStartOn { get; set; }
        public DateTime ViewEndOn { get; set; }
        public decimal TimeSpentInMins { get; set; }
    }
}
