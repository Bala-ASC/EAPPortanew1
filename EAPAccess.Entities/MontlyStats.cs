using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
   public class MontlyStats
    {
        public int OrgStatsDataId { get; set; }
        public int OrganisationId { get; set; }
        public int MonthNo { get; set; }
        public int YearNo { get; set; }
        public int AvgSessionTimePerEmpMins { get; set; }
        public int TotalWellBeingCheckSubmitted { get; set; }
        public int TotalOnlineBookings { get; set; }
        public int TotalOnlineChats { get; set; }
        public int AvgOnlineChatPerEmpMins { get; set; }
        public int TotalAppSessions { get; set; }
        public int AvgSessionPerEmp { get; set; }
        public int TotalResourceAccessed { get; set; }
        public int TotalUniqueResourceAccess { get; set; }
        public DateTime CreatedOn { get; set; }
        public Boolean IsSyncedToSalesforce { get; set; }
        public DateTime SyncedOn { get; set; }
    }
}
