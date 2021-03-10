using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
   public class ContentModuleVideos
    {
        public int ContentVideoId { get; set; }
        public int ContentModuleId { get; set; }
        public string VideoTitle { get; set; }
        public string VideoFile { get; set; }
        public Boolean IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }

        public string Base64Data { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
    }
}
