using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;

namespace EAPAccess.Common.Interface
{
    public interface IEmail
    {
        bool sendEmail(MailMessage objMailMessage, string email_from, string email_frmpwd, IConfiguration iconfiguration);
    }
}
