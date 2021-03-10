using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
    public class User
    {
        public int UserId { get; set; }
        //public string UserName { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string WorkEmail { get; set; }
        public int? OrganisationId { get; set; }
        public int? RoleId { get; set; }
        public string MobileNo { get; set; }
        public string Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ProfilePhoto { get; set; }
        public DateTime? LastLoggedInOn { get; set; }
        public Boolean IsManagerRoleApproved { get; set; }
        public string LoginProvider { get; set; }
        public string ProviderId { get; set; }
        public string ProviderToken { get; set; }
        public string DeviceId { get; set; }
        public string DeviceType { get; set; }
        public Boolean IsActive { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int? UpdatedBy { get; set; }

        public string RoleName { get; set; }
        public string OrganisationName { get; set; }

        public string Base64Data { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public string ErrorMsg { get; set; }
        public string ACEClientId { get; set; }
        public string PostCode { get; set; }
        public string ClientOrgGroupId { get; set; }
        public string ClientOrgDivisionId { get; set; }
        public string ClientOrgDepartmentId { get; set; }

        public string ACECustomerId { get; set; }
        public Boolean removeImage { get; set; }
        public Boolean IsLive { get; set; }
        public string GUID { get; set; }
        public Boolean FamilyMembersAllowed { get; set; }
        public Boolean FamilyMembersUnder18Allowed { get; set; }
    }
}
