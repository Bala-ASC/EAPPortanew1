using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
  public class CMSPage
    {
        public int CMSPageId { get; set; }
        public string CMSPageCode { get; set; }
        public string CMSPageName { get; set; }
        public string ContentText { get; set; }
        public Boolean IsActive { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
    }
}
