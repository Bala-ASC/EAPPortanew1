using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.ACEModels
{
   public class Customerlist
    {
        public int OrganisationId { get; set; }

        public string OrganisationName { get; set; }

        public string DomainName { get; set; }

        public string ACECustomerId { get; set; }
    }

    public class ActivityTypeslist
    { 
    
        public string ActivityTypeId { get; set; }

        public string ActivityName { get; set; }

        public bool IsFaceToFace { get; set; }

        public bool IsVideo { get; set; }

        public bool IsActive { get; set; }
    }

    public class Professionalslist
    {

        public string FullName { get; set; }

        public string ACEClientId { get; set; }

      
    }
    public class ClsGetSpecialitiestb {
        public string CredentialId { get; set; }
        public string CredentialName { get; set; }
    }
    public class ServiceTypelist
    {

        public string ServiceTypeId { get; set; }

        public string ServiceTypeName { get; set; }


    }
}
