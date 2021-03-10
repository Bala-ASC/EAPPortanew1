using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities
{
    public class SendSMS
    {
        public string originator { get; set; }
        public string recipient { get; set; }
        public string body { get; set; }
        public string routeId { get; set; }
        public string FullName { get; set; }

    }
}
