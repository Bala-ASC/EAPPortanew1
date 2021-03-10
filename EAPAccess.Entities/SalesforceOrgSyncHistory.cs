using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
  public class SalesforceOrgSyncHistory
    {
        public int SalesforceOrgSyncId { get; set; }
        public DateTime SyncedOn { get; set; }
        public Boolean IsManualTrigger { get; set; }
        public int TriggeredBy { get; set; }
        public string Error { get; set; }
        public Boolean IsSuccess { get; set; }
    }
}
