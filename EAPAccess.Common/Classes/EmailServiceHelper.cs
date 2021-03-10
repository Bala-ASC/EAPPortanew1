using System;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using EAPAccess.Common.Interface;
using EAPAccess.Entities;
using EAPAccess.Entities.ACEModels;
using EAPAccess.Entities.MobileModels;
using EAPAccess.Entities.Models;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace EAPAccess.Common.Classes
{
  public class EmailServiceHelper
    {
        #region ## Properties and Constructor Event 
        private IConfiguration _config;
        public  string _forgetpasswordurl;
        public string _verifiedCounsellorUrl;
        public  string _appurl;
        public  IEmail _email;
        public string _fromEmail;
        public string _vediochatdUrl;
        public string _chatdUrl;
        public string _vediochatdConUrl;
        public string _chatdConUrl;
        public string _consentFormUrl;
        public string _familyvediochaturl;
        public string _familychaturl;
        public string _faq;
        public string _useful;
        public string _service;
        public string _policy;
        public string _accessPortal;
        public string footerlink;
        public string footerlink1;
        public string regards;
        public string _riskemail;
        public string _fromName;
        public string _surveylink;
        public string baseUsrl;
        public string _loginUrl;
        public EmailServiceHelper(IConfiguration config, IEmail email)
        {
            //byte[] imageArray = System.IO.File.ReadAllBytes(@"'"+baseUsrl+"'/FooterImages/AndroidApp.png");
            //string base64ImageRepresentation = Convert.ToBase64String(imageArray);
            _config = config;
            _loginUrl= _config.GetSection("LoginPortalUrl").Value;
            _forgetpasswordurl = _config.GetSection("ForgetPasswordUrl").Value;
            _vediochatdUrl = _config.GetSection("VediochatdUrl").Value;
            _chatdUrl = _config.GetSection("ChatdUrl").Value;
            _vediochatdConUrl = _config.GetSection("VediochatdConUrl").Value;
            _chatdConUrl = _config.GetSection("ChatdUrlCon").Value;
            _familyvediochaturl = _config.GetSection("FamilyVediochatdUrl").Value;
            _familychaturl = _config.GetSection("FamilyChatdUrl").Value;
            _verifiedCounsellorUrl = _config.GetSection("VerifiedCounsellorUrl").Value;
            _consentFormUrl = _config.GetSection("ConsentFormUrl").Value;
            _appurl = _config.GetSection("AppUrl").Value;
            _email = email;
            _fromEmail = _config.GetSection("AzureFromEmail").Value;
            _faq= _config.GetSection("faq").Value;
            _useful = _config.GetSection("useful").Value;
            _service = _config.GetSection("service").Value;
            _policy = _config.GetSection("policy").Value;
            _accessPortal = _config.GetSection("accessPortal").Value;
            _riskemail = _config.GetSection("RiskFromEmail").Value;
            _fromName = _config.GetSection("FromName").Value;
            _surveylink = _config.GetSection("surveylink").Value;
            baseUsrl = _config.GetSection("baseUrl").GetSection("image").Value;
            //string imageurl = baseUsrl+"/FooterImages/AndroidApp.png";
            footerlink = $"For more information about our services see What to expect with <a href={ _service }>AccessEAP</a> | <a href={ _faq}>FAQ</a> | <a href={ _useful}>Useful Links</a> | <a href={ _policy }> Privacy Policy</a><br /><br /><br /><br /><a href='https://play.google.com/apps/testing/com.accesseap' style='margin-right: 20px';><img border = '0' alt = 'AndroidApp' src ='{ baseUsrl}/AndroidAppimg.png'  ></ a ><a href='https://testflight.apple.com/join/C8wuOxzQ'><img border = '0' alt = 'AppleApp' src ='{ baseUsrl}/AppleAppimg.png'  ></ a ><br /><br />";
            footerlink1 = $"For more information about our services see What to expect with <a href={ _service }>AccessEAP</a> | <a href={ _faq}>FAQ</a> | <a href={ _useful}>Useful Links</a> | <a href={ _policy }> Privacy Policy</a><br /><br /><br /><br />";
            regards = $"AccessEAP<br />Access Programs Australia Limited, trading as AccessEAP ABN 81 068 235 398<br />A: Level 8, 75 Castlereagh Street, Sydney, NSW, 2000, Australia<br />W: <a href={_accessPortal}>www.accesseap.com.au </a><br />T: 24-hour line: 1800 818 728";
        }
        #endregion

        #region ##AdminRegMessage
        public async Task AdminRegMessage(User result)
        {
            var body = new StringBuilder();
            result.Password = EncryptionDecryptionHelper.DecryptString(result.Password);
            body.AppendFormat("Hello " + result.FirstName + " , <br /><br />");
            body.Append(Environment.NewLine);
            body.AppendLine("You have been registered to access EAP Admin Portal <br />");

            body.AppendLine("Please find below your login details<br /><br />");
            string emailLink = $"<a href={ _appurl }>click here</a>";

            body.AppendLine($"URL to access EAP Admin: {emailLink}" + "<br />");
            body.AppendLine($"Username : {result.Email }<br />");
            body.AppendLine($"Password :  { result.Password}<br /> <br />");
            string EncryptedUserId = EncryptionDecryptionHelper.EncryptString(Convert.ToString(result.UserId));
            body.AppendLine($"Please note: we have provided auto generated password for login.Please change the Password  after first login.<br /><br />");
            body.AppendLine($"{regards}<br />");
            body.AppendLine($"{footerlink}");
            var apiKey = _config.GetSection("EmailSendGridKey").Value;
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(_fromEmail, _fromEmail),
                Subject = "EAP Admin portal",
                PlainTextContent = "",
                HtmlContent = body.ToString(),
            };
            msg.AddTo(new EmailAddress(result.Email));

            var response = await client.SendEmailAsync(msg);

        }
        #endregion

        #region ##ForgetPasswordMessage
        public async Task ForgetPasswordMail(User user)
        {
            var body = new StringBuilder();

            body.AppendFormat("Hi " + user.FirstName + ",<br /><br />");
            string EncryptedUserId = EncryptionDecryptionHelper.EncryptString(Convert.ToString(user.UserId));
            string EncodedURL = WebUtility.UrlEncode(EncryptedUserId.Replace("+", "œ").Replace("=", "Ž").Replace("/", "ô"));
            string EncryptedGUID = EncryptionDecryptionHelper.EncryptString(Convert.ToString(user.GUID));
            string EncodedGUID = WebUtility.UrlEncode(EncryptedGUID.Replace("+", "œ").Replace("=", "Ž").Replace("/", "ô"));
            string emailLink = $"<a style='max-width:200px;max-height:25px;text-decoration:none;display:inline-block;width:200px;height:25px;background: #1A55A6;padding: 10px 10px 10px 10px;text-align:center;border-radius:5px;color: white;font-weight: bold;line-height: 25px;' href={ _forgetpasswordurl + EncodedURL + '/' + EncodedGUID}>Reset your password</a>";
            // string emailLink = "<a class='MsoNormal' style='background-color:#1A55A6;color: #FFFFFF;border-radius: 2px;' href=https://eapaccessportal.azurewebsites.net/forgetpassword/FJdFA3%C5%93iMXAxfvbDiIonuQ%C5%BD%C5%BD/99fQc8jzzDzR2hvsV4Xj%C3%B4Bp1OnCtLl6CZvb6jFvxDAEqqWL1TOMVxb2U8X9BWxkE>Reset your password</a>";
            body.AppendLine($"You recently requested to reset the password for your AccessEAP account. Please click the button below to reset your password.<br /><br />");
            body.AppendLine($"{emailLink}<br /><br />");
            body.AppendLine($"This link is valid for the next 6 hours. If you did not request a password reset, please ignore this email. <br /><br />");
            //body.AppendLine("<a href=\'"+ _forgetpasswordurl + HttpUtility.UrlEncode(EncryptedUserId) + "\">Change Password</a>");   
            body.AppendLine($"{regards}<br />");
            body.AppendLine($"{footerlink}");
            var apiKey = _config.GetSection("EmailSendGridKey").Value;


            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(_fromEmail, _fromName),
                Subject = "Your AccessEAP Password Reset Request",
                PlainTextContent = "",
                HtmlContent = body.ToString(),
            };
            msg.AddTo(new EmailAddress(user.Email));

            var response = await client.SendEmailAsync(msg);

        }
        #endregion

      
        public void localForgetMessage(User User)
        {
            string email_from = _config["FromEmail"];
            string email_to = User.Email;
            string email_frmpwd = _config["FromEmailPwd"];

            MailMessage objMailMessage = new MailMessage();
            string EncryptedUserId = EncryptionDecryptionHelper.EncryptString(Convert.ToString(User.UserId));
            objMailMessage.To.Add(new MailAddress(email_to));
            objMailMessage.From = new MailAddress(email_from, "EAP");
            objMailMessage.Subject = "EAP";
            objMailMessage.IsBodyHtml = true;
            var body = new StringBuilder();
            body.AppendFormat("Hello " + User.FirstName + " ,<br /><br />");
            string emailLink = $"<a href={ _forgetpasswordurl + HttpUtility.UrlEncode(EncryptedUserId) }>click here</a>";
            body.AppendLine($"Please {emailLink} to change your password.<br /><br />");
            body.AppendLine($"Regards, <br />");
            body.AppendLine($"EAP Admin <br />");
            objMailMessage.Body = body.ToString();
            objMailMessage.Priority = MailPriority.High;
            _email.sendEmail(objMailMessage, email_from, email_frmpwd, _config);

        }
        public static async Task Execute()
        {

            try
            {
                var apiKey = System.Environment.GetEnvironmentVariable("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");

                var client = new SendGridClient("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");
                var msg = new SendGridMessage()
                {
                    From = new EmailAddress("imtiyaz.a@aspiresoftwareconsultancy.com", "ASP"),
                    Subject = "Hello World EAP Admin portal",
                    PlainTextContent = "Hello, Email!",
                    HtmlContent = "<strong>Hello, Email!</strong>"
                };
                msg.AddTo(new EmailAddress("sunidhiligade@gmail.com", "Test User"));

                var response = await client.SendEmailAsync(msg);
            }
            catch (Exception ex)
            {

            }

        }

        #region ##SignUpVerificationEmail
        public async Task SignUpVerificationEmail(User user)
        {
            var body = new StringBuilder();

            body.AppendFormat("Thanks for joining us, " + user.FirstName + ".<br /><br />");
            string EncryptedUserId = EncryptionDecryptionHelper.EncryptString(Convert.ToString(user.UserId));
            string EncodedURL = WebUtility.UrlEncode(EncryptedUserId.Replace("+", "œ").Replace("=", "Ž").Replace("/", "ô"));
           
            string emailLink = $"<a style='max-width:200px;max-height:25px;text-decoration:none;display:inline-block;width:200px;height:25px;background: #1A55A6;padding: 10px 10px 10px 10px;text-align:center;border-radius:5px;color: white;font-weight: bold;line-height: 25px;' href={ _verifiedCounsellorUrl + EncodedURL }>Verify email</a>";
            body.AppendLine($"Please click the button below to confirm your email address and verify your account. Your account will give you access to our booking system and AccessChat service, as well as access to resources and check-ins to support your wellbeing and mental health through our app.<br /><br />");
            //body.AppendLine("<a href=\'"+ _forgetpasswordurl + HttpUtility.UrlEncode(EncryptedUserId) + "\">Change Password</a>");   
            body.AppendLine($"{emailLink}<br /><br />");
            body.AppendLine($"{regards}<br />");
            body.AppendLine($"{footerlink}");
            var apiKey = _config.GetSection("EmailSendGridKey").Value;


            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(_fromEmail,_fromName),
                Subject = user.FirstName+", "+"please confirm your email",
                PlainTextContent = "",
                HtmlContent = body.ToString(),
            };
            msg.AddTo(new EmailAddress(user.Email));

            var response = await client.SendEmailAsync(msg);

        }
        #endregion


        #region ## SendMailAppointmentBooking
        public async Task SendMailAppointmentBooking(CousollerandClientDetail users)
        {
            var body = new StringBuilder();
            //Client//
            body.AppendFormat("Dear  " + users.ClientName + ",<br /><br />");
            body.AppendFormat($"Thank you for booking an appointment with us. This email confirms the details of your counselling session.<br />");
            // body.AppendLine($"Your "+users.ActivityType+"  appointment is scheduled for " + users.startDateInString + "  " + users.StartTime + " with " +users.CounsollerName+".<br /><br />");
            //body.AppendLine("<a href=\'"+ _forgetpasswordurl + HttpUtility.UrlEncode(EncryptedUserId) + "\">Change Password</a>");   
            string logiPortal = $"<a href={_loginUrl}>click here</a>";
            if (users.ActivityType== "Scheduled Chat")
            {
                string emailLink = $"<a href={ _chatdUrl + users.ACEAppointmentId }>click here</a>";
             
                body.AppendLine($"Date: " + users.startDateInString+ "<br />");
                body.AppendLine($"Time: " + users.StartTime+ "<br />");
                body.AppendLine($"Modality: AccessChat<br />");
                body.AppendLine($"Counsellor: " + users.CounsollerName + "<br />");
                body.AppendLine($"Please note, if your appointment is via Video or AccessChat, you will need to log into our portal here {emailLink} to join your session.<br />If you need to re-schedule or cancel your appointment/s please do so with at least 24 hours’ notice(business days), otherwise your session will count towards your session allowance.Counselling is a very personal experience and the counsellor plays an important role.If you would prefer to talk to a different counsellor, you are welcome to search for someone more suitable to your needs for your next appointment. <br />");
                body.AppendLine($"If you are unable to attend this appointment, please login to the booking portal here {logiPortal} and cancel your appointment.<br /><br />");

            }
            if (users.ActivityType == "Video")
            {
                string emailLink = $"<a href={ _vediochatdUrl + users.ACEAppointmentId }>click here</a>";
                body.AppendLine($"Date: " + users.startDateInString + "<br />");
                body.AppendLine($"Time: " + users.StartTime + "<br />");
                body.AppendLine($"Modality: " + users.ActivityType + "<br />");
                body.AppendLine($"Counsellor: " + users.CounsollerName + "<br />");
                body.AppendLine($"Please note, if your appointment is via Video or AccessChat, you will need to log into our portal here {emailLink} to join your session. <br />If you need to re-schedule or cancel your appointment/s please do so with at least 24 hours’ notice(business days), otherwise your session will count towards your session allowance.Counselling is a very personal experience and the counsellor plays an important role.If you would prefer to talk to a different counsellor, you are welcome to search for someone more suitable to your needs for your next appointment.<br />");
                body.AppendLine($"If you are unable to attend this appointment, please login to the booking portal here {logiPortal} and cancel your appointment.<br /><br />");

            }
            if (users.ActivityType== "Face to Face")
            {
                body.AppendLine($"Date: "+users.startDateInString + "<br />");
                body.AppendLine($"Time: " + users.StartTime + "<br />");
                body.AppendLine($"Location: " +users.Location+ "<br />");
                body.AppendLine($"Counsellor: " + users.CounsollerName+"<br />");
                body.AppendLine($"If you need to re-schedule or cancel your appointment/s please do so with at least 24 hours’ notice (business days), otherwise your session will count towards your session allowance. Counselling is a very personal experience and the counsellor plays an important role. If you would prefer to talk to a different counsellor, you are welcome to search for someone more suitable to your needs for your next appointment.<br /><br />");
            }
            if (users.ActivityType == "Telephone")
            {
                body.AppendLine($"Date: " + users.startDateInString + "<br />");
                body.AppendLine($"Time: " + users.StartTime + "<br />");
                body.AppendLine($"Modality: " + users.ActivityType + "<br />");
                body.AppendLine($"Counsellor: " + users.CounsollerName + "<br />");
                body.AppendLine($"Please note, For Telephone bookings, the Counsellor will call you at the appointment time-we recommend ensuring that your phone is charged and you are in a quiet place where you can speak freely.<br />If you need to re-schedule or cancel your appointment/s please do so with at least 24 hours’ notice(business days), otherwise your session will count towards your session allowance.Counselling is a very personal experience and the counsellor plays an important role.If you would prefer to talk to a different counsellor, you are welcome to search for someone more suitable to your needs for your next appointment.<br />");
                body.AppendLine($"If you are unable to attend this appointment, please login to the booking portal here {logiPortal} and cancel your appointment.<br /><br />");

            }
            body.AppendLine($"{regards}<br />");
            body.AppendLine($"{footerlink}");

            var body1 = new StringBuilder();
            body1.AppendFormat("Dear " + users.CounsollerName + ",<br /><br />");
            //body1.AppendFormat($"Thank you for booking an appointment with us. This email confirms the details of your client session.");
            if (users.IsForFamilyMember)
            {
                body1.AppendLine($"Your " + users.ActivityType + "  appointment is scheduled for " + users.startDateInString + "  " + users.StartTime + " with " + users.FMFirstName + ".<br /><br />");
            }
            else
            {
                body1.AppendLine($"Your " + users.ActivityType + "  appointment is scheduled for " + users.startDateInString + "  " + users.StartTime + " with " + users.ClientName + ".<br /><br />");
            }
            if (users.ActivityType == "Scheduled Chat")
            {
                string emailLink = $"<a href={ _chatdConUrl + users.ACEAppointmentId }>click here</a>";
                body1.AppendLine($"Date: " + users.startDateInString + "<br />");
                body1.AppendLine($"Time: " + users.StartTime + "<br />");
                body1.AppendLine($"Modality: AccessChat<br /><br />");
                body1.AppendLine($"Please {emailLink}  to chat.<br /><br />");
            }
            if (users.ActivityType == "Video")
            {
                string emailLink = $"<a href={ _vediochatdConUrl + users.ACEAppointmentId }>click here</a>";
                body1.AppendLine($"Date: " + users.startDateInString + "<br />");
                body1.AppendLine($"Time: " + users.StartTime + "<br />");
                body1.AppendLine($"Modality: " + users.ActivityType + "<br /><br />");
                body1.AppendLine($"Please {emailLink}  to video chat.<br /><br />");
            }
            if (users.ActivityType == "Face to Face")
            {
                body1.AppendLine($"Date: " + users.startDateInString + "<br />");
                body1.AppendLine($"Time: " + users.StartTime + "<br />");
                body1.AppendLine($"Location: " +users.Location+ "<br />");
                if (users.IsForFamilyMember)
                    body1.AppendLine($"Client: " + users.FMFirstName + "<br /><br />");
                else
                    body1.AppendLine($"Client: " + users.ClientName + "<br /><br />");
               // body1.AppendLine($"If you need to re-schedule or cancel your appointment/s please do so with at least 24 hours’ notice (business days), otherwise your session will count towards your session allowance. Counselling is a very personal experience and the counsellor plays an important role. If you would prefer to talk to a different counsellor, you are welcome to search for someone more suitable to your needs for your next appointment.<br /><br />");
            }
            //body.AppendLine("<a href=\'"+ _forgetpasswordurl + HttpUtility.UrlEncode(EncryptedUserId) + "\">Change Password</a>");   
            body1.AppendLine($"{regards}<br />");
            body1.AppendLine($"{footerlink}");
            var body2 = new StringBuilder();
            if (users.IsForFamilyMember)
            {
              
                body2.AppendFormat("Dear " + users.FMFirstName + ",<br /><br />");
                body2.AppendLine($"Thank you for booking an appointment with us. This email confirms the details of your counselling session.<br />");
                string EncryptedUserId = EncryptionDecryptionHelper.EncryptString(Convert.ToString(users.UserId));
                string EncodedURL = WebUtility.UrlEncode(EncryptedUserId.Replace("+", "œ").Replace("=", "Ž").Replace("/", "ô"));
                string EncriptedAppointmentId = EncryptionDecryptionHelper.EncryptString(Convert.ToString(users.AppointmentId));
                string EncodedAppointmentIdURL = WebUtility.UrlEncode(EncriptedAppointmentId.Replace("+", "œ").Replace("=", "Ž").Replace("/", "ô"));
                string emailLink1 = $"<a href={ _consentFormUrl + EncodedURL + '/' + EncodedAppointmentIdURL + '/' + users.FMFullName.Replace(" ", "%20")}>click on</a>";

                if (users.ActivityType == "Scheduled Chat")
                {
                    string emailLink = $"<a href={ _familychaturl + users.ACEAppointmentId }>click here</a>";
                    body2.AppendLine($"Date: " + users.startDateInString + "<br />");
                    body2.AppendLine($"Time: " + users.StartTime + "<br />");
                    body2.AppendLine($"Modality: AccessChat<br />");
                    body2.AppendLine($"Counsellor: " + users.CounsollerName + "<br />");
                    body2.AppendLine($"Please {emailLink1} to complete your consent form before your appointment date. <br /> ");
                    body2.AppendLine($"Please note, if your appointment is via Video or AccessChat, you will need to log into our portal here {emailLink} to join your session.<br />If you need to re-schedule or cancel your appointment/s please do so with at least 24 hours’ notice(business days), otherwise your session will count towards your session allowance.Counselling is a very personal experience and the counsellor plays an important role.If you would prefer to talk to a different counsellor, you are welcome to search for someone more suitable to your needs for your next appointment.<br />");
                    body2.AppendLine($"If you are unable to attend this appointment, please login to the booking portal here {logiPortal} and cancel your appointment.<br /><br />");

                }
                if (users.ActivityType == "Video")
                {
                    string emailLink = $"<a href={ _familyvediochaturl + users.ACEAppointmentId }>click here</a>";
                    body2.AppendLine($"Date: " + users.startDateInString + "<br />");
                    body2.AppendLine($"Time: " + users.StartTime + "<br />");
                    body2.AppendLine($"Modality: " + users.ActivityType + "<br />");
                    body2.AppendLine($"Counsellor: " + users.CounsollerName + "<br />");
                    body2.AppendLine($"Please {emailLink1} to complete your consent form before your appointment date.<br />");
                    body2.AppendLine($"Please note, if your appointment is via Video or AccessChat, you will need to log into our portal here  {emailLink} to join your session. <br />If you need to re-schedule or cancel your appointment/s please do so with at least 24 hours’ notice(business days), otherwise your session will count towards your session allowance.Counselling is a very personal experience and the counsellor plays an important role.If you would prefer to talk to a different counsellor, you are welcome to search for someone more suitable to your needs for your next appointment.<br />");
                    body2.AppendLine($"If you are unable to attend this appointment, please login to the booking portal here {logiPortal} and cancel your appointment.<br /><br />");
                }
                if (users.ActivityType == "Face to Face")
                {
                    body2.AppendLine($"Date: " + users.startDateInString + "<br />");
                    body2.AppendLine($"Time: " + users.StartTime + "<br />");
                    body2.AppendLine($"Location: " + users.Location + "<br />");
                    body2.AppendLine($"Counsellor: " + users.CounsollerName + "<br />");
                    body2.AppendLine($"Please {emailLink1} to complete your consent form before your appointment date.<br />");
                    body2.AppendLine($"If you need to re-schedule or cancel your appointment/s please do so with at least 24 hours’ notice (business days), otherwise your session will count towards your session allowance. Counselling is a very personal experience and the counsellor plays an important role. If you would prefer to talk to a different counsellor, you are welcome to search for someone more suitable to your needs for your next appointment.<br /><br />");
                }
                if (users.ActivityType == "Telephone")
                {
                    body2.AppendLine($"Date: " + users.startDateInString + "<br />");
                    body2.AppendLine($"Time: " + users.StartTime + "<br />");
                    body2.AppendLine($"Modality: " + users.ActivityType + "<br />");
                    body2.AppendLine($"Counsellor: " + users.CounsollerName + "<br />");
                    body2.AppendLine($"Please {emailLink1} to complete your consent form before your appointment date.<br />");
                    body2.AppendLine($"Please note, For Telephone bookings, the Counsellor will call you at the appointment time-we recommend ensuring that your phone is charged and you are in a quiet place where you can speak freely.<br />If you need to re-schedule or cancel your appointment/s please do so with at least 24 hours’ notice(business days), otherwise your session will count towards your session allowance.Counselling is a very personal experience and the counsellor plays an important role.If you would prefer to talk to a different counsellor, you are welcome to search for someone more suitable to your needs for your next appointment.<br />");
                    body2.AppendLine($"If you are unable to attend this appointment, please login to the booking portal here {logiPortal} and cancel your appointment.<br /><br />");

                }
                //body2.AppendLine("<a href=\'" + _consentFormUrl + HttpUtility.UrlEncode(EncryptedUserId) +"/"+ HttpUtility.UrlEncode(EncodedAppointmentIdURL) + "\">click here to fill Consent Form.</a>");
                body2.AppendLine($"{regards}<br />");
                body2.AppendLine($"{footerlink}");
            }
            var apiKey = _config.GetSection("EmailSendGridKey").Value;


            var client = new SendGridClient(apiKey);
            if (!users.IsForFamilyMember)
            {
                var msg = new SendGridMessage()
                {
                    From = new EmailAddress(_fromEmail,_fromName),
                    Subject = users.ClientName+", "+"confirmation of your AccessEAP appointment",
                    PlainTextContent = "",
                    HtmlContent = body.ToString(),
                };
                msg.AddTo(new EmailAddress(users.ClientEmailId));
                var response = await client.SendEmailAsync(msg);
            }
            var msg1 = new SendGridMessage()
            {
                From = new EmailAddress(_fromEmail,_fromName),
                Subject = users.CounsollerName + " " + "confirmation of your AccessEAP appointment",
                PlainTextContent = "",
                HtmlContent = body1.ToString(),
            };
            msg1.AddTo(new EmailAddress(users.CounsollerEmailId));

            if (users.IsForFamilyMember)
            {
                var msg2 = new SendGridMessage()
                {
                    From = new EmailAddress(_fromEmail,_fromName),
                    Subject = users.FMFirstName + ", " + "confirmation of your AccessEAP appointment",
                    PlainTextContent = "",
                    HtmlContent = body2.ToString(),
                };
                msg2.AddTo(new EmailAddress(users.FMEmail));
                var response2 = await client.SendEmailAsync(msg2);
            }

           
            var response1 = await client.SendEmailAsync(msg1);

        }
        #endregion

        #region ## SendMailCancelAppointmentBooking
        public async Task SendMailCancelAppointmentBooking(CousollerandClientDetail users)
        {
            var body = new StringBuilder();
            //client
            body.AppendFormat("Hi " + users.ClientName + ",<br /><br />");

            body.AppendLine($"Your " + users.ActivityType + "  appointment is cancelled for " + users.startDateInString +"  "+users.StartTime+ " with " + users.CounsollerName + ".<br /><br />");
            //body.AppendLine("<a href=\'"+ _forgetpasswordurl + HttpUtility.UrlEncode(EncryptedUserId) + "\">Change Password</a>");   
            body.AppendLine($"{regards}<br />");
            body.AppendLine($"{footerlink}");
            var body1 = new StringBuilder();
            body1.AppendFormat("Hi " + users.CounsollerName + ",<br /><br />");
            if (users.IsForFamilyMember)
            {
                body1.AppendLine($"Your " + users.ActivityType + "  appointment is cancelled for " + users.startDateInString + "  " + users.StartTime + " with " + users.FMFirstName + ".<br /><br />");
            }
            else
            {
                body1.AppendLine($"Your " + users.ActivityType + "  appointment is cancelled for " + users.startDateInString + "  " + users.StartTime + " with " + users.ClientName + ".<br /><br />");
            }
            //body.AppendLine("<a href=\'"+ _forgetpasswordurl + HttpUtility.UrlEncode(EncryptedUserId) + "\">Change Password</a>");   
            body1.AppendLine($"{regards}<br />");
            body1.AppendLine($"{footerlink}");

            var body2 = new StringBuilder();
            if (users.IsForFamilyMember)
            {
                body2.AppendFormat("Hi " + users.FMFirstName + ",<br /><br />");

                body2.AppendLine($"Your " + users.ActivityType + "  appointment is cancelled for " + users.startDateInString + "  " + users.StartTime + " with " + users.CounsollerName + ".<br /><br />");
                //body.AppendLine("<a href=\'"+ _forgetpasswordurl + HttpUtility.UrlEncode(EncryptedUserId) + "\">Change Password</a>");   
                body2.AppendLine($"{regards}<br />");
                body2.AppendLine($"{footerlink}");
            }
            var apiKey = _config.GetSection("EmailSendGridKey").Value;


            var client = new SendGridClient(apiKey);
            if (!users.IsForFamilyMember)
            {
                var msg = new SendGridMessage()
                {
                    From = new EmailAddress(_fromEmail, _fromName),
                    Subject = "Appointment Cancelled",
                    PlainTextContent = "",
                    HtmlContent = body.ToString(),
                };
                msg.AddTo(new EmailAddress(users.ClientEmailId));
                var response = await client.SendEmailAsync(msg);
            }
            var msg1 = new SendGridMessage()
            {
                From = new EmailAddress(_fromEmail, _fromName),
                Subject = "Appointment Cancelled",
                PlainTextContent = "",
                HtmlContent = body1.ToString(),
            };
            msg1.AddTo(new EmailAddress(users.CounsollerEmailId));

            if (users.IsForFamilyMember)
            {
                var msg2 = new SendGridMessage()
                {
                    From = new EmailAddress(_fromEmail, _fromName),
                    Subject = "Appointment Cancelled",
                    PlainTextContent = "",
                    HtmlContent = body2.ToString(),
                };
                msg2.AddTo(new EmailAddress(users.FMEmail));
                var response2 = await client.SendEmailAsync(msg2);
            }

            
            var response1 = await client.SendEmailAsync(msg1);


        }

        #endregion
        public async Task SendEmailForInstantchat(ClsInstantchatyes result)
        {
           // string email_from = _config["FromEmail"];
          string email_to = "dutycounsellor@accesseap.com.au";
           //string email_to = "aspiresoftwareconsultancy.bala@gmail.com";
          //  string email_to = "asc.eapmobile@gmail.com";
            // string email_to = "sunidhiligade@gmail.com";
            var body = new StringBuilder();
            body.AppendFormat("Dear Duty Counsellors,<br /><br />");
            body.AppendLine($"Please be advised that a client accessing the AccessChat service has identified that they are having thoughts of suicide of self-harm. Please reach out to them as soon as possible to provide support.<br />");
            body.AppendLine($""+result.FullName+ "<br />");
            body.AppendLine($""+result.Phone + "<br />");
            if (result.City == null || result.City == "")
                body.AppendLine($"" + result.State + "<br />");
            else
                body.AppendLine($"" + result.City + ", " + result.State + "<br />");
            body.AppendLine($"The client has been advised to contact emergency services and/or Lifeline, however reaching out to them is part of our duty of care and our drive to look after people in need.<br />");
            body.AppendLine($"This is an automated message from the AccessChat system. Please do not reply.<br /><br />");
            body.AppendLine($"{regards}<br />");
            body.AppendLine($"{footerlink}");
            //body.AppendLine($"<img src='C:\\Users\\aspire\\Desktop\IMGBIN_android-google-play-iphone-app-store-png_6dzJ0xzB.png' alt='Girl in a jacket' width='500' height='600'>");
            var apiKey = _config.GetSection("EmailSendGridKey").Value;


            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(_riskemail, "AccessEAP Chat System (do not reply)"),
                Subject = "ALERT: Please contact an at-risk client",
                PlainTextContent = "",
                HtmlContent = body.ToString(),
            };
            msg.AddTo(new EmailAddress(email_to));

            var response = await client.SendEmailAsync(msg);

        }

        #region ## SendMailReminder
        public async Task SendMailReminder(CousollerandClientDetail users)
        {
            var body = new StringBuilder();

            body.AppendFormat(users.ClientName + ", this is a friendly reminder of your upcoming appointment today.<br /><br />");

          
            //body.AppendLine("<a href=\'"+ _forgetpasswordurl + HttpUtility.UrlEncode(EncryptedUserId) + "\">Change Password</a>");   
            if (users.ActivityType == "Scheduled Chat")
            {
                string emailLink = $"<a href={ _chatdUrl + users.ACEAppointmentId }>click here</a>";
                body.AppendLine($"Your appointment is booked at " + users.StartTime + " with " + users.CounsollerName + " via AccessChat.<br /><br />");
                body.AppendLine($"Please note, if your appointment is via Video or AccessChat, you will need to log into our portal {emailLink} to join your session. <br /><br />");
                body.AppendLine($"If you are unable to attend this appointment, please login to the booking portal  and cancel your appointment. As this is less than 24 hours before your appointment, this session will be deducted from your session allowance. We appreciate you letting us know as a courtesy to your counsellor.<br /><br />");

                
            }
            if (users.ActivityType == "Video")
            {
                string emailLink = $"<a href={ _vediochatdUrl + users.ACEAppointmentId }>click here</a>";
                body.AppendLine($"Your appointment is booked at " + users.StartTime + " with " + users.CounsollerName + " via Video.<br /><br />");
                body.AppendLine($"Please note, if your appointment is via Video or AccessChat, you will need to log into our portal {emailLink} to join your session. <br /><br />");
                body.AppendLine($"If you are unable to attend this appointment, please login to the booking portal  and cancel your appointment. As this is less than 24 hours before your appointment, this session will be deducted from your session allowance. We appreciate you letting us know as a courtesy to your counsellor.<br /><br />");

            }
            if(users.ActivityType== "Telephone")
            {
                body.AppendLine($"Your appointment is booked at " + users.StartTime + " with " + users.CounsollerName + " via Telephone.<br /><br />");
                body.AppendLine($"Please note, For Telephone bookings, the Counsellor will call you at the appointment time. We recommend ensuring that your phone is charged and you are in a quiet place where you can speak freely. <br /><br />");
                body.AppendLine($"If you are unable to attend this appointment, please login to the booking portal  and cancel your appointment. As this is less than 24 hours before your appointment, this session will be deducted from your session allowance. We appreciate you letting us know as a courtesy to your counsellor.<br /><br />");

            }
            if (users.ActivityType== "Face to Face")
            {
                body.AppendLine($"Your appointment is booked at " + users.StartTime + " with " + users.CounsollerName + ". The location of your appointment is "+users.Location+".<br /><br />");
                body.AppendLine($"If you are unable to attend this appointment, please login to the booking portal  and cancel your appointment. As this is less than 24 hours before your appointment, this session will be deducted from your session allowance. We appreciate you letting us know as a courtesy to your counsellor.<br /><br />");
            }

            body.AppendLine($"{regards}<br />");
            body.AppendLine($"{footerlink}");
            var body1 = new StringBuilder();
            body1.AppendFormat("Hi " + users.CounsollerName + ",<br /><br />");
            if (users.IsForFamilyMember)
            {
                body1.AppendLine($"Gentle reminder for Your " + users.ActivityType + "  appointment is scheduled for " + users.startDateInString + "  " + users.StartTime + " with " + users.FMFirstName + ".<br /><br />");
            }
            else
            {
                body1.AppendLine($"Your " + users.ActivityType + "  appointment is scheduled for " + users.startDateInString + "  " + users.StartTime + " with " + users.ClientName + ".<br /><br />");
            }
            if (users.ActivityType == "Scheduled Chat")
            {
                string emailLink = $"<a href={ _chatdConUrl + users.ACEAppointmentId }>click here</a>";

                body1.AppendLine($"Please {emailLink}  to chat.<br /><br />");
            }
            if (users.ActivityType == "Video")
            {
                string emailLink = $"<a href={ _vediochatdConUrl + users.ACEAppointmentId }>click here</a>";

                body1.AppendLine($"Please {emailLink}  to video chat.<br /><br />");
            }

            //body.AppendLine("<a href=\'"+ _forgetpasswordurl + HttpUtility.UrlEncode(EncryptedUserId) + "\">Change Password</a>");   
            body1.AppendLine($"{regards}<br />");
            body1.AppendLine($"{footerlink}");
            var body2 = new StringBuilder();
            body2.AppendFormat( users.FMFirstName + ", this is a friendly reminder of your upcoming appointment today.<br /><br />");
            string EncryptedUserId = EncryptionDecryptionHelper.EncryptString(Convert.ToString(users.UserId));
            string EncodedURL = WebUtility.UrlEncode(EncryptedUserId.Replace("+", "œ").Replace("=", "Ž").Replace("/", "ô"));
            string EncriptedAppointmentId = EncryptionDecryptionHelper.EncryptString(Convert.ToString(users.AppointmentId));
            string EncodedAppointmentIdURL = WebUtility.UrlEncode(EncriptedAppointmentId.Replace("+", "œ").Replace("=", "Ž").Replace("/", "ô"));
            if (!users.IsConsentFormFilled)
            {
                string emailLink1 = $"<a href={ _consentFormUrl + EncodedURL + '/' + EncodedAppointmentIdURL + '/' + users.FMFullName.Replace(" ", "%20") }>click on</a>";
                body2.AppendLine($"Please {emailLink1} to complete your consent form before your appointment date.<br /><br />");
            }

            //body2.AppendLine($"Gentle reminder for Your " + users.ActivityType + "  appointment is scheduled for " + users.startDateInString + "  " + users.StartTime + " with " + users.CounsollerName + ".<br /><br />");
            if (users.ActivityType == "Scheduled Chat")
            {
                string emailLink = $"<a href={ _familychaturl + users.ACEAppointmentId }>click here</a>";
                body2.AppendLine($"Your appointment is booked at " + users.StartTime + " with " + users.CounsollerName + " via AccessChat.<br /><br />");
                body2.AppendLine($"Please note, if your appointment is via Video or AccessChat, you will need to log into our portal {emailLink} to join your session. <br /><br />");
                body2.AppendLine($"If you are unable to attend this appointment, please login to the booking portal  and cancel your appointment.<br /><br />");
            }
            if (users.ActivityType == "Video")
            {
                string emailLink = $"<a href={ _familyvediochaturl + users.ACEAppointmentId }>click here</a>";
                body2.AppendLine($"Your appointment is booked at " + users.StartTime + " with " + users.CounsollerName + " via Video.<br /><br />");
                body2.AppendLine($"Please note, if your appointment is via Video or AccessChat, you will need to log into our portal {emailLink} to join your session. <br /><br />");
                body2.AppendLine($"If you are unable to attend this appointment, please login to the booking portal  and cancel your appointment.<br /><br />");

            }
            if (users.ActivityType == "Telephone")
            {
                body2.AppendLine($"Your appointment is booked at " + users.StartTime + " with " + users.CounsollerName + " via Telephone.<br /><br />");
                body2.AppendLine($"Please note, For Telephone bookings, the Counsellor will call you at the appointment time. We recommend ensuring that your phone is charged and you are in a quiet place where you can speak freely. <br /><br />");
                body2.AppendLine($"If you are unable to attend this appointment, please login to the booking portal  and cancel your appointment.<br /><br />");

            }
            if (users.ActivityType == "Face to Face")
            {
                body2.AppendLine($"Your appointment is booked at " + users.StartTime + " with " + users.CounsollerName + ". The location of your appointment is "+users.Location+".<br /><br />");
                body2.AppendLine($"If you are unable to attend this appointment, please login to the booking portal and cancel your appointment. As this is less than 24 hours before your appointment, this session will be deducted from your session allowance. We appreciate you letting us know as a courtesy to your counsellor.<br /><br />");
            }


            body2.AppendLine($"{regards}<br />");
            body2.AppendLine($"{footerlink}");

            var apiKey = _config.GetSection("EmailSendGridKey").Value;


            var client = new SendGridClient(apiKey);
            if (!users.IsForFamilyMember)
            {
                var msg = new SendGridMessage()
                {
                    From = new EmailAddress(_fromEmail, _fromName),
                    Subject =users.ClientName+", reminder of your AccessEAP appointment",
                    PlainTextContent = "",
                    HtmlContent = body.ToString(),
                };
                msg.AddTo(new EmailAddress(users.ClientEmailId));
                var response = await client.SendEmailAsync(msg);
            }
            var msg1 = new SendGridMessage()
            {
                From = new EmailAddress(_fromEmail, _fromName),
                Subject = users.CounsollerName+", reminder of your AccessEAP appointment",
                PlainTextContent = "",
                HtmlContent = body1.ToString(),
            };
            msg1.AddTo(new EmailAddress(users.CounsollerEmailId));

            if (users.IsForFamilyMember)
            {
                var msg2 = new SendGridMessage()
                {
                    From = new EmailAddress(_fromEmail, _fromName),
                    Subject = users.FMFirstName+", reminder of your AccessEAP appointment",
                    PlainTextContent = "",
                    HtmlContent = body2.ToString(),
                };
                msg2.AddTo(new EmailAddress(users.FMEmail));
                var response2 = await client.SendEmailAsync(msg2);
            }


            var response1 = await client.SendEmailAsync(msg1);

        }
        #endregion
        #region ##send email appointment survey
        public async Task SendEmailappointmentsurvey(CousollerandClientDetail users)
        {
            var body = new StringBuilder();
            if(users.IsForFamilyMember)
            {
                body.AppendFormat("Hi "+users.FMFirstName+",<br /><br />");
            }
            else
            {
                body.AppendFormat("Hi " + users.ClientName + ",<br /><br />");
            }
            string emailLink = $"<a href={_surveylink}>here</a>";
            body.AppendLine($"Thank you for using our AccessChat service. As a new service at AccessEAP, we would appreciate hearing from you about your experience using instant messaging for your counselling session.You’re invited to complete our short survey {emailLink}. Your responses will be anonymous and used to improve the service. Thank you for your time in sharing your thoughts with us. <br /><br />");
            
            body.AppendLine($"{regards}<br />");
            body.AppendLine($"{footerlink}");
            //body.AppendLine($"<img src='C:\\Users\\aspire\\Desktop\IMGBIN_android-google-play-iphone-app-store-png_6dzJ0xzB.png' alt='Girl in a jacket' width='500' height='600'>");
            var apiKey = _config.GetSection("EmailSendGridKey").Value;


            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(_fromEmail, _fromName),
                //Subject = ",you’re invited to share your thoughts about AccessChat",
                PlainTextContent = "",
                HtmlContent = body.ToString(),
            };
          
            if (users.IsForFamilyMember)
            {
                msg.Subject = users.FMFirstName + ", you’re invited to share your thoughts about AccessChat";
                msg.AddTo(new EmailAddress(users.FMEmail));
            }
            else
            {
                msg.Subject = users.ClientName + ", you’re invited to share your thoughts about AccessChat";
                msg.AddTo(new EmailAddress(users.ClientEmailId));
            }

            var response = await client.SendEmailAsync(msg);

        }
        #endregion
    }
}
