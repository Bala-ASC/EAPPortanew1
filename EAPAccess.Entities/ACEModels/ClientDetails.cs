using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.ACEModels
{
   public class ClientDetails
    {

        public string id { get; set; }
        public string email { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string employerId { get; set; }
        public string customerId { get; set; }
        public string phoneNumberCountry { get; set; } 
        public string phoneNumberArea { get; set; }
        public string phoneNumber { get; set; }
        public string postCode { get; set; }
        public string cityId { get; set; }
        public string stateId { get; set; }
        public string addressLine1 { get; set; }
        public string addressLine2 { get; set; }

        public string addressLine3 { get; set; }
        public DateTime? dateOfBirth { get; set; }

        public string employerGroupId { get; set; }
        public string employerDivisionId { get; set; }
        public string employerDepartmentId { get; set; }
        public string serviceTypeId { get; set; }


    }
    public class ClientRequest
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmployerId { get; set; }
        public string CustomerId { get; set; }
        public string PhoneNumberCountry { get; set; }
        public string PhoneNumberArea { get; set; }
        public string PhoneNumber { get; set; }
        public string PostCode { get; set; }
        public string CityId { get; set; }
        public string StateId { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }

        public string AddressLine3 { get; set; }
        public string DateOfBirth { get; set; }

        public string EmployerGroupId { get; set; }
        public string EmployerDivisionId { get; set; }
        public string EmployerDepartmentId { get; set; }
        public string ServiceTypeId { get; set; }


    }
    public class FamilyClientRequest
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CustomerId { get; set; }
        public string PhoneNumberCountry { get; set; }
        public string PhoneNumberArea { get; set; }
        public string PhoneNumber { get; set; }
        public string PostCode { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string ServiceTypeId { get; set; }
        public bool isFamilyMember { get; set; }
        public int UserId { get; set; }
        public string ACEClientId { get; set; }

    }
    public class CLSFamilyClientRequest
    {
        public string email { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string customerId { get; set; }
        public string phoneNumber { get; set; }
        public string postCode { get; set; }
        public DateTime? dateOfBirth { get; set; }
        public string employerGroupId { get; set; }
        public string employerDivisionId { get; set; }
        public string employerDepartmentId { get; set; }
        public string serviceTypeId { get; set; }
        public bool isFamilyMember { get; set; }

    }

    public class ClientResponse
    {
        public string id { get; set; }
        public string detail { get; set; }
    }
    public class details
    {
        public string detail { get; set; }
    }
    public class ClientRequestToCreateId
    {
        public string email { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string customerId { get; set; }    
        public string phoneNumber { get; set; }
        public string postCode { get; set; }
        public DateTime? dateOfBirth { get; set; }
        public string employerGroupId { get; set; }
        public string employerDivisionId { get; set; }
        public string employerDepartmentId { get; set; }
        public string serviceTypeId { get; set; }
      //  public string gender { get; set; }
     
    }
    public class ClientFormSubmit
    {
        public string fileType { get; set; }
        public string formContentBase64 { get; set; }
        public string ClientId { get; set; }
    }
}
