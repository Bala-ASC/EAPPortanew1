using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.MobileModels
{
  public  class MiniModule
    {
        public int ContentModuleId { get; set; }
        public string ModuleTitle { get; set; }      
        public string Summary { get; set; }      
        public string ContentText { get; set; }
        public string IconImage { get; set; }
        public int NoOfViews { get; set; }
        public int NoOfLIkes { get; set; }     
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int  DisplayOrder { get; set; }
        public int LikeId { get; set; }
        public Boolean IsLiked { get; set; }
        
    }
}
