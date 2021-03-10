using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
    public class ContentTopics
    {
        public int ContentTopicId { get; set; }
        public string TopicName { get; set; }
        public string Summary { get; set; }
        public int ContentAreaId { get; set; }
        public string ContentAreaName { get; set; }
        public string IconImage { get; set; }
        public int NoOfModules { get; set; }
        public Boolean IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }

        public string Base64Data { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public string ErrorMsg { get; set; }
    }
}
