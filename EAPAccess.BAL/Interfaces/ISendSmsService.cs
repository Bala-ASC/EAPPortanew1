using EAPAccess.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.BAL.Interfaces
{
    public interface ISendSmsService
    {
        string SendSms(SendSMS message, IConfiguration iconfiguration);
    }
}
