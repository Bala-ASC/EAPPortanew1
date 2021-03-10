using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.ACEModels
{
    public class Appointment
    {
        public string id { get; set; }

        public DateTime dateTimeStart { get; set; }

        public DateTime dateTimeEnd { get; set; }
        public DateTime localDateTimeStart { get; set; }
        public DateTime localDateTimeEnd { get; set; }

        public string activityTypeId { get; set; }

        public string activityType { get; set; }
        public string professionalId { get; set; }
        public string professionalName { get; set; }
        public string resourceOfficeId { get; set; }
        public string resourceOfficeName { get; set; }

        public bool isPast { get; set; }
        public bool didNotAttend { get; set; }
        public bool cancelledChargeable { get; set; }
        public string zoomUrl { get; set; }
        public int fileNumber { get; set; }
        public DateTime lastUpdate { get; set; }
        public int UserId { get; set; }

        public string ReservationId { get; set; }
        public bool IsForFamilyMember { get; set; }
        public string FMFirstName { get; set; }
        public string FMLastName { get; set; }
        public string FMEmail { get; set; }
        public DateTime FMBirthDate { get; set; }
        public string FMPhone { get; set; }
        public string errormsg { get; set; }

    }

    public class AppointmentResponsece
    {
        public string id { get; set; }
    }

    public class ClsAppointment
    {
        public int UserId { get; set; }

        public string ReservationId { get; set; }
        public bool IsForFamilyMember { get; set; }
        public string FMFirstName { get; set; }
        public string FMLastName { get; set; }
        public string FMEmail { get; set; }
        public DateTime? FMBirthDate { get; set; }
        public string FMPhone { get; set; }
    }
    public class ClsUpcomingAppointment
    {
        public int AppointmentId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string ActivityTypeId { get; set; }

        public string ActivityName { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }

        public string startTime { get; set; }
        public string endTime { get; set; }

        public string CounsellorName { get; set; }

        public bool IsForFamilyMember { get; set; }

        public string ACEAppointmentId { get; set; }

        public int UserId { get; set; }
        public int CounsellerId { get; set; }
        public string Username { get; set; }

        public string ClientEmail { get; set; }
        public string ClientMobileNo { get; set; }

        public string ClientPostcode { get; set; }
        public string CounsellerEmail { get; set; }
        public string CounsellerMobileNo { get; set; }

        public string CounsellerPostcode { get; set; }
        public string ClientOrganisationName { get; set; }
        public string CounsellerOrganisationName { get; set; }
        public Boolean IsPast { get; set; }
        public string ClientVoximUser { get; set; }
        public string ClientVoximPass { get; set; }
        public string CounsellerVoximUser { get; set; }
        public string CounsellerVoximPass { get; set; }
        public string FMFirstName { get; set; }

        public string MobileNo { get; set; }
    }
    public class ClsGetAppointmentDetail
    {
        public int AppointmentId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int UserId { get; set; }
        public int CounsellerId { get; set; }
        public int StartDateDiffMins { get; set; }
        public int EndDateDiffMins { get; set; }
        public int DurationMins { get; set; }
        public string FMFirstName { get; set; }
        public string FMLastName { get; set; }

        public string ACEClientId { get; set; }
        public string ACEProfessinalId { get; set; }
        public string ACEAppointmentId { get; set; }
        public string CounsellorName { get; set; }
        public string Username { get; set; }

        public string ClientEmail { get; set; }
        public string ClientMobileNo { get; set; }

        public string ClientPostcode { get; set; }
        public string CounsellerEmail { get; set; }
        public string CounsellerMobileNo { get; set; }

        public string CounsellerPostcode { get; set; }
        public string ClientOrganisationName { get; set; }
        public string CounsellerOrganisationName { get; set; }

        public int StartDateDiffMinsposite { get; set; }
        public string startDate { get; set; }
        public string startTime { get; set; }

        public string ClientVoximUser { get; set; }
        public string ClientVoximPass { get; set; }
        public string CounsellerVoximUser { get; set; }
        public string CounsellerVoximPass { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsStarted { get; set; }
        public bool IsInstantChat { get; set; }
        public string ClientProfilePhoto { get; set; }

        public string CounsollerProfilePhoto { get; set; }
        public DateTime ClientDateOfBirth { get; set; }

        public DateTime? CounsllorDateOfBirth { get; set; }
        public string DepartmentName { get; set; }
        public string DivisionName { get; set; }
        public string GroupName { get; set; }
        public bool IsForFamilyMember { get; set; }
        public string FMEmail { get; set; }
        public DateTime FMBirthDate { get; set; }
        public string FMPhone { get; set; }
        public string clientDob { get; set; }
        public string FmailyDob { get; set; }
        public int ClientRoleID { get; set; }
        public int counsollerroleId { get; set; }

    }
    public class ClsValidTimeForInstantChat
    {
        public int UtcstartTime { get; set; }
    }
   
}
