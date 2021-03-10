using System;

namespace EAPAccess.Entities.Models
{
    public class Counsellor
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string GroupId { get; set; }
        public string DivisionId { get; set; }
        public int OrganisationId { get; set; }
        public string DeptId { get; set; }
        public string MobileNo { get; set; }
        public string Postcode { get; set; }
        public string ACECustomerId { get; set; }
        public string ACEClientId { get; set; }
        public string DomainName { get; set; }
    }
}
