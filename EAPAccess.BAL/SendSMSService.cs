using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using EAPAccess.Entities;
using MSXML2;
using System.Text;
using EAPAccess.BAL.Interfaces;
using Microsoft.Extensions.Logging;



using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Xml.Linq;
using Newtonsoft.Json;
using System.Xml;

namespace EAPAccess.BAL
{
    public class SendSmsBL:ISendSmsService
    {
        public ILogger _logger;
        public SendSmsBL(ILogger<SendSmsBL> logger)
        {
            _logger = logger;
        }
        public string SendSms(SendSMS obj, IConfiguration iconfiguration)
        {
            string response =sendSmsWhenAppointentCancel(obj, iconfiguration);
            return response;
        }

        private string sendSmsWhenAppointentCancel(SendSMS obj, IConfiguration iconfiguration)
        {
            // SMS Data
            
            string sms_frmpwd = iconfiguration["SmsPassword"];
            string smsUserName = iconfiguration["SmsUserName"];
            string orig = iconfiguration["Originator"];
            string routeID = iconfiguration["RouteId"];

            string username = smsUserName +':'+ sms_frmpwd; 
            string rcpt = obj.recipient;
            string body = obj.body;

           
            // Make XML message
            XElement xmlMsg = new XElement("message");
            xmlMsg.Add(new XElement("originator", orig));
            xmlMsg.Add(new XElement("recipient", rcpt));
            xmlMsg.Add(new XElement("body", body));
            xmlMsg.Add(new XElement("routeId", routeID));
            // Get XML String
            String data = xmlMsg.ToString();

            Console.WriteLine("Sending " + data);

            // Post
            
            string url = "http://app.mobivatebulksms.com/bulksms/xmlapi/" + username.Trim() + "/send/sms/single";
            //string url = "https://api.mobivatebulksms.com:443/send/single?api_key=64287cd2-0a3c-4f5a-a208-f7bfc4bf4d62";

            string responseFromServer = PostAsyncNew(url, data).Result;
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(responseFromServer);
            var jsonStr = JsonConvert.SerializeXmlNode(doc);
            return jsonStr;
          
        }

        private async Task<string> PostAsyncNew(string uri, string data)
        {
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("User-Agent", "foobar2016");

            byte[] bytes = Encoding.Default.GetBytes(data);
            data = Encoding.GetEncoding("iso-8859-1").GetString(bytes);

            // Form Encode XML value
            var keyValues = new List<KeyValuePair<string, string>>();
            keyValues.Add(new KeyValuePair<string, string>("xml", data));

            // Make sure data is sent as UTF-8
            HttpContent content = new FormUrlEncodedContent(keyValues);
            content.Headers.ContentType.CharSet = "UTF-8";

            var request = new HttpRequestMessage
            {
                RequestUri = new Uri(uri),
                Method = HttpMethod.Post,
                Content = content
            };

            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue(@"*/*"));

            var response = await httpClient.SendAsync(request);

            string responseTxt = await response.Content.ReadAsStringAsync();
            return responseTxt;
        }
    }
}
