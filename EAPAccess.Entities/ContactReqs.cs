using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
   public class ContactReqs
    {
        public int ContactReqId { get; set; }
        public int UserId { get; set; }
        public string Purpose { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public DateTime ContactedOn { get; set; }
        public string Status { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
    }
}
