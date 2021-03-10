using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.ACEModels
{
    public class ClientDashboard
    {
        public ClientDetails clientRegistration { get; set; }
        public List<Cases> cases { get; set; }
        public List<object> appointments { get; set; }
    }
    public class Cases
    {
        public string fileNumber { get; set; }
        public string serviceTypeId { get; set; }
        public string serviceType { get; set; }
        public DateTime openDateTime { get; set; }
        public string status { get; set; }
        public bool isCurrent { get; set; }

        public int maxSessions { get; set; }
        public int usedSessions { get; set; }
    }

    public class UserSessionAllowance
    {
        public int? AllowedAppts { get; set; }
        public int? UsedAppts { get; set; }
        public DateTime? LastUpdatedQuota { get; set; }
    }
}
