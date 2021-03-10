using EAPAccess.Entities;
using EAPAccess.Entities.MobileModels;
using EAPAccess.Entities.Models;
using System;
using System.Collections.Generic;

namespace EAPAccess.DAL.Interfaces
{
    public interface IUserRepository
    {
        Tuple<User, string> UserLogin(AuthenticationModel authenticationModel, string message);
        List<User> GetUsers();        
        List<User> GetUsers(int Id);
        List<User> GetUsersByRole(int Id);
        List<User> GetClientUsers();
        User PostUser(User user);
        List<User> GetCounsellor();
        User GetUserById(int UserId);
        string ChangePassword(ChangePassword changePassword);
        Tuple<User, string> ForgotPassword(User user, string message);
        int Updatepassword(Forgotpassword forgotpassword);
        dynamic CheckDomain(string email);
        List<dynamic> GetClientGroups(string customerId);
        List<dynamic> GetClientDivisions(string groupId);
        List<dynamic> GetClientDepartments(string divisionId);
        User SignupCounsellor(Counsellor counsellor);
        User ConfirmCounsellor(int userId, string password);
        int updateprofile(User user);
        int updatephoto(User user);
        string CheckEmailDuplication(string email);
        Tuple<SignUpInfo, string> CheckDomainNameandClientServiceEnabled(string DomainName);
        string GetACEclientIdExist(int UserId);
        User UpdateUserInfo(User user);
        MobileUser UpdateUserProfile(MobileUser mobileUser, bool PhotoUploaded);
        User GetACEclientId(string ACEAppointmentId);
        int UpdateUserIsLive(int UserId, bool IsLive);
        string CheckUrlisExpireOrNot(int UserId, string GUID);
        bool IsConsentFormFilled(int UserId);
        bool IsActiveUser(int UserIdint);
    }
}
