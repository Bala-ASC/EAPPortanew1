using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.ACEModels
{
  public  class Reservations
    {
        public string serviceTypeId { get; set; }
        public string activityTypeId { get; set; }

        public string dateTimeStart { get; set; }

        public string dateTimeEnd { get; set; }
        public string professionalId { get; set; }
        public string resourceOfficeId { get; set; }
        public int bookingDiaryId { get; set; }
    }

    public class ResponseReservation
    {
        public string reservationId { get; set; }

        public string serviceTypeId { get; set; }
        public string activityTypeId { get; set; }

        public string dateTimeStart { get; set; }

        public string dateTimeEnd { get; set; }
        public string professionalId { get; set; }
        public string resourceOfficeId { get; set; }
        public int? bookingDiaryId { get; set; }
        public string errormsg { get; set; }
    }
    public class ClsReservations
    {

        public int UserId { get; set; }
        //public string ServiceTypeId { get; set; }
        public string ActivityTypeFlag { get; set; }

        public string DateTimeStart { get; set; }

        public string DateTimeEnd { get; set; }
        public string ProfessionalId { get; set; }
        public string ResourceOfficeId { get; set; }
        public int BookingDiaryId { get; set; }
    }
    public class ClsReservationParametres
    {
        public string ActivityTypeId { get; set; }

        public string ServiceTypeId { get; set; }
    }
    public class ReservationParametres
    {
        public string ActivityTypeId { get; set; }

        public string ServiceTypeId { get; set; }
    }
    public class ClSresponsefmailymember
    {
        public string ACEClientId { get; set; }
    }

    public class ClsReservationsResponce
    {
        public string dateTimeStart { get; set; }

        public string dateTimeEnd { get; set; }
        public string professionalId { get; set; }
        public string resourceOfficeId { get; set; }
        public int bookingDiaryId { get; set; }    
        public string activityTypeId { get; set; }
        public string serviceTypeId { get; set; }
    }
    public class ClsResponseConsentForm
    {
        public int AppointmenId { get; set; }
    }
    public class Clstransrpit
    {
        public string appointmentId { get; set; }
        public string chatTranscriptBase64 { get; set; }
    }

    public class ClsInsattransrpit
    {
        public string activityTypeId { get; set; }

        public DateTime dateTimeStart { get; set; }
        public DateTime dateTimeEnd { get; set; }
        public string professionalId { get; set; }
        public string chatTranscriptBase64 { get; set; }
    }
    public class ClstransrpitforScedule
    {
        public string ACEAppointmentId { get; set; }
        public string chatTranscript { get; set; }
        public string ACEClientId { get; set; }
    }
 
    public class Gettransrpitforinstantlist
    {
        public string ChatTranscript { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string ActivityTypeId { get; set; }
        public string ACEProfessinalId { get; set; }
        public string ACEClientId { get; set; }
        public string ACEAppointmentId { get; set; }
    }
}
