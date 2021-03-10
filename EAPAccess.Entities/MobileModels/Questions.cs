using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.MobileModels
{
    public class Questions
    {
        public int QuestionId { get; set; }

        public string QuestionText { get; set; }

        public int? Weigthage { get; set; }

        public int? CategoryId { get; set; }

        public string QuestionCategory { get; set; }

        public int? PermahCategoryId { get; set; }

        public string PermahCategory { get; set; }

        public int? DisplayOrder { get; set; }

        public bool? IsActive { get; set; }

        public DateTime? CreatedOn { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? UpdatedOn { get; set; }

        public int? UpdatedBy { get; set; }

    }

}
