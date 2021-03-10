using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.MobileModels
{
  public class QuestionAnswerOption
    {
        public int QuestionAnswerId { get; set; }

        public string AnswerCode { get; set; }

        public string AnswerText { get; set; }

        public int Points { get; set; }

        public decimal Percentage { get; set; }

    }
}
