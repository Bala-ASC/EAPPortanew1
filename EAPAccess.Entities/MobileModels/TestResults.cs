using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.MobileModels
{
   public class TestResults
    {
        public int CheckTestId { get; set; }

        public int UserId { get; set; }

        public DateTime? TakenOn { get; set; }

        public bool IsCompleted { get; set; }

        public decimal? TotalScore { get; set; }

        public DateTime? CompletedOn { get; set; }

    }
}
