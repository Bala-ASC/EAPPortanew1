using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
   public class QuestionCategory
    {
        public int QuestionCategoryId { get; set; }
        public string Category { get; set; }
        public string CategoryCode { get; set; }
        public Boolean IsActive { get; set; }
    }
}
