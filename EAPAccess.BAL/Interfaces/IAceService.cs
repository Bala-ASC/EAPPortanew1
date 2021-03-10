using EAPAccess.Entities;
using EAPAccess.Entities.ACEModels;
using EAPAccess.Entities.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;


namespace EAPAccess.BAL.Interfaces
{
    public interface IAceService
    {
        List<Customerlist> GetCustomers( string CustomerDoc);
        void DeleteEmployee(DataTable content);
        void DeleteGroup(DataTable content);
        void DeleteDivision(DataTable content);
        void DeleteDept(DataTable content);

        List<ActivityTypeslist> GetActivityTypes(string ActivitieDoc);

        List<Professionalslist> GetProfessionals(string ProfessionalsDoc);
        List<ServiceTypelist> GetServiceTypes(string ServiceTypesDoc);
        List<ProfessionalsDetails> GetProfessionalsdeatils(List<string> pIds);


        ClsReservationParametres GetReservationParameters(ClsReservations model);

        CousollerandClientDetail InsertAppointment(Appointment model);
        List<ClsGetCredential> GetCredentials();

        List<ClsUpcomingAppointment> GetUpcomingAppointments( int UserId);
        List<ClsUpcomingAppointment> BookingHistory(int UserId);

        List<ClsUpcomingAppointment> CurrentMonthAppointments(int UserId);
        UserSessionAllowance UpdateClientDashboard(int UserId,string GetClientDashboardDoc);

        AppointmentsTimeDiff GetAppointmentsTimediff (string ACEAppointmentId);

        ClsGetAppointmentDetail GetAppointmentDetails(string ACEApptId, int ApptId);

        CousollerandClientDetail ChangeAppointment(string ACEAppointmentId);
        ClsConsentForm ConsentFormSubmit(ClsConsentForm model);

        List<ClsInstantChatCounsellers> GetInstantChatCounsellers();
        ClsInstantChatAppt CreateInstantChatAppt(int Userid,int Counsellerid, int QueueId);

        ClsValidTimeForInstantChat IsValidTimeForInstantChat();
        ClsInstantchatyes SendEmailForInstantchat(int Userid);

        CousollerandClientDetail EndChatSession(string ACEAppointmentId, string ChatTranscript);
        CousollerandClientDetail EndChatSessionEnded(string ACEAppointmentId, string ChatTranscript);
        CousollerandClientDetail EndChatSessionMsg(string ACEAppointmentId);
        ClsEndChatSession ChatStartedOn(string ACEAppointmentId);

        Clsvoximplant CounsollerVoximplant(int CounsolerId);

        Clsvoximplant CounsollerVoximplantUserUpdate(int CounsolerId, string user_name, string user_password);

        ClsFemaleCounsellerFirst IsFemaleCounsellerFirstF2FMeeting(int UserId, string CounsellerIdACE);

        ClsConsentEncForm getconsetformpdf(int ApptmentId);

        List<CousollerandClientDetail> RemainderList();
        int Updateremaindermaillist(int AppointmentId);
        string GetConsentFormFormat(string Code);
        ClsAppointmentsEndTimeDiff GetAppointmentsEndTimediff(string ACEAppointmentId);
        ClsQueue CreateQueue(int UserId);
        ClsPositionQueue PositionQueue(int UserId);

        ClsConnectdQueue ConnectdQueue(int UserId, int CounsellorId, int QueueId);
        List<ClstransrpitforScedule> GetScedulechatList();
        int UpdateScedulechatList(string ACEAppointmentId);
        List<Gettransrpitforinstantlist> GetInstantchatList();
        List<ClsGetSpecialitiestb> GetSpecialities(string ProfessionalsDoc);
        ClsGetAppointmentDetail GetBookedAppointments(int UserId, string CounsellerId, string Location, DateTime FromDateInUTC, DateTime ToDateInUTC);
        dynamic CheckDomain(string email);
        ClsFamlilyMemberExist FamlilyMemberExist(string EmailId,int UserId);
        ClSresponsefmailymember InsertFamilyMembers(FamilyClientRequest model);
        int UpdateEmailSurveySent(string ACEAppointmentId);
        ReservationParametres GetActivityParameters(BookingSlotsnew model);
        int UpdateInstantchatList(string ACEAppointmentId);

    }
}
