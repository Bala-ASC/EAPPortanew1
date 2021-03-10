
using EAP.ACE.Service;
using EAPAccess.BAL.Interfaces;
using EAPAccess.Common;
using EAPAccess.Common.Classes;
using EAPAccess.Common.Interface;
using EAPAccess.Entities;
using EAPAccess.Entities.ACEModels;
using EAPAccess.Entities.MobileModels;
using EAPAccess.Entities.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System;
using System.Globalization;

namespace EAPAccessPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        #region ## Properties and Constructor Event       
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;
        private IHostingEnvironment _hostingEnvironment;
        private IConfiguration _config;
        private string folderLocation;
        private string baseUsrl;
        public IEmail _email;
        public string _forgetpasswordurl;
        public string _appurl;
        public bool _isSendMailBySendGrid;
        public string _aceServiceTypeId;
        public UserController(ILogger<UserController> logger, IUserService userService, IHostingEnvironment hostingEnvironment, IConfiguration config, IEmail email)
        {
            _userService = userService;
            _logger = logger;
            _hostingEnvironment = hostingEnvironment;
            _config = config;
            folderLocation = config.GetSection("imagePaths").GetSection("Users").Value;
            baseUsrl = _config.GetSection("baseUrl").GetSection("Dev").Value;
            _email = email;
            _forgetpasswordurl = _config.GetSection("ForgetPasswordUrl").Value;
            _appurl = _config.GetSection("AppUrl").Value;
            _isSendMailBySendGrid = Convert.ToBoolean(_config.GetSection("IsSendMailBySendGrid").Value);
            _aceServiceTypeId = config.GetSection("aceServiceTypeId").Value;


        }
        #endregion

        #region ## Login API (Post: api/User/UserLogin)

        //Post: api/User/UserLogin        
        [HttpPost("[action]")]
        public ActionResult UserLogin([FromBody]AuthenticationModel authenticationModel)
        {
            _logger.LogInformation("POST: api/User/UserLogin Invoke");
            ResponseModel responseModel = new ResponseModel();
            string message = "";
            authenticationModel.Password = EncryptionDecryptionHelper.EncryptString(authenticationModel.Password);
            var result = _userService.UserLogin(authenticationModel, message);
            if (result.Item1 == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = result.Item2;
            }
            else if(result.Item2== "User can login")
            {
                if (result.Item1.RoleId != 5)
                {
                    if (result.Item1.ProfilePhoto != null)
                    {
                        result.Item1.ProfilePhoto = $"{baseUsrl}/{folderLocation}/{result.Item1.UserId}/{result.Item1.ProfilePhoto}";
                    }
                }

                responseModel.Result = result.Item1;
                responseModel.Message = result.Item2;
            }
            else
            {
                responseModel.Result = result.Item1;
                responseModel.Message = result.Item2;

            }

            return Ok(responseModel);


        }
        #endregion

        #region ## Get Users API (GET: api/User/GetUsers)

        //GET: api/User/GetUsers        
        [HttpGet("[action]")]
        public ActionResult GetUsers()
        {
            _logger.LogInformation("GET: api/User/GetUsers  Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.GetUsers();
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
            {
                for (int i = 0; i < result.Count; i++)
                {
                    if (result[i].ProfilePhoto != null)
                    {
                        result[i].ProfilePhoto = $"{baseUsrl}/{folderLocation}/{result[i].UserId}/{result[i].ProfilePhoto}";
                    }
                }
                responseModel.Result = result;
            }

            return Ok(responseModel);


        }
        #endregion

        #region ## Get Users API (GET: api/User/GetUsers/Id)

        //GET: api/User/GetUsers/Id        
        [HttpGet("[action]/{Id}")]
        public ActionResult GetUsers(int Id)
        {
            _logger.LogInformation("GET: api/User/GetUsers/Id  Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.GetUsers(Id);
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
            {
                for (int i = 0; i < result.Count; i++)
                {
                    if (result[i].ProfilePhoto != null)
                    {
                        result[i].ProfilePhoto = $"{baseUsrl}/{folderLocation}/{result[i].UserId}/{result[i].ProfilePhoto}";
                    }
                }
                responseModel.Result = result;
            }
            return Ok(responseModel);


        }
        #endregion

        #region ## Get Users API (GET: api/User/GetClientUsers)

        //GET: api/User/GetUsersByRole/Id        
        [HttpGet("[action]")]
        public ActionResult GetClientUsers()
        {
            _logger.LogInformation("GET: api/User/GetClientUsers  Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.GetClientUsers();
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
            {
                for (int i = 0; i < result.Count; i++)
                {
                    if (result[i].ProfilePhoto != null)
                    {
                        result[i].ProfilePhoto = $"{baseUsrl}/{folderLocation}/{result[i].UserId}/{result[i].ProfilePhoto}";
                    }
                }
                responseModel.Result = result;
            }
            return Ok(responseModel);


        }
        #endregion

        #region ## Get Users API (GET: api/User/GetUsersByRole/RoleId)

        //GET: api/User/GetUsersByRole/Id        
        [HttpGet("[action]/{Id}")]
        public ActionResult GetUsersByRole(int Id)
        {
            _logger.LogInformation("GET: api/User/GetUsersByRole/Id  Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.GetUsersByRole(Id);
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
            {
                for (int i = 0; i < result.Count; i++)
                {
                    if (result[i].ProfilePhoto != null)
                    {
                        result[i].ProfilePhoto = $"{baseUsrl}/{folderLocation}/{result[i].UserId}/{result[i].ProfilePhoto}";
                    }
                }
                responseModel.Result = result;
            }
            return Ok(responseModel);


        }
        #endregion

        #region ## POST Users API (POST: api/User/Post/)

        //POST: api/User/GetUsers        
        [HttpPost("[action]")]
        public ActionResult PostUser(User user)
        {

            _logger.LogInformation("POST: api/User/PostUser  Invoke");
            user.Password = RandomPassword.RandomGeneratePassword();
            user.Password = EncryptionDecryptionHelper.EncryptString(user.Password);
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.PostUser(user, _hostingEnvironment.ContentRootPath.ToString(), folderLocation);
            if (result == null)
            {

                responseModel.IsSuccess = false;
                responseModel.Message = "Record Not Created";
            }
            else
            {
                EmailServiceHelper emailService = new EmailServiceHelper(_config, _email);
                //Azure SendGrid Email Grid
                if (_isSendMailBySendGrid)
                    emailService.AdminRegMessage(result).Wait();

                ////local Send Email Grid
                //if (!_isSendMailBySendGrid)
                //    emailService.localUserRegMessage(result);

                responseModel.Result = result;

            }

            return Ok(responseModel);


        }
        #endregion

        #region ## Get Users API (GET: api/User/GetCounsellor)
        //GET: api/User/GetCounsellor       
        [HttpGet("[action]")]
        public ActionResult GetCounsellor()
        {
            _logger.LogInformation("GET: api/User/GetCounsellor  Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.GetCounsellor();
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
            {
               
                responseModel.Result = result;
            }
            return Ok(responseModel);


        }
        #endregion

        #region ## Get UserById API (GET: api/User/GetUserById)

        //GET: api/User/GetUserById    
        [HttpGet("[action]")]
        public ActionResult GetUserById(int UserId)
        {
            _logger.LogInformation("GET: api/User/GetUserById Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.GetUserById(UserId);
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
            {
                if (result.RoleId != 5)
                {
                    if (result.ProfilePhoto != null)
                    {
                        result.ProfilePhoto = $"{baseUsrl}/{folderLocation}/{result.UserId}/{result.ProfilePhoto}";
                    }
                }
                responseModel.Result = result;

            }

            return Ok(responseModel);


        }
        #endregion

        #region ## change password API (GET: api/User/ChangePassword)

        //GET: api/User/GetUsersByRole/Id        
        [HttpPost("[action]")]
        public ActionResult ChangePassword(ChangePassword changePassword)
        {
            changePassword.Password = EncryptionDecryptionHelper.EncryptString(changePassword.Password);
            changePassword.OldPassword = EncryptionDecryptionHelper.EncryptString(changePassword.OldPassword);
            _logger.LogInformation("GET: api/User/GetUsersByRole/Id  Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.ChangePassword(changePassword);
            if (result == "Old Password Is Not Correct")
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "Old Password Is Not Correct";
            }
            else
                responseModel.Result = result;

            return Ok(responseModel);


        }
        #endregion

        #region ## Forgotpassword API (Post: api/MobileUser/Forgotpassword)
        [HttpPost("[action]")]
        public ActionResult Forgotpassword([FromBody]User user)
        {
            string message = "";
            _logger.LogInformation("POST: api/MobileUser/Forgotpassword Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.ForgotPassword(user, message);
            if (result.Item2.ToString() == "Success")
            {
                EmailServiceHelper emailService = new EmailServiceHelper(_config, _email);
                //Azure SendGrid Email Grid
                if (_isSendMailBySendGrid)
                    emailService.ForgetPasswordMail(result.Item1).Wait();
                //EmailServiceHelperForMobile.ForgetMessage(result.Item1);

                //Local Send Email
                if (!_isSendMailBySendGrid)
                    emailService.localForgetMessage(result.Item1);
                responseModel.IsSuccess = true;
                responseModel.Message = "Success";
                responseModel.Result = result.Item2.ToString();
            }
            else
            {
                responseModel.IsSuccess = false;
                responseModel.Result = result.Item2.ToString();
            }
            return Ok(responseModel);


        }
        #endregion

        #region ## Updatepassword API (Post: api/MobileUser/Updatepassword)
        [HttpPost("[action]")]
        public ActionResult Updatepassword(Forgotpassword forgotpassword)
        {
            string UserId = (forgotpassword.UserId.Replace("œ", "+").Replace("Ž", "=").Replace("ô", "/"));
            forgotpassword.UserId = EncryptionDecryptionHelper.DecryptString(UserId);
            forgotpassword.Password = EncryptionDecryptionHelper.EncryptString(forgotpassword.Password);
            _logger.LogInformation("Post: api/MobileUser/Updatepassword Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.Updatepassword(forgotpassword);
            if (result <= 0)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "Record Not Updated";
            }
            else
                responseModel.Result = "Update";
            return Ok(responseModel);


        }
        #endregion

        #region ## signUp CheckDomain [api/User/CheckDomain]
        /// <summary>
        /// To check email domain registered in EAP==true?insert user:invalid domain
        /// </summary>
        /// <param name="email">valid user email</param>
        /// <returns>userId</returns>
        [HttpPost("[action]")]
        public ActionResult CheckDomain(string email)
        {
            _logger.LogInformation("Post: api/User/CheckDomain Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.CheckDomain(email);
            if (result != null)
            {
                responseModel.Message = "Success";
                responseModel.Result = result;
            }
            else
            {
                responseModel.Message = "Email Domain is not registered in EAP, Try Later";
                responseModel.Result = result;
            }
            return Ok(responseModel);
        }
        #endregion

        #region ## Get Client Groups API (GET: api/User/GetGroups)
        /// <summary>
        /// To Get Client Organization Groups based on organization
        /// </summary>
        /// <param name="customerId">ACECustomerId </param>
        /// <returns>list of groups</returns>
        //GET: api/User/GetUsers        
        [HttpGet("[action]")]
        public ActionResult GetGroups(string customerId)
        {
            _logger.LogInformation("GET: api/User/GetGroups  Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.GetClientGroups(customerId);
            if (result == null )
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
            {
                responseModel.IsSuccess = true;
                responseModel.Result = result;
            }
            return Ok(responseModel);

        }
        #endregion

        #region ## Get Client Divisions API (GET: api/User/GetDivisions)
        /// <summary>
        /// To Get Client Organization Divisions based on groupId
        /// </summary>
        /// <param name="groupId">groupId</param>
        /// <returns>list of Divisions</returns>
        //GET: api/User/GetUsers        
        [HttpGet("[action]")]
        public ActionResult GetDivisions(string groupId)
        {
            _logger.LogInformation("GET: api/User/GetDivisions  Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.GetClientDivisions(groupId);
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
            {
                responseModel.IsSuccess = true;
                responseModel.Result = result;
            }
            return Ok(responseModel);

        }
        #endregion

        #region ## Get Client Departments API (GET: api/User/GetDepartments)
        /// <summary>
        /// To Get Client Organization Departments based on groupId
        /// </summary>
        /// <param name="divisionId">divisionId</param>
        /// <returns>list of Divisions</returns>
        //GET: api/User/GetUsers        
        [HttpGet("[action]")]
        public ActionResult GetDepartments(string divisionId)
        {
            _logger.LogInformation("GET: api/User/GetDepartments  Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.GetClientDepartments(divisionId);
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
            {
                responseModel.IsSuccess = true;
                responseModel.Result = result;
            }
            return Ok(responseModel);
        }
        #endregion

        #region ## signUp Counsellor [api/User/CheckDomain]
        /// <summary>
        /// To Signup Counsellor User in EAP
        /// </summary>
        /// <param name="counsellor">counsellor model</param>
        /// <returns>true/false</returns>
        [HttpPost("[action]")]
        public ActionResult SignupCounsellor([FromBody]Counsellor counsellor)
        {
            _logger.LogInformation("Post: api/User/SignupCounsellor Invoke");
            ResponseModel responseModel = new ResponseModel();
            ClientRequestToCreateId objclient = new ClientRequestToCreateId();
            objclient.firstName = counsellor.FirstName;
            objclient.lastName = counsellor.LastName;
            objclient.email = counsellor.Email;
            objclient.customerId = counsellor.ACECustomerId;
           // objclient.customerId = "a4534a91-f202-40e1-b91d-79738d647419";
            objclient.serviceTypeId = _aceServiceTypeId;
            objclient.employerGroupId = counsellor.GroupId;
            objclient.employerDepartmentId = counsellor.DeptId;
            objclient.employerDivisionId = counsellor.DivisionId;
            objclient.postCode = counsellor.Postcode;
            objclient.dateOfBirth = counsellor.DateOfBirth;
            objclient.phoneNumber = counsellor.MobileNo;
            //objclient.gender = counsellor.Gender;

            //objclient.firstName = "Thiruka";
            //objclient.lastName = "Naik";
            //objclient.email = "naik123459@gmail.com";
            //objclient.customerId = "32e57fce-ad44-4da8-a366-26225033267a";
            //objclient.serviceTypeId = "48659344-d51b-4a63-9807-7b29846be375";
            //objclient.employerGroupId = "75b088b4-8bab-4b2c-b908-16deefb0576f";
            //objclient.employerDepartmentId = "82d3bb7b-6623-4552-b9c9-83951efad031";
            //objclient.employerDivisionId = "121960dc-cf53-44f6-b7ca-ccb7b5bffce9";
            //objclient.postCode = "1001";
            //objclient.dateOfBirth = "5-5-2016";
            //objclient.phoneNumber = "98567142365";
            ACEAPI objaceapi = new ACEAPI();
            var GetclientResponse = objaceapi.CreateClientId(objclient);
            if(GetclientResponse.id!= null)
            {
                counsellor.ACEClientId = GetclientResponse.id;
                var result = _userService.SignupCounsellor(counsellor);
                if (result != null)
                {
                    EmailServiceHelper emailService = new EmailServiceHelper(_config, _email);
                    if (_isSendMailBySendGrid)
                        emailService.SignUpVerificationEmail(result).Wait();
                    responseModel.Message = "Success";
                    responseModel.Result = result;
                }
            }
           
            

            else
            {
                responseModel.IsSuccess = false;
                responseModel.Message = $"{counsellor.Email} Not Registered";
                responseModel.Result = GetclientResponse.detail;
            }
            return Ok(responseModel);
        }
        #endregion

        #region ##  Confirm Counsellor [api/User/ConfirmCounsellor]
        /// <summary>
        /// To Signup Counsellor User in EAP
        /// </summary>
        /// <param name="cofirm">JObject model</param>
        /// <returns>User</returns>
        [HttpPost("[action]")]
        public ActionResult ConfirmCounsellor([FromBody]JObject cofirm)
        {
            var userId = Convert.ToInt32(cofirm["id"].ToString());
            var password = cofirm["pswd"].ToString();
            var encriptedPassword = EncryptionDecryptionHelper.EncryptString(password);
            _logger.LogInformation("Post: api/User/ConfirmCounsellor Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.ConfirmCounsellor(userId, encriptedPassword);

            if (result != null)
            {
                //email
                responseModel.Message = "Success";
                responseModel.Result = result;
            }
            else
            {
                responseModel.Message = $"User Not Exists";
                responseModel.Result = result;
            }
            return Ok(responseModel);
        }
        #endregion

        #region ## Get GetUserByEncryptedId API (GET: api/User/GetUserByEncryptedId)

        //GET: api/User/GetUserById    
        [HttpGet("[action]")]
        public ActionResult GetUserByEncryptedId(string UserId)
        {
            string pswd = (UserId.Replace("œ", "+").Replace("Ž", "=").Replace("ô", "/"));
            var userId = Convert.ToInt32(EncryptionDecryptionHelper.DecryptString(pswd));
            _logger.LogInformation("GET: api/User/GetUserByEncryptedId Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.GetUserById(userId);
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;

            return Ok(responseModel);
        }
        #endregion

        #region ## updateprofile API (GET: api/User/updateprofile)

        //Post: api/User/updateprofile       
        [HttpPost("[action]")]
        public ActionResult updateprofile(User user)
        {
           
            _logger.LogInformation("Post: api/User/updateprofile Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.updateprofile(user);
            if (result <= 0)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "user not updated";
            }
            else
                responseModel.Result = result;

            return Ok(responseModel);


        }
        #endregion

        #region ## updatephoto API (POST: api/User/updatephoto/)

        //POST: api/User/GetUsers        
        [HttpPost("[action]")]
        public ActionResult updatephoto(User user)
        {

            _logger.LogInformation("POST: api/User/updatephoto  Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.updatephoto(user, _hostingEnvironment.ContentRootPath.ToString(), folderLocation);
            if (result <= 0)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "user not updated";
            }
            else
                responseModel.Result = result;

            return Ok(responseModel);


        }
        #endregion

        #region ## CheckEmailDuplication API (Post: api/User/CheckEmailDuplication)
        [HttpPost("[action]")]
        public ActionResult CheckEmailDuplication(string email)
        {
            _logger.LogInformation("Post: api/User/CheckEmailDuplication Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.CheckEmailDuplication(email);
            responseModel.Result = result;
            return Ok(responseModel);


        }
        #endregion

        #region ## signUp CheckDomainandClientService [api/User/CheckDomainandClientService]
        /// <summary>
        /// To check  domain registered in EAP==true?insert user:invalid domain
        /// </summary>
        /// <param name="domain">valid user domain</param>
        /// <returns>Message</returns>
        [HttpGet("[action]")]
        public ActionResult CheckDomainandClientService(string DomainName)
        {
            _logger.LogInformation("Post: api/User/CheckDomainandClientService Invoke");
            if (Uri.IsWellFormedUriString(DomainName, UriKind.Absolute))
            {
                DomainName = new Uri(DomainName).Host;
               DomainName = DomainName.Replace("www.", "");
            }
            else
            {
                DomainName = DomainName.Replace("www.", "");
            }
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.CheckDomainNameandClientServiceEnabled(DomainName);
            if (result.Item1 ==null)
            {
                responseModel.Message = "Error";
                responseModel.IsSuccess = false;
                responseModel.Result = result.Item2;
            }
            else
            {
                responseModel.Result = result.Item1;
            }
            return Ok(responseModel);
        }
        #endregion

        #region ## Get Client GetACEclientIdExist API (GET: api/User/GetACEclientIdExist)
        
        //GET: api/User/GetUsers        
        [HttpGet("[action]")]
        public ActionResult GetACEclientIdExist(int UserId)
        {
            _logger.LogInformation("GET: api/User/GetACEclientIdExist  Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.GetACEclientIdExist(UserId);
            if (result == "ACEClientId is Exist")
            {
                responseModel.IsSuccess = true;
                responseModel.Result = result;
               
            }
            else
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
                responseModel.Result = result;
            }
            return Ok(responseModel);

        }
        #endregion

        #region ## UpdateUserInfo API (GET: api/User/UpdateUserInfo)

        //Post: api/User/updateprofile       
        [HttpPost("[action]")]
        public ActionResult UpdateUserInfo(User user)
        {

            _logger.LogInformation("Post: api/User/UpdateUserInfo Invoke");
            ResponseModel responseModel = new ResponseModel();
            ClientRequestToCreateId objclient = new ClientRequestToCreateId();
            objclient.firstName = user.FirstName;
            objclient.lastName = user.LastName;
            objclient.email = user.Email;
            objclient.customerId = user.ACECustomerId;
            objclient.serviceTypeId = _aceServiceTypeId;
            objclient.employerGroupId = user.ClientOrgGroupId;
            objclient.employerDepartmentId = user.ClientOrgDepartmentId;
            objclient.employerDivisionId = user.ClientOrgDivisionId;
            objclient.postCode = user.PostCode;
            objclient.dateOfBirth = user.DateOfBirth;
            objclient.phoneNumber = user.MobileNo;
            ACEAPI objaceapi = new ACEAPI();
            var GetclientResponse = objaceapi.CreateClientId(objclient);
            if (GetclientResponse.id!= null)
            {
                user.ACEClientId = GetclientResponse.id;
                var result = _userService.UpdateUserInfo(user);
                if (result == null)
                {
                    responseModel.IsSuccess = false;
                    responseModel.Message = "user not updated";
                }
                else
                {
                    if (result.RoleId != 5)
                    {
                        if (result.ProfilePhoto != null)
                        {
                            result.ProfilePhoto = $"{baseUsrl}/{folderLocation}/{result.UserId}/{result.ProfilePhoto}";
                        }
                    }
                    responseModel.Result = result;
                }
            }
            else
            {
                responseModel.IsSuccess = false;
                responseModel.Message = GetclientResponse.detail;
            }
            return Ok(responseModel);


        }
        #endregion

        #region ## UpdateUserProfile API (Post: api/MobileUser/UpdateUserProfile)
        [HttpPost("[action]")]
        public ActionResult UpdateUserProfile(MobileUser mobileUser)
        {
            _logger.LogInformation("Post: api/User/UpdateUserProfile Invoke");
            ClientResponse GetclientResponse = null;
            if (mobileUser.ACEClientId==null)
            {
                ClientRequestToCreateId objclient = new ClientRequestToCreateId();
                objclient.firstName = mobileUser.FirstName;
                objclient.lastName = mobileUser.LastName;
                objclient.email = mobileUser.Email;
                objclient.customerId = mobileUser.ACECustomerId;
                objclient.serviceTypeId = _aceServiceTypeId;
                objclient.employerGroupId = mobileUser.ClientOrgGroupId;
                objclient.employerDepartmentId = mobileUser.ClientOrgDepartmentId;
                objclient.employerDivisionId = mobileUser.ClientOrgDivisionId;
                objclient.postCode = mobileUser.PostCode;
                objclient.dateOfBirth = mobileUser.DateOfBirth;
                objclient.phoneNumber = mobileUser.MobileNo;
                ACEAPI objaceapi = new ACEAPI();
                 GetclientResponse = objaceapi.CreateClientId(objclient);
                if (GetclientResponse.id!= null)
                    mobileUser.ACEClientId = GetclientResponse.id;
            }
            
           ResponseModel responseModel = new ResponseModel();
            if (mobileUser.ACEClientId != null)
            {
                var result = _userService.UpdateUserProfile(mobileUser, _hostingEnvironment.ContentRootPath.ToString(), folderLocation);
                if (result == null)
                {
                    responseModel.Message = "Record Not Created";
                    return NoContent();
                }
                else
                {
                    if (result.ErrorMsg == "Email is Already Exist")
                    {
                        responseModel.Message = "Email is Already Exist";
                        responseModel.Result = null;
                        responseModel.IsSuccess = false;
                        return Ok(responseModel);
                    }
                    if (result.ProfilePhoto != null)
                    {
                        result.ProfilePhoto = $"{baseUsrl}/{folderLocation}/{result.UserId}/{result.ProfilePhoto}";
                    }
                    responseModel.Result = result;
                }
            }
            else
            {
                responseModel.IsSuccess = false;
                responseModel.Message = GetclientResponse.detail;
            }
            return Ok(responseModel);
        }
        #endregion

        #region ## Get Client GetACEclientIdExist API (GET: api/User/GetACEclientIdExist)

        //GET: api/User/GetUsers        
        [HttpGet("[action]")]
        public ActionResult GetACEclientId(string ACEAppointmentId)
        {
            _logger.LogInformation("GET: api/User/GetACEclientId  Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.GetACEclientId(ACEAppointmentId);

                responseModel.IsSuccess = true;
                responseModel.Result = result;

          
            return Ok(responseModel);

        }
        #endregion

        #region ## UpdateUserIs API (Post: api/MobileUser/UpdateUserIsLive)
        [HttpGet("[action]")]
        public ActionResult UpdateUserIsLive(int UserId,bool IsLive)
        {
           
            _logger.LogInformation("Post: api/User/UpdateUserIsLive Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.UpdateUserIsLive(UserId,IsLive);
            if (result <= 0)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "Record Not Updated";
            }
            else
                responseModel.Result = "Update";
            return Ok(responseModel);


        }
        #endregion

        #region ## CheckUrlisExpireOrNot API (Post: api/User/CheckUrlisExpireOrNot)
        [HttpGet("[action]")]
        public ActionResult CheckUrlisExpireOrNot(string UserId, string GUID)
        {

            _logger.LogInformation("Post: api/User/UpdateUserIs Invoke");
            ResponseModel responseModel = new ResponseModel();
          UserId = (UserId.Replace("œ", "+").Replace("Ž", "=").Replace("ô", "/"));
           UserId = EncryptionDecryptionHelper.DecryptString(UserId);
            GUID = (GUID.Replace("œ", "+").Replace("Ž", "=").Replace("ô", "/"));
            GUID = EncryptionDecryptionHelper.DecryptString(GUID);
            int UserIdinInt = Convert.ToInt32(UserId);
            var result = _userService.CheckUrlisExpireOrNot(UserIdinInt, GUID);
            if (result==null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "Record Not Updated";
            }
            else
            {
                responseModel.Message =result;
            }
               
            return Ok(responseModel);


        }
        #endregion

        #region ## IsConsentFormFilled API (Get: api/User/IsConsentFormFilled)
        [HttpGet("[action]")]
        public ActionResult IsConsentFormFilled(int UserId)
        {

            _logger.LogInformation("GET: api/User/IsConsentFormFilled Invoke");
            ResponseModel responseModel = new ResponseModel();
            var result = _userService.IsConsentFormFilled(UserId);

            responseModel.Result = result;
            return Ok(responseModel);


        }
        #endregion

        #region ## IsActiveUser API (Get: api/User/IsActiveUser)
        [HttpGet("[action]")]
        public ActionResult IsActiveUser(string UserId)
        {
            UserId = (UserId.Replace("œ", "+").Replace("Ž", "=").Replace("ô", "/"));
            UserId = EncryptionDecryptionHelper.DecryptString(UserId);
            _logger.LogInformation("GET: api/User/IsActiveUser Invoke");
            ResponseModel responseModel = new ResponseModel();
            int UserIdint = Convert.ToInt32(UserId);
            var result = _userService.IsActiveUser(UserIdint);

            responseModel.Result = result;
            return Ok(responseModel);


        }
        #endregion

    }
}