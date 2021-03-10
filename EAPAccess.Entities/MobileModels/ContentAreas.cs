using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.MobileModels
{
    public class ContentAreas
    {
        public int? ContentAreaId { get; set; }

        public string AreaName { get; set; }

        public string Summary { get; set; }

        public string IconImage { get; set; }

        public int? NoOfTopics { get; set; }

        public int? NoOfModules { get; set; }

        public bool? IsActive { get; set; }

        public DateTime? CreatedOn { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? UpdatedOn { get; set; }

        public int? UpdatedBy { get; set; }
    }
}
