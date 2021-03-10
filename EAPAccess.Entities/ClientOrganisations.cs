using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
    public class ClientOrganisations
    {
        public int OrganisationId { get; set; }
        public string OrganisationName { get; set; }
        public string ContactEmailId { get; set; }
        public string ContactName { get; set; }
        public string DomainName { get; set; }
        public string LogoImage { get; set; }
        public string SalesforceId { get; set; }
        public DateTime? LastSyncOn { get; set; } 
        public DateTime? SalesforceLastUpdatedOn { get; set; }
        public int NoOfUsers { get; set; }
        public Boolean IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
    }
}
