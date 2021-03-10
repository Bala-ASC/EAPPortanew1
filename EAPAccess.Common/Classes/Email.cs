using EAPAccess.Common.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;

namespace EAPAccess.Common.Classes
{
    public class Email: IEmail
    {
        
        private readonly ILogger<Email> _logger;
        public Email(ILogger<Email> logger)
        {
            _logger = logger;
           
        }
        public bool sendEmail(MailMessage objMailMessage, string email_from, string email_frmpwd, IConfiguration iconfiguration)
        {
            try
            {
                _logger.LogInformation("sendEmail BL is started in try");
                System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
                SmtpClient objSmptpClient = new SmtpClient();
                objSmptpClient.Host = iconfiguration["Host"];
                objSmptpClient.Port = int.Parse(iconfiguration["Port"].ToString());
                objSmptpClient.EnableSsl = bool.Parse(iconfiguration["EnableSSL"].ToString());
                objSmptpClient.UseDefaultCredentials = false;
                objSmptpClient.Credentials = new System.Net.NetworkCredential(email_from, email_frmpwd);
                objSmptpClient.Send(objMailMessage);
                return true;

            }
            catch (Exception ex)
            {
                _logger.LogError("sendEmail in catch", ex.Message);
                _logger.LogError("sendEmail in catch InnerException", ex.InnerException);
                return false;
                //Convert.ToInt32((ex.Message));
            }
        }
    }
}
