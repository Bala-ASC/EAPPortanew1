using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
    public class FAQs
    {
        public int FaqId { get; set; }
        public string FaqQuestion { get; set; }
        public string FaqAnswer { get; set; }
        public Boolean IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
    }
}
