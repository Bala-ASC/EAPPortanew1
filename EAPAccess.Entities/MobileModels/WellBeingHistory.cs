using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.MobileModels
{
   public class WellBeingHistory
    {
        public int TestAnswerId { get; set; }

        public int CheckTestId { get; set; }

        public DateTime? TakenOn { get; set; }

        public decimal? Score { get; set; }

        public DateTime? CompletedOn { get; set; }

        public bool IsCompleted { get; set; }

        public decimal? TotalScore { get; set; }
    }
}
