using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.MobileModels
{
   public class ResumeAssessment
    {

        public int QuestionId { get; set; }

        public string QuestionText { get; set; }

        public int? Weigthage { get; set; }

        public int? CategoryId { get; set; }

        public string QuestionCategory { get; set; }

        public int? PermahCategoryId { get; set; }

        public string PermahCategory { get; set; }

        public int? DisplayOrder { get; set; }

        public int AttemptedAnswerId { get; set; }

        public string AnswerText { get; set; }

    }
}
