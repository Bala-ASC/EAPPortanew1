using EAPAccess.DAL.Interfaces;
using EAPAccess.Entities;
using EAPAccess.Entities.Models;
using EAPAccess.BAL.Interfaces;
using System.Collections.Generic;
using System;
using EAPAccess.Entities.MobileModels;

namespace EAPAccess.BAL
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private ICommonService _commonService;
        public UserService(IUserRepository userRepository, ICommonService commonService)
        {
            _userRepository = userRepository;
            _commonService = commonService;
        }
        public Tuple<User, string> UserLogin(AuthenticationModel authenticationModel,string message)
        {
            return _userRepository.UserLogin(authenticationModel,message);
        }

        public List<User> GetUsers()
        {
            return _userRepository.GetUsers();
        }
        public List<User> GetUsers(int Id)
        {
            return _userRepository.GetUsers(Id);
        }
        public List<User> GetUsersByRole(int RoleId)
        {
            return _userRepository.GetUsersByRole(RoleId);
        }
        public List<User> GetClientUsers()
        {
            return _userRepository.GetClientUsers();
        }
        public User PostUser(User user, string rootPath, string folderLocation)
        {
           // return _userRepository.PostUser(user);

            User userEntity = null;
            if (user.Base64Data != null && user.FileType!=null)
            {

               
              //  fileName = Guid.NewGuid().ToString() + Filename; //Create a new Name 
                                                                 //for the file due to security
                string FileName = Guid.NewGuid().ToString() + "." + user.FileType;
              
                user.ProfilePhoto = FileName;
                userEntity = _userRepository.PostUser(user);
              
                string imagePath = folderLocation + "/" + userEntity.UserId;
                _commonService.FileUpload(rootPath, imagePath, FileName, user.Base64Data);

            }
            else
                userEntity = _userRepository.PostUser(user);

            return userEntity;
        }
        public List<User> GetCounsellor()
        {
            return _userRepository.GetCounsellor();
        }
        public User GetUserById(int UserId)
        {
            return _userRepository.GetUserById(UserId);
        }
        public string ChangePassword(ChangePassword changePassword)
        {
            return _userRepository.ChangePassword(changePassword);
        }
        public Tuple<User, string> ForgotPassword(User user, string message)
        {
            return _userRepository.ForgotPassword(user, message);
        }
        public int Updatepassword(Forgotpassword forgotpassword)
        {
            return _userRepository.Updatepassword(forgotpassword);
        }
        public dynamic CheckDomain(string email)
        {
            return _userRepository.CheckDomain(email);
        }       
        public List<dynamic> GetClientGroups(string customerId)
        {
            return _userRepository.GetClientGroups(customerId);
        }
        public List<dynamic> GetClientDivisions(string groupId)
        {
            return _userRepository.GetClientDivisions(groupId);
        }
        public List<dynamic> GetClientDepartments(string divisionId)
        {
            return _userRepository.GetClientDepartments(divisionId);
        }
        public User SignupCounsellor(Counsellor counsellor)
        {
            return _userRepository.SignupCounsellor(counsellor);
        }
        public User ConfirmCounsellor(int userId, string password)
        {
            return _userRepository.ConfirmCounsellor(userId, password);
        }
        public int updateprofile(User user)
        {
            return _userRepository.updateprofile(user);
        }
        public int updatephoto(User user, string rootPath, string folderLocation)
        {
            // return _userRepository.PostUser(user);

            var result = 0;
            if (user.Base64Data != null && user.FileType != null)
            {
                //  fileName = Guid.NewGuid().ToString() + Filename; //Create a new Name 
                //for the file due to security
                string FileName = Guid.NewGuid().ToString() + "." + user.FileType;
                user.ProfilePhoto = FileName;
                result = _userRepository.updatephoto(user);
                string imagePath = folderLocation + "/" + user.UserId;
                _commonService.FileUpload(rootPath, imagePath, FileName, user.Base64Data);

            }
            else
            {
                result = _userRepository.updatephoto(user);
                // return result;
            }
            return result;
        }
        public string CheckEmailDuplication(string email)
        {
            return _userRepository.CheckEmailDuplication(email);
        }
        public Tuple<SignUpInfo,string> CheckDomainNameandClientServiceEnabled(string DomainName)
        {
            return _userRepository.CheckDomainNameandClientServiceEnabled(DomainName);
        }
        public string GetACEclientIdExist(int UserId)
        {
            return _userRepository.GetACEclientIdExist(UserId);
        }
        public User UpdateUserInfo(User user)
        {
            return _userRepository.UpdateUserInfo(user);
        }
        public MobileUser UpdateUserProfile(MobileUser mobileUser, string rootPath, string folderLocation)
        {
            MobileUser userentity = null;
            if (mobileUser.Base64Data != null)
            {
                string filetype = mobileUser.FileType.Replace("image/", "");
                string FileName = Guid.NewGuid().ToString() + "." + filetype;
                mobileUser.ProfilePhoto = FileName;
                userentity = _userRepository.UpdateUserProfile(mobileUser, true);
                string imagePath = folderLocation + "/" + userentity.UserId;
                _commonService.FileUpload(rootPath, imagePath, FileName, mobileUser.Base64Data);

            }
            else
                userentity = _userRepository.UpdateUserProfile(mobileUser, false);

            return userentity;
        }
        public User GetACEclientId(string ACEAppointmentId)
        {
            return _userRepository.GetACEclientId(ACEAppointmentId);
        }
        public int UpdateUserIsLive(int UserId, bool IsLive)
        {
            return _userRepository.UpdateUserIsLive(UserId, IsLive);
        }
        public string CheckUrlisExpireOrNot(int UserId, string GUID)
        {
            return _userRepository.CheckUrlisExpireOrNot(UserId, GUID);
        }
        public bool IsConsentFormFilled(int UserId)
        {
            return _userRepository.IsConsentFormFilled(UserId);
        }
        public bool IsActiveUser(int UserIdint)
        {
            return _userRepository.IsActiveUser(UserIdint);
        }
    }
}
