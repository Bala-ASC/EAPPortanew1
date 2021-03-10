using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using EAPAccess.Entities.ACEModels;

using System.Text;
using Microsoft.Extensions.Configuration;
using System.IO;
using Microsoft.Extensions.Configuration.Json;
using Microsoft.AspNetCore.Mvc;

namespace EAP.ACE.Service
{
    public class ACEAPI : IDisposable
    {
        private string _aceApiUrl = "";
        private string _aceApiUrlParameters = "";
        public string aceApiUrl
        {
            get => _aceApiUrl;
        }
        public string aceApiUrlParameters
        {
            get => _aceApiUrlParameters;
        }
        public ACEAPI()
        {
            var configurationBuilder = new ConfigurationBuilder();
            var path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            configurationBuilder.AddJsonFile(path, false);
            var root = configurationBuilder.Build();

            _aceApiUrl = root.GetSection("aceApiUrl").Value;
            _aceApiUrlParameters = root.GetSection("aceApiUrlParameters").Value;

        }


        // private const string aceApiUrl = "https://api1.eapcloud.com/test/";
        //      private string aceApiUrlParameters = "?Ocp-Apim-Subscription-Key=f2ff134367ca4304a82e2f8e81001c82";
        //test for connect

        private HttpClient GetHttpAPIClient(string functionName)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(aceApiUrl + functionName);
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "f2ff134367ca4304a82e2f8e81001c82");
            // client.DefaultRequestHeaders.Add("Content-Type", "application/json");
            return client;
        }
        private HttpClient PostHttpAPIClient()
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(aceApiUrl);

            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "f2ff134367ca4304a82e2f8e81001c82");
            return client;
        }

        public List<ServiceTypes> GetServiceTypes()
        {
            HttpClient client = GetHttpAPIClient("ServiceTypes");

            HttpResponseMessage response = client.GetAsync(aceApiUrlParameters).Result;
            try
            {
                List<ServiceTypes> objservicetypess = null;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objservicetypess = JsonConvert.DeserializeObject<List<ServiceTypes>>(dto);
                }

                return objservicetypess;
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }
        public List<ActivityTypes> GetActivityTypes()
        {
            HttpClient client = GetHttpAPIClient("ActivityTypes");

            HttpResponseMessage response = client.GetAsync(aceApiUrlParameters).Result;
            try
            {
                List<ActivityTypes> objactivityTypes = null;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objactivityTypes = JsonConvert.DeserializeObject<List<ActivityTypes>>(dto);
                }

                return objactivityTypes;
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }
        public List<Customers> GetCustomersandEmps()
        {
            HttpClient client = GetHttpAPIClient("Customers");

            HttpResponseMessage response = client.GetAsync(aceApiUrlParameters).Result;
            try
            {
                List<Customers> objCustomers = null;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objCustomers = JsonConvert.DeserializeObject<List<Customers>>(dto);
                }

                return objCustomers;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<Professionals> GetProfessionals()
        {
            HttpClient client = GetHttpAPIClient("Professionals");

            HttpResponseMessage response = client.GetAsync(aceApiUrlParameters).Result;
            try
            {
                List<Professionals> objProfessionals = null;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objProfessionals = JsonConvert.DeserializeObject<List<Professionals>>(dto);
                }

                return objProfessionals;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ClsSpecialities> GetSpecialities()
        {
            HttpClient client = GetHttpAPIClient("Specialities");

            HttpResponseMessage response = client.GetAsync(aceApiUrlParameters).Result;
            try
            {
                List<ClsSpecialities> objProfessionals = null;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objProfessionals = JsonConvert.DeserializeObject<List<ClsSpecialities>>(dto);
                }

                return objProfessionals;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<Locations> GetLocations()
        {
            HttpClient client = GetHttpAPIClient("Locations");

            HttpResponseMessage response = client.GetAsync(aceApiUrlParameters).Result;
            try
            {
                List<Locations> objLocations = null;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objLocations = JsonConvert.DeserializeObject<List<Locations>>(dto);
                }

                return objLocations;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ClientDetails GetClientbyid(string id)
        {
            HttpClient client = GetHttpAPIClient("Clients/" + id);

            HttpResponseMessage response = client.GetAsync(aceApiUrlParameters).Result;
            try
            {
                ClientDetails objClients = null;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objClients = JsonConvert.DeserializeObject<ClientDetails>(dto);
                }

                return objClients;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ClientResponse CreateClient([FromBody]ClientRequest model)
        {
            HttpClient client = PostHttpAPIClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "Clients");
            request.Content = new StringContent(JsonConvert.SerializeObject(model).ToString(), Encoding.UTF8, "application/json");
            var response = client.SendAsync(request).Result;
            try
            {
                ClientResponse objcreate = null;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objcreate = JsonConvert.DeserializeObject<ClientResponse>(dto);
                }
               
                return objcreate;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ClientResponse FamilyCreateClient([FromBody]CLSFamilyClientRequest model)
        {
            HttpClient client = PostHttpAPIClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "Clients");
            request.Content = new StringContent(JsonConvert.SerializeObject(model).ToString(), Encoding.UTF8, "application/json");
            var response = client.SendAsync(request).Result;
            try
            {
                ClientResponse objcreate = null;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objcreate = JsonConvert.DeserializeObject<ClientResponse>(dto);
                }
                else
                {
                    objcreate = new ClientResponse();
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objcreate = JsonConvert.DeserializeObject<ClientResponse>(dto);
                }
                return objcreate;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ClientResponse UpdateClient([FromBody]ClientDetails model)
        {
            HttpClient client = PostHttpAPIClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "Clients/" + model.id);
            request.Content = new StringContent(JsonConvert.SerializeObject(model).ToString(), Encoding.UTF8, "application/json");
            var response = client.SendAsync(request).Result;
            try
            {
                ClientResponse objcreate = null;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objcreate = JsonConvert.DeserializeObject<ClientResponse>(dto);
                }
                return objcreate;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ClientDashboard GetClientDashboard(string id)
        {
            HttpClient client = GetHttpAPIClient("Clients/{" + id + "}/dashboard");

            HttpResponseMessage response = client.GetAsync(aceApiUrlParameters).Result;
            try
            {
                ClientDashboard objLocations = null;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objLocations = JsonConvert.DeserializeObject<ClientDashboard>(dto);
                }

                return objLocations;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ClsBookingSlots> FindBookingSlots([FromBody]BookingSlots model, string clientId)
        {
            HttpClient client = PostHttpAPIClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "BookingSlots/{" + clientId + "}");
            request.Content = new StringContent(JsonConvert.SerializeObject(model).ToString(), Encoding.UTF8, "application/json");
            var response = client.SendAsync(request).Result;
            try
            {
                List<ClsBookingSlots> objfindbookingslots = null;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objfindbookingslots = JsonConvert.DeserializeObject<List<ClsBookingSlots>>(dto);
                }
                return objfindbookingslots;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ResponseReservation ReservationAce([FromBody]Reservations model, string clientId)
        {
            HttpClient client = PostHttpAPIClient();

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "Reservations/{" + clientId + "}");
            request.Content = new StringContent(JsonConvert.SerializeObject(model).ToString(), Encoding.UTF8, "application/json");
            var response = client.SendAsync(request).Result;
            try
            {
                ResponseReservation objreservation = null;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objreservation = JsonConvert.DeserializeObject<ResponseReservation>(dto);
                }
                return objreservation;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Appointment ConfirmAppointment(string reservationid)
        {
            HttpClient client = PostHttpAPIClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "Appointments");
            var Resobj = new { reservationId = reservationid };
            request.Content = new StringContent(JsonConvert.SerializeObject(Resobj).ToString(), Encoding.UTF8, "application/json");
            var response = client.SendAsync(request).Result;
            Appointment objAppointment = null;
            try
            {
               
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objAppointment = JsonConvert.DeserializeObject<Appointment>(dto);
                }
                else
                {
                    objAppointment = new Appointment();
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objAppointment.errormsg = dto;
                }
                return objAppointment;
            }
            catch (Exception ex)
            {
                return objAppointment;
            }
        }



        public bool DeleteAppointment(string id)
        {
            bool isSuccess = false;
            HttpClient client = GetHttpAPIClient("Appointments/{" + id + "}");
            HttpResponseMessage response = client.DeleteAsync(aceApiUrlParameters).Result;
            try
            {

                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    isSuccess = true;
                }

                return isSuccess;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void Dispose()
        {
            //throw new NotImplementedException();  
        }
        public ResponseReservation Reservation([FromBody]ClsReservationsResponce model, string clientId)
        {
            HttpClient client = PostHttpAPIClient();

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "Reservations/{" + clientId + "}");
            request.Content = new StringContent(JsonConvert.SerializeObject(model).ToString(), Encoding.UTF8, "application/json");
            var response = client.SendAsync(request).Result;
            ResponseReservation objreservation = null;
            try
            {
                
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objreservation = JsonConvert.DeserializeObject<ResponseReservation>(dto);

                }
                else
                {
                    objreservation = new ResponseReservation();
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objreservation.errormsg = dto;
                }
                return objreservation;
            }
            catch (Exception ex)
            {
                return objreservation;
            }
        }
        public bool DeleteReservertion(string reservetionid)
        {
            bool isSuccess = false;
            HttpClient client = GetHttpAPIClient("Reservations/{" + reservetionid + "}");
            HttpResponseMessage response = client.DeleteAsync(aceApiUrlParameters).Result;
            try
            {

                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    isSuccess = true;
                }

                return isSuccess;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool CreateVoximplantUser(string user_name,string user_password)
        {
            string accountid = "3418735";
            string api_key = "15c24b61-44ed-4fd5-9fac-d19c25e2c7ad";
            string application_id = "4347117";
           // string user_name = "eapvoximuser8";
            string user_display_name = user_name;
          //  string user_password = "eapvoximuser8p";
            try
            {

                string url = "https://api.voximplant.com/platform_api/AddUser/?account_id=" + accountid + "&api_key=" + api_key + "&user_name=" + user_name + "&user_display_name=" + user_display_name + "&user_password=" + user_password + "&application_id=" + application_id + "";
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(url);
                HttpResponseMessage response = client.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;

                }

                return true;
            }

            catch (Exception ex)
            {
                return false;

                throw ex;
            }


        }
        public ClientResponse CreateClientId([FromBody]ClientRequestToCreateId model)
        {
            HttpClient client = PostHttpAPIClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "Clients");
            request.Content = new StringContent(JsonConvert.SerializeObject(model).ToString(), Encoding.UTF8, "application/json");
            var responses = client.SendAsync(request);
            var response = responses.Result;
            try
            {
                ClientResponse objcreate = null;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objcreate = JsonConvert.DeserializeObject<ClientResponse>(dto);
                }
                else if (!response.IsSuccessStatusCode)
                {
                    var dto1 = response.Content.ReadAsByteArrayAsync().Result;
                    var responseString = Encoding.UTF8.GetString(dto1, 0, dto1.Length);
                    var detail=JsonConvert.DeserializeObject<ClientResponse>(responseString);
                    return detail;
                }

                return objcreate;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int UploadClientForm([FromBody]ClientFormSubmit model)
        {
            HttpClient client = PostHttpAPIClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "ConsentForm/"+model.ClientId);
            request.Content = new StringContent(JsonConvert.SerializeObject(model).ToString(), Encoding.UTF8, "application/json");
            var response = client.SendAsync(request).Result;
            try
            {
                var result = 0;
                if (response.IsSuccessStatusCode)
                {
                    result = 1;
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Boolean EndchatTransript([FromBody]Clstransrpit model, string ACEClientId)
        {
            HttpClient client = PostHttpAPIClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "ChatTranscript/"+ ACEClientId+"");
            request.Content = new StringContent(JsonConvert.SerializeObject(model).ToString(), Encoding.UTF8, "application/json");
            var response = client.SendAsync(request).Result;
            try
            {
                bool objtransrip = false;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.IsSuccessStatusCode;
                    objtransrip = dto;
                }
                return objtransrip;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Boolean InstantchatTransript([FromBody]ClsInsattransrpit model, string ACEClientId)
        {
            HttpClient client = PostHttpAPIClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "InstantChat/"+ACEClientId+"");
            request.Content = new StringContent(JsonConvert.SerializeObject(model).ToString(), Encoding.UTF8, "application/json");
            var response = client.SendAsync(request).Result;
            try
            {
                bool objtransrip = false;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.IsSuccessStatusCode;
                    objtransrip = dto;
                }
                return objtransrip;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ClsBookingSlots> FindBookingSlotsnew([FromBody]BookingSlotsnew model, string clientId)
        {
            HttpClient client = PostHttpAPIClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "BookingSlots/{" + clientId + "}");
            request.Content = new StringContent(JsonConvert.SerializeObject(model).ToString(), Encoding.UTF8, "application/json");
            var response = client.SendAsync(request).Result;
            try
            {
                List<ClsBookingSlots> objfindbookingslots = null;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objfindbookingslots = JsonConvert.DeserializeObject<List<ClsBookingSlots>>(dto);
                }
                return objfindbookingslots;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<DeleteCustomers> CustomersandEmps()
        {
            HttpClient client = GetHttpAPIClient("Customers");

            HttpResponseMessage response = client.GetAsync(aceApiUrlParameters).Result;
            try
            {
                List<DeleteCustomers> objCustomers = null;
                if (response.IsSuccessStatusCode)
                {
                    var dto = response.Content.ReadAsStringAsync().Result;
                    objCustomers = JsonConvert.DeserializeObject<List<DeleteCustomers>>(dto);
                }

                return objCustomers;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

}
