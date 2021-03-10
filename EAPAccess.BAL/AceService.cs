using EAPAccess.DAL.Interfaces;
using EAPAccess.Entities;
using EAPAccess.Entities.ACEModels;
using EAPAccess.BAL.Interfaces;
using System.Collections.Generic;
using System;
using EAPAccess.Entities.Models;
using System.Data;

namespace EAPAccess.BAL
{
    public class AceService : IAceService
    {
        private readonly IAceRepository _aceRepository;
        public AceService(IAceRepository aceRepository)
        {
            _aceRepository = aceRepository;
        }
        public List<Customerlist> GetCustomers(string CustomerDoc)
        {
            return _aceRepository.GetCustomers(CustomerDoc);
        }
        public void DeleteEmployee(DataTable content)
        {
            _aceRepository.DeleteEmployee(content);
        }
        public void DeleteGroup(DataTable content)
        {
            _aceRepository.DeleteGroup(content);
        }
        public void DeleteDivision(DataTable content)
        {
            _aceRepository.DeleteDivision(content);
        }
        public void DeleteDept(DataTable content)
        {
            _aceRepository.DeleteDept(content);
        }

        public List<ActivityTypeslist> GetActivityTypes(string ActivitieDoc)
        {
            return _aceRepository.GetActivityTypes(ActivitieDoc);
        }
        public List<Professionalslist> GetProfessionals(string ProfessionalsDoc)
        {
            return _aceRepository.GetProfessionals(ProfessionalsDoc);
        }
        public List<ServiceTypelist> GetServiceTypes(string ServiceTypesDoc)
        {
            return _aceRepository.GetServiceTypes(ServiceTypesDoc);
        }
        public List<ProfessionalsDetails> GetProfessionalsdeatils(List<string> pIds)
        {
            return _aceRepository.GetProfessionalsdeatils(pIds);
        }
        public ClsReservationParametres GetReservationParameters(ClsReservations model)
        {
            return _aceRepository.GetReservationParameters(model);
        }
        public CousollerandClientDetail InsertAppointment(Appointment model)
        {
            return _aceRepository.InsertAppointment(model);
        }
        public List<ClsGetCredential> GetCredentials()
        {
            return _aceRepository.GetCredentials();
        }
        public List<ClsUpcomingAppointment> GetUpcomingAppointments(int UserId)
        {
            return _aceRepository.GetUpcomingAppointments(UserId);
        }
        public List<ClsUpcomingAppointment> BookingHistory(int UserId)
        {
            return _aceRepository.BookingHistory(UserId);
        }
        public List<ClsUpcomingAppointment> CurrentMonthAppointments(int UserId)
        {
            return _aceRepository.CurrentMonthAppointments(UserId);
        }
        public UserSessionAllowance UpdateClientDashboard(int UserId, string GetClientDashboardDoc)
        {
            return _aceRepository.UpdateClientDashboard(UserId, GetClientDashboardDoc);
        }
        public AppointmentsTimeDiff GetAppointmentsTimediff(string ACEAppointmentId)
        {
            return _aceRepository.GetAppointmentsTimediff(ACEAppointmentId);
        }
        public ClsGetAppointmentDetail GetAppointmentDetails(string ACEApptId, int ApptId)
        {
            return _aceRepository.GetAppointmentDetails(ACEApptId, ApptId);
        }
        public CousollerandClientDetail ChangeAppointment(string ACEAppointmentId)
        {
            return _aceRepository.ChangeAppointment(ACEAppointmentId);
        }
        public ClsConsentForm ConsentFormSubmit(ClsConsentForm model)
        {
            return _aceRepository.ConsentFormSubmit(model);
        }
        public List<ClsInstantChatCounsellers> GetInstantChatCounsellers()
        {
            return _aceRepository.GetInstantChatCounsellers();
        }
        public ClsInstantChatAppt CreateInstantChatAppt(int Userid, int Counsellerid, int QueueId)
        {
            return _aceRepository.CreateInstantChatAppt(Userid, Counsellerid, QueueId);
        }
        public ClsValidTimeForInstantChat IsValidTimeForInstantChat()
        {
            return _aceRepository.IsValidTimeForInstantChat();
        }
        public ClsInstantchatyes SendEmailForInstantchat(int Userid)
        {
            return _aceRepository.SendEmailForInstantchat(Userid);
        }
        public CousollerandClientDetail EndChatSession(string ACEAppointmentId, string ChatTranscript)
        {
            return _aceRepository.EndChatSession(ACEAppointmentId, ChatTranscript);
        }
        public CousollerandClientDetail EndChatSessionEnded(string ACEAppointmentId, string ChatTranscript)
        {
            return _aceRepository.EndChatSessionEnded(ACEAppointmentId, ChatTranscript);
        }
        public CousollerandClientDetail EndChatSessionMsg(string ACEAppointmentId)
        {
            return _aceRepository.EndChatSessionMsg(ACEAppointmentId);
        }
        public ClsEndChatSession ChatStartedOn(string ACEAppointmentId)
        {
            return _aceRepository.ChatStartedOn(ACEAppointmentId);
        }
        public Clsvoximplant CounsollerVoximplant(int CounsolerId)
        {
            return _aceRepository.CounsollerVoximplant(CounsolerId);
        }
        public Clsvoximplant CounsollerVoximplantUserUpdate(int CounsolerId, string user_name, string user_password)
        {
            return _aceRepository.CounsollerVoximplantUserUpdate(CounsolerId, user_name, user_password);
        }
        public ClsFemaleCounsellerFirst IsFemaleCounsellerFirstF2FMeeting(int UserId, string CounsellerIdACE)
        {
            return _aceRepository.IsFemaleCounsellerFirstF2FMeeting(UserId, CounsellerIdACE);
        }
        public ClsConsentEncForm getconsetformpdf(int ApptmentId)
        {
            return _aceRepository.getconsetformpdf(ApptmentId);
        }
        public List<CousollerandClientDetail> RemainderList()
        {
            return _aceRepository.RemainderList();
        }
        public int Updateremaindermaillist(int AppointmentId)
        {
            return _aceRepository.Updateremaindermaillist(AppointmentId);
        }
        public string GetConsentFormFormat(string Code)
        {
            return _aceRepository.GetConsentFormFormat(Code);
        }
        public ClsAppointmentsEndTimeDiff GetAppointmentsEndTimediff(string ACEAppointmentId)
        {
            return _aceRepository.GetAppointmentsEndTimediff(ACEAppointmentId);
        }
        public ClsQueue CreateQueue(int UserId)
        {
            return _aceRepository.CreateQueue(UserId);
        }
        public ClsPositionQueue PositionQueue(int QueueId)
        {
            return _aceRepository.PositionQueue(QueueId);
        }
        public ClsConnectdQueue ConnectdQueue(int UserId, int CounsellorId, int QueueId)
        {
            return _aceRepository.ConnectdQueue(UserId, CounsellorId, QueueId);
        }
        public List<ClstransrpitforScedule> GetScedulechatList()
        {
            return _aceRepository.GetScedulechatList();
        }
        public int UpdateScedulechatList(string ACEAppointmentId)
        {
            return _aceRepository.UpdateScedulechatList(ACEAppointmentId);
        }
        public List<Gettransrpitforinstantlist> GetInstantchatList()
        {
            return _aceRepository.GetInstantchatList();
        }
        public List<ClsGetSpecialitiestb> GetSpecialities(string ProfessionalsDoc)
        {
            return _aceRepository.GetSpecialities(ProfessionalsDoc);
        }
        public ClsGetAppointmentDetail GetBookedAppointments(int UserId, string CounsellerId, string Location, DateTime FromDateInUTC, DateTime ToDateInUTC)
        {
            return _aceRepository.GetBookedAppointments(UserId, CounsellerId, Location, FromDateInUTC, ToDateInUTC);
        }
        public dynamic CheckDomain(string email)
        {
            return _aceRepository.CheckDomain(email);
        }
        public ClsFamlilyMemberExist FamlilyMemberExist(string EmailId,int UserId)
        {
            return _aceRepository.FamlilyMemberExist(EmailId, UserId);
        }
        public ClSresponsefmailymember InsertFamilyMembers(FamilyClientRequest model)
        {
            return _aceRepository.InsertFamilyMembers(model);
        }
        public int UpdateEmailSurveySent(string ACEAppointmentId)
        {
            return _aceRepository.UpdateEmailSurveySent(ACEAppointmentId);
        }
        public ReservationParametres GetActivityParameters(BookingSlotsnew model)
        {
            return _aceRepository.GetActivityParameters(model);
        }
        public int UpdateInstantchatList(string ACEAppointmentId)
        {
            return _aceRepository.UpdateInstantchatList(ACEAppointmentId);
        }
    }
}
