using Dapper;
using EAPAccess.DAL.Interfaces;
using EAPAccess.Entities;
using EAPAccess.Entities.ACEModels;
using EAPAccess.Entities.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;  


namespace EAPAccess.DAL
{
    public class AceRepository : BaseRepository, IAceRepository
    {
        public List<Customerlist> GetCustomers(string CustomerDoc)
        {
            List<Customerlist> CustomerList = new List<Customerlist>();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {


                if (con.State == ConnectionState.Closed)
                    con.Open();
                // InsertConnectionstring(ConnectionString);
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CustomerDoc", CustomerDoc);
                CustomerList = con.Query<Customerlist>("ACECreateCustomer", parameters, commandType: CommandType.StoredProcedure, commandTimeout: 300).AsList();
            }
            return CustomerList;
        }
        public void DeleteEmployee(DataTable content)
        {

            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                con.Execute("DeleteOrganization", new { orgType = content.AsTableValuedParameter("Tb_OrganizationId") },
                commandType: CommandType.StoredProcedure);


            }

        }
        public void DeleteGroup(DataTable content)
        {

            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                con.Execute("DeleteGroup", new { grpType = content.AsTableValuedParameter("Tb_Group") },
                commandType: CommandType.StoredProcedure);


            }

        }
        public void DeleteDivision(DataTable content)
        {

            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                con.Execute("DeleteDivision", new { divType = content.AsTableValuedParameter("Tb_Division") },
                commandType: CommandType.StoredProcedure);


            }

        }
        public void DeleteDept(DataTable content)
        {

            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                con.Execute("DeleteDepartment", new { deptType = content.AsTableValuedParameter("Tb_Department") },
                commandType: CommandType.StoredProcedure);


            }

        }
        public void InsertConnectionstring(string ConnectionString)
        {
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {


                if (con.State == ConnectionState.Closed)
                    con.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ConnectionString", ConnectionString);
                con.Query("test_add", parameters, commandType: CommandType.StoredProcedure);
            }
        }

        public List<ActivityTypeslist> GetActivityTypes(string ActivitieDoc)
        {
            List<ActivityTypeslist> ActivityTypeList = new List<ActivityTypeslist>();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ActivitieDoc", ActivitieDoc);
                ActivityTypeList = con.Query<ActivityTypeslist>("ACECreateActivities", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            return ActivityTypeList;
        }
        public List<Professionalslist> GetProfessionals(string ProfessionalsDoc)
        {
            List<Professionalslist> ProfessionalsList = new List<Professionalslist>();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ProfessionalDoc", ProfessionalsDoc);
                ProfessionalsList = con.Query<Professionalslist>("ACECreateCounsellor", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            return ProfessionalsList;
        }
        public List<ServiceTypelist> GetServiceTypes(string ServiceTypesDoc)
        {
            List<ServiceTypelist> ServiceTypesList = new List<ServiceTypelist>();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ServiceTypesDoc", ServiceTypesDoc);
                ServiceTypesList = con.Query<ServiceTypelist>("ACECreateServiceTypes", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            return ServiceTypesList;
        }
        public List<ProfessionalsDetails> GetProfessionalsdeatils(List<string> pIds)
        {
            List<ProfessionalsDetails> ServiceTypesList = new List<ProfessionalsDetails>();
            var ids = string.Join(',', pIds);
            ids = ids.Replace(",", "','");
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                //var parameters = new DynamicParameters();
                //parameters.Add("@pIds", pIds);

                ServiceTypesList = con.Query<ProfessionalsDetails>("select distinct Users. ACEClientId as professionalId,Users.ProfilePhoto as professionalPhoto,Users.[FullName] as professionalName,ACECounsellorResourceOffices.StateName,Users.Gender ,Specialities=(select STRING_AGG (ISNULL([CredentialText],'N/A'), ', ') FROM ACECounsellorCredentials where  ACECounsellorCredentials.ACECounsellorId =  Users.ACEClientId) from Users left join ACECounsellorResourceOffices ON ACECounsellorResourceOffices.CounsellorId = Users.ACEClientId   where  Users.ACEClientId in('" + ids + "')", commandType: CommandType.Text).AsList();
            }
            return ServiceTypesList;
        }
        public ClsReservationParametres GetReservationParameters(ClsReservations model)
        {
            ClsReservationParametres ServiceTypesList = new ClsReservationParametres();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@ActivityTypeFlag", model.ActivityTypeFlag);
                ServiceTypesList = con.Query<ClsReservationParametres>("ACEGetReservationParameters", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return ServiceTypesList;
        }
        public CousollerandClientDetail InsertAppointment(Appointment model)
        {
            CousollerandClientDetail ServiceTypesList = new CousollerandClientDetail();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ACEAppointmentId", model.id);
                parameters.Add("@StartDate", model.dateTimeStart);
                parameters.Add("@EndDate", model.dateTimeEnd);
                parameters.Add("@ActivityTypeId", model.activityTypeId);
                parameters.Add("@ACEProfessinalId", model.professionalId);
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@IsForFamilyMember", model.IsForFamilyMember);
                parameters.Add("@FMFirstName", model.FMFirstName);
                parameters.Add("@FMLastName", model.FMLastName);
                parameters.Add("@FMEmail", model.FMEmail);
                if (model.FMBirthDate == System.DateTime.MinValue)
                    parameters.Add("@FMBirthDate", null);
                else
                    parameters.Add("@FMBirthDate", model.FMBirthDate);

                parameters.Add("@FMPhone", model.FMPhone);
                parameters.Add("@ReservationId", model.ReservationId);
                parameters.Add("@Location", model.resourceOfficeName);
                parameters.Add("@LocalDateTimeStart", model.localDateTimeStart);
                parameters.Add("@LocalDateTimeEnd", model.localDateTimeEnd);
                ServiceTypesList = con.Query<CousollerandClientDetail>("ACECreateAppointment", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return ServiceTypesList;
        }
        public List<ClsGetCredential> GetCredentials()
        {
            List<ClsGetCredential> CredentialsList = new List<ClsGetCredential>();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                CredentialsList = con.Query<ClsGetCredential>("ACEGetCredentials", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            return CredentialsList;
        }
        public List<ClsUpcomingAppointment> GetUpcomingAppointments(int UserId)
        {
            List<ClsUpcomingAppointment> UpcomingAppointments = new List<ClsUpcomingAppointment>();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", UserId);
                UpcomingAppointments = con.Query<ClsUpcomingAppointment>("ACEGetUpcomingAppointments", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            return UpcomingAppointments;
        }
        public List<ClsUpcomingAppointment> BookingHistory(int UserId)
        {
            List<ClsUpcomingAppointment> BookingHistory = new List<ClsUpcomingAppointment>();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", UserId);
                BookingHistory = con.Query<ClsUpcomingAppointment>("ACEBookingHistory", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            return BookingHistory;
        }
        public List<ClsUpcomingAppointment> CurrentMonthAppointments(int UserId)
        {
            List<ClsUpcomingAppointment> MonthAppoinments = new List<ClsUpcomingAppointment>();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", UserId);
                MonthAppoinments = con.Query<ClsUpcomingAppointment>("ACECurrentMonthAppointments", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            return MonthAppoinments;
        }
        public UserSessionAllowance UpdateClientDashboard(int UserId, string GetClientDashboardDoc)
        {
            UserSessionAllowance UserSessionAllowance = new UserSessionAllowance();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", UserId);
                parameters.Add("@GetClientDashboardDoc", GetClientDashboardDoc);
                UserSessionAllowance = con.Query<UserSessionAllowance>("ACEUpdateClientDashboard", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return UserSessionAllowance;
        }

        public AppointmentsTimeDiff GetAppointmentsTimediff(string ACEAppointmentId)
        {
            AppointmentsTimeDiff AppointmentsTimeDiff = new AppointmentsTimeDiff();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ACEAppointmentId", ACEAppointmentId);
                AppointmentsTimeDiff = con.Query<AppointmentsTimeDiff>("EAPGetAppointmentsTimediff", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return AppointmentsTimeDiff;
        }
        public ClsGetAppointmentDetail GetAppointmentDetails(string ACEApptId, int ApptId)
        {
            ClsGetAppointmentDetail GetAppointmentDetails = new ClsGetAppointmentDetail();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ACEApptId", ACEApptId);
                parameters.Add("@ACEApptId", ACEApptId);
                GetAppointmentDetails = con.Query<ClsGetAppointmentDetail>("GetAppointmentDetails", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return GetAppointmentDetails;
        }
        public CousollerandClientDetail ChangeAppointment(string ACEAppointmentId)
        {
            CousollerandClientDetail ChangeAppointment = new CousollerandClientDetail();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ACEAppointmentId", ACEAppointmentId);
                ChangeAppointment = con.Query<CousollerandClientDetail>("EAPChangeAppointment", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return ChangeAppointment;
        }
        public ClsConsentForm ConsentFormSubmit(ClsConsentForm model)
        {
            ClsConsentForm ConsentFormSubmit = new ClsConsentForm();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@AppointmenId", model.AppointmenId);
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@FullName", model.FullName);
                parameters.Add("@Address", model.Address);
                parameters.Add("@Phone", model.Phone);
                parameters.Add("@Signature", model.Signature);
                parameters.Add("@UserEnteredDate", model.UserEnteredDate);
                parameters.Add("@EmergencyContactPerson", model.EmergencyContactPerson);
                parameters.Add("@ConsentPdfFile", model.ConsentPdfFile);
               // parameters.Add("@pdffile", model.pdffile);

                ConsentFormSubmit = con.Query<ClsConsentForm>("EAPCreateAppointmentConsents", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return ConsentFormSubmit;
        }
        public List<ClsInstantChatCounsellers> GetInstantChatCounsellers()
        {
            List<ClsInstantChatCounsellers> InstantChatCounsellers = new List<ClsInstantChatCounsellers>();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                InstantChatCounsellers = con.Query<ClsInstantChatCounsellers>("GetInstantChatCounsellers", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            return InstantChatCounsellers;
        }
        public ClsInstantChatAppt CreateInstantChatAppt(int Userid, int Counsellerid, int QueueId)
        {
            ClsInstantChatAppt InstantChatAppt = new ClsInstantChatAppt();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Userid", Userid);
                parameters.Add("@Counsellerid", Counsellerid);
                parameters.Add("@QueueId", QueueId);
                InstantChatAppt = con.Query<ClsInstantChatAppt>("CreateInstantChatAppt", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return InstantChatAppt;
        }
        public ClsValidTimeForInstantChat IsValidTimeForInstantChat()
        {
            ClsValidTimeForInstantChat GetAppointmentDetails = new ClsValidTimeForInstantChat();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                GetAppointmentDetails = con.Query<ClsValidTimeForInstantChat>("IsValidTimeForInstantChat", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return GetAppointmentDetails;
        }
        public ClsInstantchatyes SendEmailForInstantchat(int Userid)
        {
            ClsInstantchatyes SendEmailForInstantchat = new ClsInstantchatyes();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Userid", Userid);
                SendEmailForInstantchat = con.Query<ClsInstantchatyes>("GetUserDeatilforInsatchat", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return SendEmailForInstantchat;
        }
        public CousollerandClientDetail EndChatSession(string ACEAppointmentId, string ChatTranscript)
        {
            CousollerandClientDetail EndChatSession = new CousollerandClientDetail();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ACEAppointmentId", ACEAppointmentId);
                parameters.Add("@ChatTranscript", ChatTranscript);
                EndChatSession = con.Query<CousollerandClientDetail>("EAPEndChatSession", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return EndChatSession;
        }
        public CousollerandClientDetail EndChatSessionEnded(string ACEAppointmentId, string ChatTranscript)
        {
            CousollerandClientDetail EndChatSession = new CousollerandClientDetail();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ACEAppointmentId", ACEAppointmentId);
                parameters.Add("@ChatTranscript", ChatTranscript);
                EndChatSession = con.Query<CousollerandClientDetail>("EAPEndChatSessionEnded", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return EndChatSession;
        }
        public CousollerandClientDetail EndChatSessionMsg(string ACEAppointmentId)
        {
            CousollerandClientDetail EndChatSession = new CousollerandClientDetail();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ACEAppointmentId", ACEAppointmentId);
                EndChatSession = con.Query<CousollerandClientDetail>("EAPEndChatSessionMsg", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return EndChatSession;
        }
        public ClsEndChatSession ChatStartedOn(string ACEAppointmentId)
        {
            ClsEndChatSession EndChatSession = new ClsEndChatSession();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ACEAppointmentId", ACEAppointmentId);
                EndChatSession = con.Query<ClsEndChatSession>("EAPChatStartedOn", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return EndChatSession;
        }
        public Clsvoximplant CounsollerVoximplant(int CounsolerId)
        {
            Clsvoximplant VoximplantUser = new Clsvoximplant();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CounsolerId", CounsolerId);
                VoximplantUser = con.Query<Clsvoximplant>("EAPGetVoximplantCounsellers", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return VoximplantUser;
        }
        public Clsvoximplant CounsollerVoximplantUserUpdate(int CounsolerId, string user_name, string user_password)
        {
            Clsvoximplant VoximplantUser = new Clsvoximplant();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CounsolerId", CounsolerId);
                parameters.Add("@VoximUserName", user_name);
                parameters.Add("@VoximPassword", user_password);
                VoximplantUser = con.Query<Clsvoximplant>("EAPUpdateVoximplantCounsellers", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return VoximplantUser;
        }
        public ClsFemaleCounsellerFirst IsFemaleCounsellerFirstF2FMeeting(int UserId, string CounsellerIdACE)
        {
            ClsFemaleCounsellerFirst FemaleCounsellerFirst = new ClsFemaleCounsellerFirst();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", UserId);
                parameters.Add("@CounsellerIdACE", CounsellerIdACE);
                FemaleCounsellerFirst = con.Query<ClsFemaleCounsellerFirst>("IsFemaleCounsellerFirstF2FMeeting", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return FemaleCounsellerFirst;
        }
        public ClsConsentEncForm getconsetformpdf(int ApptmentId)
        {
            ClsConsentEncForm detail = new ClsConsentEncForm();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ApptmentId", ApptmentId);
                //parameters.Add("@CounsellerIdACE", CounsellerIdACE);
                detail = con.Query<ClsConsentEncForm>("getConsentformdetail", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return detail;
        }
        public List<CousollerandClientDetail> RemainderList()
        {
            List<CousollerandClientDetail> ServiceTypesList = new List<CousollerandClientDetail>();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();

                ServiceTypesList = con.Query<CousollerandClientDetail>("EAPRemindermaillist", commandType: CommandType.StoredProcedure).AsList();
            }
            return ServiceTypesList;
        }
        public int Updateremaindermaillist(int AppointmentId)
        {
            var result = 0;
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@AppointmentId", AppointmentId);
                result = SqlMapper.Execute(con, "Updateremaindermaillist", parameters, commandType: CommandType.StoredProcedure);
                
            }
            return result;
        }
        public string GetConsentFormFormat(string Code)
        {
            
            using (IDbConnection con = new SqlConnection(ConnectionString))
            
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TemplateName", Code);
            string result=con.Query<string>("EAPGetConsentFormFormat", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
           //string result = SqlMapper.Execute(con, "EAPGetConsentFormFormat", parameters, commandType: CommandType.StoredProcedure).ToString();

            
            return result;
        }
        public ClsAppointmentsEndTimeDiff GetAppointmentsEndTimediff(string ACEAppointmentId)
        {
            ClsAppointmentsEndTimeDiff AppointmentsendTimeDiff = new ClsAppointmentsEndTimeDiff();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ACEApptId", ACEAppointmentId);
                AppointmentsendTimeDiff = con.Query<ClsAppointmentsEndTimeDiff>("EAPGetCheckAppointmentDetails", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return AppointmentsendTimeDiff;
        }
        public ClsQueue CreateQueue(int UserId)
        {
            ClsQueue InsertQueue = new ClsQueue();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Userid", UserId);
                InsertQueue = con.Query<ClsQueue>("EAPCreateQueue", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return InsertQueue;
        }
        public ClsPositionQueue PositionQueue(int QueueId)
        {
            ClsPositionQueue PositionQueue = new ClsPositionQueue();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@QueueId", QueueId);
                PositionQueue = con.Query<ClsPositionQueue>("PositionQueue", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return PositionQueue;
        }
        public ClsConnectdQueue ConnectdQueue(int UserId, int CounsellorId, int QueueId)
        {
            ClsConnectdQueue ConnectdQueue = new ClsConnectdQueue();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Userid", UserId);
                parameters.Add("@CounsellorId", CounsellorId);
                parameters.Add("@QueueId", QueueId);
                ConnectdQueue = con.Query<ClsConnectdQueue>("ConnectdQueue", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return ConnectdQueue;
        }
        public List<ClstransrpitforScedule> GetScedulechatList()
        {
            List<ClstransrpitforScedule> ScedulechatList = new List<ClstransrpitforScedule>();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();

                ScedulechatList = con.Query<ClstransrpitforScedule>("EAPGetScedulechatList", commandType: CommandType.StoredProcedure).AsList();
            }
            return ScedulechatList;
        }
        public int UpdateScedulechatList(string ACEAppointmentId)
        {
            var result = 0;
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ACEAppointmentId", ACEAppointmentId);
                result = SqlMapper.Execute(con, "EAPUpdateScedulechatList", parameters, commandType: CommandType.StoredProcedure);

            }
            return result;
        }
        public List<Gettransrpitforinstantlist> GetInstantchatList()
        {
            List<Gettransrpitforinstantlist> ScedulechatList = new List<Gettransrpitforinstantlist>();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();

                ScedulechatList = con.Query<Gettransrpitforinstantlist>("EapGetInstantchatList", commandType: CommandType.StoredProcedure).AsList();
            }
            return ScedulechatList;
        }
        public int UpdateInstantchatList(string ACEAppointmentId)
        {
            var result = 0;
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ACEAppointmentId", ACEAppointmentId);
                result = SqlMapper.Execute(con, "EAPUpdateInstantchatList", parameters, commandType: CommandType.StoredProcedure);

            }
            return result;
        }
        public List<ClsGetSpecialitiestb> GetSpecialities(string ProfessionalsDoc)
        {
            List<ClsGetSpecialitiestb> ProfessionalsList = new List<ClsGetSpecialitiestb>();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ProfessionalDoc", ProfessionalsDoc);
                ProfessionalsList = con.Query<ClsGetSpecialitiestb>("ACECreateSpecialities", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            return ProfessionalsList;
        }
        public ClsGetAppointmentDetail GetBookedAppointments(int UserId, string CounsellerId, string Location, DateTime FromDateInUTC, DateTime ToDateInUTC)
        {
         ClsGetAppointmentDetail AppointmentList = new ClsGetAppointmentDetail();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", UserId);
                parameters.Add("@CounsellerId", CounsellerId);
                parameters.Add("@StartDateInUTc", FromDateInUTC);
                parameters.Add("@EndDateInUTC", ToDateInUTC);
                parameters.Add("@Location", Location);
                //parameters.Add("@type", UserId);

              AppointmentList = con.Query<ClsGetAppointmentDetail>("EAPGetLocationFROMAppintments", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return AppointmentList;
        }
        public dynamic CheckDomain(string email)
        {
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Email", email);
            var result = con.Query<dynamic>("CheckDomainInEAP", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return result;
        }
        public ClsFamlilyMemberExist FamlilyMemberExist(string EmailId, int UserId)
        {
            ClsFamlilyMemberExist FamlilyMemberExist = new ClsFamlilyMemberExist();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Email", EmailId);
                parameters.Add("@UserId", UserId);
                FamlilyMemberExist = con.Query<ClsFamlilyMemberExist>("GetACEFamlilyclientIdExist", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return FamlilyMemberExist;
        }
        public ClSresponsefmailymember InsertFamilyMembers(FamilyClientRequest model)
        {
            ClSresponsefmailymember ServiceTypesList = new ClSresponsefmailymember();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@FMFirstName", model.FirstName);
                parameters.Add("@FMLastName", model.LastName);
                parameters.Add("@FMEmail", model.Email);
                if (model.DateOfBirth == System.DateTime.MinValue)
                    parameters.Add("@FMBirthDate", null);
                else
                    parameters.Add("@FMBirthDate", model.DateOfBirth);

                parameters.Add("@FMPhone", model.PhoneNumber);
                parameters.Add("@ACEClientId", model.ACEClientId);
                parameters.Add("@CustomerId", model.CustomerId);
                parameters.Add("@UserId", model.UserId);
                ServiceTypesList = con.Query<ClSresponsefmailymember>("CreateFamilyMembers", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return ServiceTypesList;
        }
        public int UpdateEmailSurveySent(string ACEAppointmentId)
        {
            var result = 0;
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ACEAppointmentId", ACEAppointmentId);
                result = SqlMapper.Execute(con, "EAPUpdateEmailSurveySent", parameters, commandType: CommandType.StoredProcedure);

            }
            return result;
        }
        public ReservationParametres GetActivityParameters(BookingSlotsnew model)
        {
            ReservationParametres ServiceTypesList = new ReservationParametres();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", 0);
                parameters.Add("@ActivityTypeFlag", model.activityTypeIds[0]);
                ServiceTypesList = con.Query<ReservationParametres>("ACEGetReservationParameters", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return ServiceTypesList;
        }
    }
}
