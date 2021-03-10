using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
   public class PermahCategory
    {
        public int PermahCategoryId { get; set; }
        public string Category { get; set; }
        public char CategoryCode { get; set; }
        public Boolean IsActive { get; set; }
    }
}
