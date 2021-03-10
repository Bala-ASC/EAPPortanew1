using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
   public class TestResults
    {
        public int CheckTestId { get; set; }
        public int UserId { get; set; }
        public DateTime TakenOn { get; set; }
        public Boolean IsCompleted { get; set; }
        public decimal TotalScore { get; set; }
    }
}
