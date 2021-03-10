using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.MobileModels
{
    public class ContentModule
    {
        public int? ContentModuleId { get; set; }

        public string ModuleTitle { get; set; }

        public int ContentAreaId { get; set; }

        public string ContentAreaName { get; set; }

        public int ContentTopicId { get; set; }

        public string ContentTopicName { get; set; }

        public string Summary { get; set; }

        public string Keywords { get; set; }

        public string ContentText { get; set; }

        public string IconImage { get; set; }

        public int NoOfViews { get; set; }

        public int NoOfLIkes { get; set; }

        public Boolean VisibleToEmp { get; set; }

        public Boolean VisibleToMgr { get; set; }

        public Boolean IsActive { get; set; }

        public DateTime CreatedOn { get; set; }

        public int CreatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }

        public int UpdatedBy { get; set; }

        public string TopicName { get; set; }
        public string AreaName { get; set; }

        public int DisplayOrder { get; set; }
        

    }
}
