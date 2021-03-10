using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
    public class ChatBookings
    {
        public int BookingId { get; set; }
        public int UserId { get; set; }
        public DateTime ScheduledOn { get; set; }
        public string BookingText { get; set; }
        public string BookedFor { get; set; }
        public Boolean IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
    }
}
