using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
    public class TestResultDetails
    {
        public int TestAnswerId { get; set; }
        public int CheckTestId { get; set; }
        public string QuestionText { get; set; }
        public string AnswerText { get; set; }
        public DateTime TakenOn { get; set; }
        public decimal Score { get; set; }
    }
}
