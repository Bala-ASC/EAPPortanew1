using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.MobileModels
{
   public class TestResultDetail
    {

        public int TestAnswerId { get; set; }

        public int UserId { get; set; }

        public int CheckTestId { get; set; }

        public int QuestionId { get; set; }

        public int QuestionAnswerId { get; set; }

        public bool IsLastQuestion { get; set; }

        public DateTime? TakenOn { get; set; }

        public decimal? Score { get; set; }

    }
}
