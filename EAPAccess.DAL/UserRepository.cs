using Dapper;
using EAPAccess.DAL.Interfaces;
using EAPAccess.Entities;
using EAPAccess.Entities.MobileModels;
using EAPAccess.Entities.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace EAPAccess.DAL
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public Tuple<User, string> UserLogin(AuthenticationModel authenticationModel, string message)
        {
            User user = new User();

            if (con.State == ConnectionState.Closed)
                con.Open();

            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Email", authenticationModel.Email);
            parameters.Add("@Password", authenticationModel.Password);
            parameters.Add("@Message", dbType: DbType.String, size: 150, direction: ParameterDirection.Output);
            user = con.Query<User>("EAPLogin", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            message = parameters.Get<string>("@Message");


            return new Tuple<User, string>(user, message);
        }
        public List<User> GetUsers()
        {
            List<User> userList = new List<User>();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                userList = con.Query<User>("[dbo].[EAPGetUsers]", commandType: CommandType.StoredProcedure).AsList();
            }
            return userList;
        }
        public List<User> GetUsers(int Id)
        {
            List<User> userList = new List<User>();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", Id);
                userList = con.Query<User>("[dbo].[EAPGetUsers]", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            return userList;
        }

        public List<User> GetUsersByRole(int roleId)
        {
            List<User> userList = new List<User>();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@RoleId", roleId);
                userList = con.Query<User>("[dbo].[EAPGetUsers]", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            return userList;
        }

        public List<User> GetClientUsers()
        {
            List<User> userList = new List<User>();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                userList = con.Query<User>("[dbo].[EAPGetClientUsers]", commandType: CommandType.StoredProcedure).AsList();
            }
            return userList;
        }

        public User PostUser(User user)
        {
            var result = new User();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", user.UserId);
                parameters.Add("@FirstName", user.FirstName);
                parameters.Add("@LastName", user.LastName);
                parameters.Add("@Gender", user.Gender);
                parameters.Add("@DateOfBirth", user.DateOfBirth);
                // parameters.Add("@UserName", user.UserName);
                parameters.Add("@Password", user.Password);
                parameters.Add("@FullName", user.FullName);
                parameters.Add("@Email", user.Email);
                parameters.Add("@WorkEmail", user.WorkEmail);
                parameters.Add("@OrganisationId", user.OrganisationId);
                parameters.Add("@RoleId", user.RoleId);
                parameters.Add("@MobileNo", user.MobileNo);
                parameters.Add("@ProfilePhoto", user.ProfilePhoto);
                if (user.LastLoggedInOn != null)
                    parameters.Add("@LastLoggedInOn", Convert.ToDateTime(user.LastLoggedInOn));
                parameters.Add("@IsManagerRoleApproved", user.IsManagerRoleApproved);
                parameters.Add("@LoginProvider", user.LoginProvider);
                parameters.Add("@ProviderId", user.ProviderId);
                parameters.Add("@ProviderToken", user.ProviderToken);
                parameters.Add("@DeviceId", user.DeviceId);
                parameters.Add("@DeviceType", user.DeviceType);
                parameters.Add("@IsActive", user.IsActive);
                parameters.Add("@CreatedBy", user.CreatedBy);
                parameters.Add("@UpdatedBy", user.UpdatedBy);
                result = con.Query<User>("EAPInsertUpdateUser", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault(); ;
            }
            return result;
        }
        public List<User> GetCounsellor()
        {
            List<User> userList = new List<User>();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                userList = con.Query<User>("EAPGetCounsellor", commandType: CommandType.StoredProcedure).AsList();
            }
            return userList;
        }
        public User GetUserById(int UserId)
        {
            User users = new User();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", UserId);
                users = con.Query<User>("EAPGetUsers", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return users;
        }
        public string ChangePassword(ChangePassword changePassword)
        {
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@UserId", changePassword.UserId);
            parameters.Add("@OldPassword", changePassword.OldPassword);
            parameters.Add("@Password", changePassword.Password);
            parameters.Add("@Message", dbType: DbType.String, size: 50, direction: ParameterDirection.Output);
            SqlMapper.Execute(con, "EAPChangePassword", parameters, commandType: CommandType.StoredProcedure);
            string message = parameters.Get<string>("@Message");
            return message;
        }
        public Tuple<User, string> ForgotPassword(User user, string message)
        {
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Email", user.Email);
            parameters.Add("@Message", dbType: DbType.String, size: 200, direction: ParameterDirection.Output);
            user = con.Query<User>("EAPForgotpassword", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            message = parameters.Get<string>("@Message");
            return new Tuple<User, string>(user, message);
        }
        public int Updatepassword(Forgotpassword forgotpassword)
        {
            var result = 0;
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@UserId", forgotpassword.UserId);
            parameters.Add("@Password", forgotpassword.Password);
            result = SqlMapper.Execute(con, "EAPUpdatepassword", parameters, commandType: CommandType.StoredProcedure);
            return result;
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

        public List<dynamic> GetClientGroups(string customerId)
        {
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@orgId", customerId);
            var result = con.Query<dynamic>("EAPGetClientGroups", parameters, commandType: CommandType.StoredProcedure).AsList();
            return result;
        }

        public List<dynamic> GetClientDivisions(string groupId)
        {
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@groupId", groupId);
            var result = con.Query<dynamic>("EAPGetClientDivisions", parameters, commandType: CommandType.StoredProcedure).AsList();
            return result;
        }

        public List<dynamic> GetClientDepartments(string divisionId)
        {
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@divisionId", divisionId);
            var result = con.Query<dynamic>("EAPGetClientDepartments", parameters, commandType: CommandType.StoredProcedure).AsList();
            return result;
        }
        public User SignupCounsellor(Counsellor counsellor)
        {
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Email", counsellor.Email);
            parameters.Add("@FirstName", counsellor.FirstName);
            parameters.Add("@LastName", counsellor.LastName);
            parameters.Add("@Gender", counsellor.Gender);
            parameters.Add("@MobileNo", counsellor.MobileNo);
            parameters.Add("@DateOfBirth", counsellor.DateOfBirth);
            parameters.Add("@Postcode", counsellor.Postcode);
            parameters.Add("@OrganisationId", counsellor.OrganisationId);
            parameters.Add("@ClientOrgGroupId", counsellor.GroupId);
            parameters.Add("@ClientOrgDivisionId", counsellor.DivisionId);
            parameters.Add("@ClientOrgDepartmentId", counsellor.DeptId);
            parameters.Add("@ACEClientId", counsellor.ACEClientId);
            parameters.Add("@DomainName", counsellor.DomainName);
            var user = con.Query<User>("EAPSignupCounsellor", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return user;
        }

        public User ConfirmCounsellor(int userId, string password)
        {
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@uaerId", userId);
            parameters.Add("@password", password);
            var user = con.Query<User>("EAPConfirmCounsellor", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return user;
        }
        public int updateprofile(User user)
        {
            var result = 0;
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@UserId", user.UserId);
            parameters.Add("@FirstName", user.FirstName);
            parameters.Add("@LastName", user.LastName);
            parameters.Add("@ClientOrgGroupId", user.ClientOrgGroupId);
            parameters.Add("@ClientOrgDepartmentId", user.ClientOrgDepartmentId);
            parameters.Add("@ClientOrgDivisionId", user.ClientOrgDivisionId);
            parameters.Add("@MobileNo", user.MobileNo);
            parameters.Add("@DateOfBirth", user.DateOfBirth);
            parameters.Add("@PostCode", user.PostCode);
            parameters.Add("@City", user.City);
            parameters.Add("@State", user.State);
            parameters.Add("@Gender", user.Gender);
            result = SqlMapper.Execute(con, "TestEAPPortalupdateProfile", parameters, commandType: CommandType.StoredProcedure);
            return result;
        }
        public int updatephoto(User user)
        {
            var result = 0;
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@UserId", user.UserId);
            parameters.Add("@ProfilePhoto", user.ProfilePhoto);
            result = SqlMapper.Execute(con, "EAPPortalupdatephoto", parameters, commandType: CommandType.StoredProcedure);
            return result;
        }

        public string CheckEmailDuplication(string email)
        {
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Email", email);
            parameters.Add("@Message", dbType: DbType.String, size: 50, direction: ParameterDirection.Output);
            SqlMapper.Execute(con, "MobileEAPCheckEmailDuplication", parameters, commandType: CommandType.StoredProcedure);
            string message = parameters.Get<string>("@Message");
            return message;
        }
        public Tuple<SignUpInfo, string> CheckDomainNameandClientServiceEnabled(string DomainName)
        {
            SignUpInfo signUpInfo = new SignUpInfo();
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@DomainName", DomainName);
            parameters.Add("@Message", dbType: DbType.String, size: 200, direction: ParameterDirection.Output);
            // SqlMapper.Execute(con, "MobileCheckDomainandclientserviceenabled", parameters, commandType: CommandType.StoredProcedure);
            signUpInfo = con.Query<SignUpInfo>("CheckDomainInUser", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            string message = parameters.Get<string>("@Message");
            // return message;
            return new Tuple<SignUpInfo, string>(signUpInfo, message);
        }
        public string GetACEclientIdExist(int UserId)
        {
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@UserId", UserId);
            parameters.Add("@Message", dbType: DbType.String, size: 50, direction: ParameterDirection.Output);
            SqlMapper.Execute(con, "GetACEclientIdExist", parameters, commandType: CommandType.StoredProcedure);
            string message = parameters.Get<string>("@Message");
            return message;
        }
        public User UpdateUserInfo(User user)
        {
            User userdetail = new User();
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@UserId", user.UserId);
            parameters.Add("@ACEClientId", user.ACEClientId);
            parameters.Add("@ClientOrgGroupId", user.ClientOrgGroupId);
            parameters.Add("@ClientOrgDepartmentId", user.ClientOrgDepartmentId);
            parameters.Add("@ClientOrgDivisionId", user.ClientOrgDivisionId);
            parameters.Add("@Gender", user.Gender);
            parameters.Add("@MobileNo", user.MobileNo);
            parameters.Add("@DateOfBirth", user.DateOfBirth);
            parameters.Add("@PostCode", user.PostCode);
            userdetail = con.Query<User>("EAPPortalUpdateUserInfo", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return userdetail;
        }

        public MobileUser UpdateUserProfile(MobileUser mobileUser, Boolean PhotoUploaded)
        {
            MobileUser UserDetails = new MobileUser();
            using (IDbConnection con = new SqlConnection(ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", mobileUser.UserId);
                parameters.Add("@FirstName", mobileUser.FirstName);
                parameters.Add("@LastName", mobileUser.LastName);
                parameters.Add("@Gender", mobileUser.Gender);
                parameters.Add("@DateOfBirth", mobileUser.DateOfBirth);
                parameters.Add("@City", mobileUser.City);
                parameters.Add("@State", mobileUser.State);
                parameters.Add("@Email", mobileUser.Email);
                parameters.Add("@MobileNo", mobileUser.MobileNo);
                parameters.Add("@ProfilePhoto", mobileUser.ProfilePhoto);
                parameters.Add("@PhotoUploaded", PhotoUploaded);
                parameters.Add("@PostCode", mobileUser.PostCode);
                parameters.Add("@ClientOrgGroupId", mobileUser.ClientOrgGroupId);
                parameters.Add("@ClientOrgDepartmentId", mobileUser.ClientOrgDepartmentId);
                parameters.Add("@ClientOrgDivisionId", mobileUser.ClientOrgDivisionId);
                parameters.Add("@ACEClientId", mobileUser.ACEClientId);

                UserDetails = con.Query<MobileUser>("MobileEAPUpdateUserProfile", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

            }
            return UserDetails;
        }
        public User GetACEclientId(string ACEAppointmentId)
        {
            User userdetail = new User();
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@ACEAppointmentId", ACEAppointmentId);

            userdetail = con.Query<User>("EAPGetClientDetailsAppointmentId", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return userdetail;
        }
        public int UpdateUserIsLive(int UserId, bool IsLive)
        {
            var result = 0;
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@UserId", UserId);
            parameters.Add("@IsLive", IsLive);
            result = SqlMapper.Execute(con, "UpdateIsLive", parameters, commandType: CommandType.StoredProcedure);
            return result;
        }
        public string CheckUrlisExpireOrNot(int UserId, string GUID)
        {
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@UserId", UserId);
            parameters.Add("@GUID", GUID);
            parameters.Add("@Message", dbType: DbType.String, size: 50, direction: ParameterDirection.Output);
            SqlMapper.Execute(con, "EAPGetExpireOrNot", parameters, commandType: CommandType.StoredProcedure);
            string message = parameters.Get<string>("@Message");
            return message;
        }
        public bool IsConsentFormFilled(int UserId)
        {
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@UserId", UserId);
            var IsConsentForm=con.Query<bool>("EAPGetIsConsentFormFilled", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return IsConsentForm;
        }
        public bool IsActiveUser(int UserIdint)
        {
            if (con.State == ConnectionState.Closed)
                con.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@UserId", UserIdint);
            var IsActiveUser = con.Query<bool>("EAPGetIsActiveUser", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return IsActiveUser;
        }
    }
}
