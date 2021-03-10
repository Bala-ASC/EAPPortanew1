using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.ACEModels
{
    public class BookingSlots
    {
        public DateTime earliestDateTime { get; set; }
        public DateTime latestDateTime { get; set; }
        public string activityTypeIds { get; set; }

        public int? minAge { get; set; }
        public int? maxAge { get; set; }

        public string gender { get; set; }

        public string credential { get; set; }
        public string[] specialityIDs { get; set; }
    }

    public class ProfessionalsDetails
    {
        public string professionalId { get; set; }
        public string professionalPhoto { get; set; } 
        public string professionalName { get; set; }
        public string Gender { get; set; }
        public string StateName { get; set; }

        public string Specialities { get; set; }
        public string Location { get; set; }
    }

    public class Booking
    {
        public List<ClsBookingSlots> BookingSlots { get; set; }
        public List<ProfessionalsDetails> Professionals { get; set; } 
    }

   public class ClsBookingSlots
    {
        public string timeZone { get; set; }

        public string professionalName { get; set; }
        public string resourceOfficeName { get; set; }

        public DateTime dateTimeStart { get; set; }
        public DateTime dateTimeEnd { get; set; }
        public string professionalId { get; set; }
        public string resourceOfficeId { get; set; }
        public int bookingDiaryId { get; set; }

        public string startDate { get; set; }
        public string endDate { get; set; }

        public string startTime { get; set; }
        public string endTime  { get; set; }

        public DateTime localDateTimeStart { get; set; }
        public DateTime localDateTimeEnd { get; set; }
        public string Timetest { get; set; }

    }
   public class ClsGetCredential
    {
        public string CredentialId { get; set; }

        public string CredentialName { get; set; }


    }
    public class AppointmentsTimeDiff
    {
        public int StartDateDiffMins { get; set; }

        public int EndDateDiffMins { get; set; }

        public int DurationMins { get; set; }
    }
    public class ClsAppointmentsEndTimeDiff
    {
        public int ChatTimeDiffMinsposite { get; set; }

    }
    public class ClsQueue
    {
        public int QueueId { get; set; }

    }
    public class ClsPositionQueue
    {
        public int PositionQueue { get; set; }
        public int WaitTimeMins { get; set; }
        public int MinWaitTime { get; set; }
        public int AvgWaitTime { get; set; }
    }
    public class ClsFamlilyMemberExist
    {
        public string id { get; set; }
        public string ClientOrgGroupId { get; set; }
        public string ClientOrgDivisionId { get; set; }
        public string ClientOrgDepartmentId { get; set; }

        public string ACECustomerId { get; set; }
    }
    public class ClsConnectdQueue
    {
        public int Qid { get; set; }

    }
    public class ClsChangeAppointment
    {
        public string ACEAppointmentId { get; set; }
    }

  public class ClsConsentForm
    {
        public int AppointmenId { get; set; }
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Signature { get; set; }
        public string UserEnteredDate { get; set; }
        public string EmergencyContactPerson { get; set; }
        public string ConsentPdfFile { get; set; }
        public byte[] pdffile { get; set; }
        public string ACEClientId { get; set; }

    }
   public class ClsInstantChatCounsellers
    {
        public string ACEClientId { get; set; }
        public int CounsellerId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public int IsAvailable { get; set; }
    }
    public class ClsInstantChatAppt
    {
        public string ACEAppointmentId { get; set; }
    }
    public class ClsConsentEncForm
    {
        public string AppointmenId { get; set; }
        public string UserId { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Signature { get; set; }
        public string UserEnteredDate { get; set; }
        public string EmergencyContactPerson { get; set; }
        public string ConsentPdfFile { get; set; }
        public byte[] pdffile { get; set; }

    }
    public class ClsInstantchatyes
    {
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string OrganisationName { get; set; }
        public string State { get; set; }
        public string City { get; set; }
    }
    public class ClsEndChatSession
    {
        public string ACEAppointmentId { get; set; }
    }
    public class ClsFemaleCounsellerFirst
    {
        public int Nofoslots { get; set; }
    }
    public class LBS_SYS_TableData
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Message { get; set; }
        public DateTime date { get; set; }
       
 
    }
    public class BookingSlotsnew
    {
        public DateTime earliestDateTime { get; set; }
        public DateTime latestDateTime { get; set; }
        public IList<string> activityTypeIds { get; set; }

        public int? minAge { get; set; }
        public int? maxAge { get; set; }

        public string gender { get; set; }

        public string credential { get; set; }
        public string[] specialityIDs { get; set; }
    }
}
