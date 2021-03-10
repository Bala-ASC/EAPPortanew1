using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.Models
{
   public class CousollerandClientDetail
    {
        public int CousollerId { get; set; }
        public int ClientId { get; set; }
        public string CounsollerEmailId { get; set; }
        public string CounsollerName { get; set; }
        public string ClientEmailId { get; set; }
        public string ClientName { get; set; }
        public DateTime StartDate { get; set; }
        public string ActivityType { get; set; }
        public string ACEAppointmentId { get; set; }
        public Boolean IsForFamilyMember { get; set; }
        public string FMFirstName { get; set; }
        public string FMEmail { get; set; }
        public int AppointmentId { get; set; }
        public string startDateInString { get; set; }
        public string StartTime { get; set; }
        public string UserId { get; set; }
       public string errormsg { get; set; } 
        public Boolean IsConsentFormFilled { get; set; }
        public string CounsellerMobileNo { get; set; }
        public string Location { get; set; }
        public int Hoursdiff { get; set; }
        public Boolean IsSurveyMailSent { get; set;}
        public string FMFullName { get; set; }
        public Boolean IsCompleted { get; set; }
    }

    public class Clsvoximplant
    {
        public int CousollerId { get; set; }
    }
}
