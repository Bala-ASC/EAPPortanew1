using EAP.ACE.Service;
using EAPAccess.BAL.Interfaces;
using EAPAccess.Common;
using EAPAccess.Common.Classes;
using EAPAccess.Common.Interface;
using EAPAccess.Entities;
using EAPAccess.Entities.ACEModels;
using EAPAccess.Entities.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Buffers.Text;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using WkWrap.Core;

namespace EAPAccessPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AceController : ControllerBase
    {
        #region ## Properties and Constructor Event       
        private readonly ILogger<AceController> _logger;
        private readonly IAceService _aceService;
        public bool _isSendMailBySendGrid;
        private IConfiguration _config;
        private string folderLocation;
        public IEmail _email;
        private ISendSmsService _smsBL;
        private string baseUsrl;
        private IHostingEnvironment _hostingEnvironment;
        public AceController(ILogger<AceController> logger, IAceService aceService, IConfiguration config, IEmail email, ISendSmsService smsService, IHostingEnvironment hostingEnvironment)
        {
            _aceService = aceService;
            _logger = logger;
            _config = config;
            baseUsrl = _config.GetSection("baseUrl").GetSection("Dev").Value;
            folderLocation = config.GetSection("imagePaths").GetSection("Users").Value;
            _email = email;
            _smsBL = smsService;
            _hostingEnvironment = hostingEnvironment;
            _isSendMailBySendGrid = Convert.ToBoolean(_config.GetSection("IsSendMailBySendGrid").Value);

        }
        [HttpGet("[action]")]
        public ActionResult GetCustomers()
        {
            _logger.LogInformation("GET: api/Ace/GetCustomers Invoke");
            ResponseModel responseModel = new ResponseModel();
            try
            {
               
                ACEAPI objaceapi = new ACEAPI();
                string r = "";
                Customerlist customerlist = new Customerlist();
                //var result1 = _aceService.DeleteCustomer(r);
                var CustomerDoc = objaceapi.GetCustomersandEmps();
                for (int i = 0; i < CustomerDoc.Count; i = i + 500)
                {
                    List<Customers> cust = new List<Customers>();
                    cust = CustomerDoc.Skip(i).Take(500).ToList();
                    //var values = i+100;
                    for (int j = 0; j < cust.Count; j++)
                    {
                        cust[j].selfServiceKey = cust[j].selfServiceKey.Replace("\r\n", "");
                    }
                    var jsonCustomerDoc = JsonConvert.SerializeObject(cust);
                    var result = _aceService.GetCustomers(jsonCustomerDoc);


                }
            }
            catch
            {
                responseModel.IsSuccess = false;
                return Ok(responseModel);
            }
            return Ok(responseModel);


        }
        [HttpGet("[action]")]
        public ActionResult DeleteCustomers()
        {
            _logger.LogInformation("GET: api/Ace/DeleteCustomers Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            List<DeleteCustomers> deleteCustomers = new List<DeleteCustomers>();
            deleteCustomers = objaceapi.CustomersandEmps();
            DataTable table = new DataTable();
            table.Columns.Add("ACECustomerId", typeof(string));
            DataTable table1 = new DataTable();
            table1.Columns.Add("GroupId", typeof(string));
            DataTable table2 = new DataTable();
            table2.Columns.Add("DivisionId", typeof(string));
            DataTable table3 = new DataTable();
            table3.Columns.Add("DepartmentId", typeof(string));
            for (int i = 0; i < deleteCustomers.Count; i++)
            {
                table.Rows.Add(new object[] { deleteCustomers[i].id });
                for (int j = 0; j < deleteCustomers[i].groups.Count; j++)
                {
                    table1.Rows.Add(new object[] { deleteCustomers[i].groups[j].id });
                    for (int k = 0; k < deleteCustomers[i].groups[j].divisions.Count; k++)
                    {
                        table2.Rows.Add(new object[] { deleteCustomers[i].groups[j].divisions[k].id });
                        for (int l = 0; l < deleteCustomers[i].groups[j].divisions[k].departments.Count; l++)
                        {
                            table3.Rows.Add(new object[] { deleteCustomers[i].groups[j].divisions[k].departments[l].id });

                        }
                    }
                }
            }
            _aceService.DeleteEmployee(table);
            _aceService.DeleteGroup(table1);
            _aceService.DeleteDivision(table2);
            _aceService.DeleteDept(table3);
            return Ok(responseModel);


        }

        [HttpGet("[action]")]
        public ActionResult GetActivityTypes()
        {
            _logger.LogInformation("GET: api/Ace/GetActivityTypes Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var ActivitieDoc = objaceapi.GetActivityTypes();
            var jsonActivitieDoc = JsonConvert.SerializeObject(ActivitieDoc);

            var result = _aceService.GetActivityTypes(jsonActivitieDoc);
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);


        }
        [HttpGet("[action]")]
        public ActionResult GetProfessionals()
        {
            _logger.LogInformation("GET: api/Ace/GetProfessionals Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var ProfessionalsDoc = objaceapi.GetProfessionals();
            var jsonProfessionalsDoc = JsonConvert.SerializeObject(ProfessionalsDoc);

            var result = _aceService.GetProfessionals(jsonProfessionalsDoc);
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }
        [HttpGet("[action]")]
        public ActionResult GetSpecialities()
        {
            _logger.LogInformation("GET: api/Ace/GetSpecialities Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var ProfessionalsDoc = objaceapi.GetSpecialities();
            var jsonProfessionalsDoc = JsonConvert.SerializeObject(ProfessionalsDoc);

            var result = _aceService.GetSpecialities(jsonProfessionalsDoc);
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }

        [HttpGet("[action]")]
        public ActionResult GetServiceTypes()
        {
            _logger.LogInformation("GET: api/Ace/GetServiceTypes Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var ServiceTypesDoc = objaceapi.GetServiceTypes();
            var jsonServiceTypesDoc = JsonConvert.SerializeObject(ServiceTypesDoc);

            var result = _aceService.GetServiceTypes(jsonServiceTypesDoc);
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }

        [HttpGet("[action]")]
        public ActionResult GetClientDashboard(int UserId, string clientid)
        {
            _logger.LogInformation("GET: api/Ace/GetClientDashboard Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var GetClientDashboardDoc = objaceapi.GetClientDashboard(clientid);
            var jsonGetClientDashboardDoc = JsonConvert.SerializeObject(GetClientDashboardDoc);
            var result = _aceService.UpdateClientDashboard(UserId, jsonGetClientDashboardDoc);

            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }

        [HttpPost("[action]")]
        public ActionResult FindBookingSlots([FromBody]BookingSlots model, string clientid, int userId, int type)
        {
            _logger.LogInformation("GET: api/Ace/FindBookingSlots Invoke");
          //  var ActivityParameters = _aceService.GetActivityParameters(model);
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            Booking booking = new Booking();
            DateTime Todaydate = DateTime.Today;
            DateTime latestDate = DateTime.Today.AddDays(7);
            model.earliestDateTime = Todaydate;
            model.latestDateTime = latestDate;
            //List<string> ActivityTypeId = new List<string>();
            //ActivityTypeId.Add(ActivityParameters.ActivityTypeId);
            //model.activityTypeIds = ActivityTypeId;
            var GetFindBookingSlotsDoc = objaceapi.FindBookingSlots(model, clientid);
            if (GetFindBookingSlotsDoc != null)
            {
                var result = GetFindBookingSlotsDoc.Select(o => new ClsBookingSlots
                {
                    timeZone = o.timeZone,
                    professionalName = o.professionalName,
                    resourceOfficeName = o.resourceOfficeName,
                    dateTimeStart = o.dateTimeStart,
                    dateTimeEnd = o.dateTimeEnd,
                    professionalId = o.professionalId,
                    resourceOfficeId = o.resourceOfficeId,
                    bookingDiaryId = o.bookingDiaryId,
                    //startDate = string.Format("{0:D}", o.dateTimeStart.ToUniversalTime()),
                    startDate = string.Format("{0:dddd, MMM dd, yyyy}", o.localDateTimeStart.ToUniversalTime()),
                    endDate = string.Format("{0:dddd, MMM dd, yyyy}", o.localDateTimeEnd.ToUniversalTime()),
                    startTime = string.Format("{0:t}", o.localDateTimeStart.ToUniversalTime()),
                    endTime = string.Format("{0:t}", o.localDateTimeEnd.ToUniversalTime()),
                    Timetest = string.Format("{0:t}", o.localDateTimeStart.ToString("HH")),
                }).ToList();
                var timeFilter = DateTime.Now.AddMinutes(240);
                var slots = result.Where(w => w.dateTimeStart >= timeFilter).ToList();
                List<ClsBookingSlots> filteredresult = new List<ClsBookingSlots>(slots);
                List<ClsBookingSlots> finalList = new List<ClsBookingSlots>();
                //f2f
                if (type == 1)
                {
                    foreach (var item in slots)
                    {
                        var bookedAppointment = GetBookedAppointments(userId, item.professionalId, item.resourceOfficeName, item.dateTimeStart, item.dateTimeEnd);
                        if (bookedAppointment != null)
                        {
                            filteredresult.Remove(item);
                           // finalList.AddRange(filteredresult.Where(w => w.dateTimeStart < bookedAppointment.StartDate.AddMinutes(-60) && w.dateTimeEnd > bookedAppointment.EndDate.AddMinutes(60)));
                        }
                    }
                }


                booking.BookingSlots = (type==1 && filteredresult.Count>0) ? filteredresult : slots;
                //var rslt = result.Where(w => w.dateTimeStart.Hour >= (w.dateTimeStart.Hour + 4)).ToList();

                var pIds = GetFindBookingSlotsDoc.GroupBy(x => x.professionalId)
                  .Select(y => new
                  {
                      Id = y.Key
                  });
                var ids = pIds.Select(s => s.Id).ToList();

                var Professionalsdeatils = _aceService.GetProfessionalsdeatils(ids);
                foreach (var item in Professionalsdeatils)
                {
                    var location = result.Where(w => w.professionalId == item.professionalId).FirstOrDefault().resourceOfficeName;
                    item.Location = location;
                }
                booking.Professionals = Professionalsdeatils;
            }
            if (booking == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = booking;
            return Ok(responseModel);
        }

        [HttpPost("[action]")]
        public ActionResult MakeReservationAce([FromBody]Reservations model, string clientid)
        {
            _logger.LogInformation("GET: api/Ace/MakeReservationAce Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var GetReservationDoc = objaceapi.ReservationAce(model, clientid);
            var jsonGetReservationDoc = JsonConvert.SerializeObject(GetReservationDoc);

            var result = jsonGetReservationDoc;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }
        [HttpPost("[action]")]
        public ActionResult ConfirmAppointmentACE(string reservationid)
        {
            _logger.LogInformation("GET: api/Ace/ConfirmAppointment Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var GetConfirmAppointmentDoc = objaceapi.ConfirmAppointment(reservationid);
            var jsonGetConfirmAppointmentDoc = JsonConvert.SerializeObject(GetConfirmAppointmentDoc);

            var result = jsonGetConfirmAppointmentDoc;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }

        [HttpPost("[action]")]
        public ActionResult MakeReservation([FromBody]ClsReservations model, string clientid)
        {
            _logger.LogInformation("GET: api/Ace/MakeReservation Invoke");


            var ReservationParameters = _aceService.GetReservationParameters(model);

            ClsReservationsResponce objres = new ClsReservationsResponce();
            objres.activityTypeId = ReservationParameters.ActivityTypeId;
            objres.serviceTypeId = ReservationParameters.ServiceTypeId;
            objres.bookingDiaryId = model.BookingDiaryId;
            objres.dateTimeEnd = model.DateTimeEnd;
            objres.dateTimeStart = model.DateTimeStart;
            objres.professionalId = model.ProfessionalId;
            objres.resourceOfficeId = model.ResourceOfficeId;

            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var GetReservationDoc = objaceapi.Reservation(objres, clientid);
            //var jsonGetReservationDoc = JsonConvert.SerializeObject(GetReservationDoc);

            //  var result = jsonGetReservationDoc;
            if (GetReservationDoc == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = GetReservationDoc.errormsg;

            }
            else
                responseModel.Result = GetReservationDoc;
            return Ok(responseModel);
        }
        [HttpPost("[action]")]
        public ActionResult ConfirmAppointment([FromBody]ClsAppointment model)
        {
            _logger.LogInformation("GET: api/Ace/ConfirmAppointment Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            Appointment GetConfirmAppointmentDoc = objaceapi.ConfirmAppointment(model.ReservationId);

            if (GetConfirmAppointmentDoc.id != null)
            {
                GetConfirmAppointmentDoc.IsForFamilyMember = model.IsForFamilyMember;
                GetConfirmAppointmentDoc.UserId = model.UserId;
                GetConfirmAppointmentDoc.FMFirstName = model.FMFirstName;
                GetConfirmAppointmentDoc.FMLastName = model.FMLastName;
                GetConfirmAppointmentDoc.FMEmail = model.FMEmail;
                GetConfirmAppointmentDoc.FMBirthDate = (model.FMBirthDate == null) ? DateTime.MinValue : model.FMBirthDate.Value;
                GetConfirmAppointmentDoc.FMPhone = model.FMPhone;
                GetConfirmAppointmentDoc.ReservationId = model.ReservationId;
            }

            CousollerandClientDetail InsertAppointment = new CousollerandClientDetail();
            Clsvoximplant voximplant = new Clsvoximplant();
            if (GetConfirmAppointmentDoc.id != null)
            {
                try
                {
                    EmailServiceHelper emailService = new EmailServiceHelper(_config, _email);
                    InsertAppointment = _aceService.InsertAppointment(GetConfirmAppointmentDoc);
                    InsertAppointment.startDateInString = InsertAppointment.StartDate.ToString("MMM dd, yyyy");
                    InsertAppointment.StartTime = InsertAppointment.StartDate.ToShortTimeString();

                    int CounsolerId = InsertAppointment.CousollerId;
                    int clientId = InsertAppointment.ClientId;
                    if (InsertAppointment.ActivityType == "Video")
                    {
                        if (CounsolerId != 0)
                        {
                            voximplant = _aceService.CounsollerVoximplant(CounsolerId);
                            if (voximplant != null)
                            {
                                string user_name = "eapvoximuser" + CounsolerId;
                                string user_password = "eapvoximuser" + CounsolerId + "p";
                                objaceapi.CreateVoximplantUser(user_name, user_password);
                                voximplant = _aceService.CounsollerVoximplantUserUpdate(CounsolerId, user_name, user_password);
                            }
                        }

                        if (clientId != 0)
                        {
                            voximplant = _aceService.CounsollerVoximplant(clientId);
                            if (voximplant != null)
                            {
                                string user_name = "eapvoximuser" + clientId;
                                string user_password = "eapvoximuser" + clientId + "p";
                                objaceapi.CreateVoximplantUser(user_name, user_password);
                                voximplant = _aceService.CounsollerVoximplantUserUpdate(clientId, user_name, user_password);
                            }
                        }
                    }

                    //Azure SendGrid Email Grid
                    if (_isSendMailBySendGrid)
                        emailService.SendMailAppointmentBooking(InsertAppointment).Wait();
                    //EmailServiceHelperForMobile.ForgetMessage(result.Item1);



                }
                catch (Exception e)
                {
                }
            }
            // var jsonGetConfirmAppointmentDoc = JsonConvert.SerializeObject(GetConfirmAppointmentDoc);

            var result = InsertAppointment;
            if (result.AppointmentId == 0)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = GetConfirmAppointmentDoc.errormsg;
                result.errormsg = GetConfirmAppointmentDoc.errormsg;
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }



        [HttpDelete("[action]")]
        public ActionResult DeleteReservation(string reservationId)
        {
            _logger.LogInformation("Delete: api/Ace/DeleteReservation Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var GetDeleteReservationRes = objaceapi.DeleteReservertion(reservationId);


            var result = GetDeleteReservationRes;
            if (result == false)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }
        [HttpGet("[action]")]
        public ActionResult GetCredentials()
        {
            _logger.LogInformation("GET: api/Ace/GetCredentials Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var GetCredentials = _aceService.GetCredentials();

            var result = GetCredentials;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }
        [HttpGet("[action]")]
        public ActionResult UpcomingAppointments(int UserId)
        {
            _logger.LogInformation("GET: api/Ace/UpcomingAppointments Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var GetUpcomingAppointments = _aceService.GetUpcomingAppointments(UserId);
            var result = GetUpcomingAppointments.Select(o => new ClsUpcomingAppointment
            {
                AppointmentId = o.AppointmentId,
                ActivityTypeId = o.ActivityTypeId,
                ActivityName = o.ActivityName,
                StartDate = o.StartDate,
                EndDate = o.EndDate,
                ACEAppointmentId = o.ACEAppointmentId,
                UserId = o.UserId,
                IsForFamilyMember = o.IsForFamilyMember,
                FMFirstName = o.FMFirstName,
                Username = o.Username,
                CounsellerId = o.CounsellerId,
                CounsellorName = o.CounsellorName,
                ClientEmail = o.ClientEmail,
                ClientMobileNo = o.ClientMobileNo,
                ClientPostcode = o.ClientPostcode,
                CounsellerEmail = o.CounsellerEmail,
                CounsellerMobileNo = o.CounsellerMobileNo,
                CounsellerPostcode = o.CounsellerPostcode,
                ClientOrganisationName = o.ClientOrganisationName,
                CounsellerOrganisationName = o.CounsellerOrganisationName,
                ClientVoximUser = o.ClientVoximUser,
                ClientVoximPass = o.ClientVoximPass,
                CounsellerVoximUser = o.CounsellerVoximUser,
                CounsellerVoximPass = o.CounsellerVoximPass,
                IsPast = o.IsPast,
                //startDate = string.Format("{0:D}", o.dateTimeStart.ToUniversalTime()),
                startDate = o.StartDate.ToString("MMM dd, yyyy"),
                endDate = o.EndDate.ToString("MMM dd, yyyy"),
                startTime = o.StartDate.ToShortTimeString(),
                endTime = o.EndDate.ToShortTimeString()
            }).ToList();
            //  var result = GetUpcomingAppointments;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }
        [HttpGet("[action]")]
        public ActionResult BookingHistory(int UserId)
        {
            _logger.LogInformation("GET: api/Ace/BookingHistory Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var GetBookingHistory = _aceService.BookingHistory(UserId);
            var result = GetBookingHistory.Select(o => new ClsUpcomingAppointment
            {
                AppointmentId = o.AppointmentId,
                ActivityTypeId = o.ActivityTypeId,
                ActivityName = o.ActivityName,
                StartDate = o.StartDate,
                EndDate = o.EndDate,
                IsForFamilyMember = o.IsForFamilyMember,
                ACEAppointmentId = o.ACEAppointmentId,
                UserId = o.UserId,
                Username = o.Username,
                CounsellerId = o.CounsellerId,
                CounsellorName = o.CounsellorName,
                IsPast = o.IsPast,
                //startDate = string.Format("{0:D}", o.dateTimeStart.ToUniversalTime()),
                startDate = o.StartDate.ToString("MMM dd, yyyy"),
                endDate = o.EndDate.ToString("MMM dd, yyyy"),
                startTime = o.StartDate.ToShortTimeString(),
                endTime = o.EndDate.ToShortTimeString()
            }).ToList();
            //  var result = GetBookingHistory;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }
        [HttpGet("[action]")]
        public ActionResult CurrentMonthAppointments(int UserId)
        {
            _logger.LogInformation("GET: api/Ace/CurrentMonthAppointments Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var GetMonthAppoinments = _aceService.CurrentMonthAppointments(UserId);
            var result = GetMonthAppoinments.Select(o => new ClsUpcomingAppointment
            {
                ACEAppointmentId = o.ACEAppointmentId,
                AppointmentId = o.AppointmentId,
                ActivityTypeId = o.ActivityTypeId,
                ActivityName = o.ActivityName,
                StartDate = o.StartDate,
                EndDate = o.EndDate,
                IsForFamilyMember = o.IsForFamilyMember,
                FMFirstName = o.FMFirstName,
                UserId = o.UserId,
                Username = o.Username,
                CounsellerId = o.CounsellerId,
                CounsellorName = o.CounsellorName,
                IsPast = o.IsPast,
                CounsellerMobileNo=o.CounsellerMobileNo,
                //startDate = string.Format("{0:D}", o.dateTimeStart.ToUniversalTime()),
                startDate = o.StartDate.ToString("MMM dd, yyyy"),
                endDate = o.EndDate.ToString("MMM dd, yyyy"),
                startTime = o.StartDate.ToShortTimeString(),
                endTime = o.EndDate.ToShortTimeString()
            }).ToList();
            //  var result = GetBookingHistory;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }

        public ActionResult AceCreateClient([FromBody]ClientRequest model)
        {
            _logger.LogInformation("GET: api/Ace/AceCreateClient Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var GetclientResponse = objaceapi.CreateClient(model);
            var jsonGetclientResponseDoc = JsonConvert.SerializeObject(GetclientResponse);

            var result = jsonGetclientResponseDoc;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }
        [HttpGet("[action]")]
        public ActionResult GetAppointmentsTimediff(string ACEAppointmentId)
        {
            _logger.LogInformation("GET: api/Ace/GetAppointmentsTimediff Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var GetAppointmentsTimediff = _aceService.GetAppointmentsTimediff(ACEAppointmentId);

            var result = GetAppointmentsTimediff;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }
        [HttpGet("[action]")]
        public ActionResult GetAppointmentDetails(string ACEApptId, int ApptId)
        {
            _logger.LogInformation("GET: api/Ace/GetAppointmentDetails Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var GetAppointmentsTimediff = _aceService.GetAppointmentDetails(ACEApptId, ApptId);

            var result = GetAppointmentsTimediff;
            if (result != null)
            {
                result.startDate = string.Format("{0:MMM dd, yyyy}", result.StartDate.ToUniversalTime());
                result.startTime = string.Format("{0:t}", result.StartDate.ToUniversalTime());
                result.clientDob = result.ClientDateOfBirth.ToString("dd MMMM yyyy");
                result.FmailyDob = result.FMBirthDate.ToString("dd MMMM yyyy");
                if (result.ClientProfilePhoto != null)
                {
                    result.ClientProfilePhoto = $"{baseUsrl}/{folderLocation}/{result.UserId}/{result.ClientProfilePhoto}";
                }
                //if (result.CounsollerProfilePhoto != null)
                //{
                //    result.CounsollerProfilePhoto = $"{baseUsrl}/{folderLocation}/{result.CounsellerId}/{result.CounsollerProfilePhoto}";
                //}
            }


            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }
        [HttpGet("[action]")]
        public ActionResult ChangeAppointment(string ACEAppointmentId)
        {
            _logger.LogInformation("GET: api/Ace/ChangeAppointment Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var deleteAppoitment = objaceapi.DeleteAppointment(ACEAppointmentId);
            var ChangeAppointment = _aceService.ChangeAppointment(ACEAppointmentId);

            var result = ChangeAppointment;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
            {
                EmailServiceHelper emailService = new EmailServiceHelper(_config, _email);

                ChangeAppointment.startDateInString = ChangeAppointment.StartDate.ToString("MMM dd, yyyy");
                ChangeAppointment.StartTime = ChangeAppointment.StartDate.ToShortTimeString();
                //Azure SendGrid Email Grid
                if (_isSendMailBySendGrid)
                    emailService.SendMailCancelAppointmentBooking(ChangeAppointment).Wait();
                if (ChangeAppointment.Hoursdiff <= 48)
                {
                    SendSMS message = new SendSMS();
                    message.recipient = ChangeAppointment.CounsellerMobileNo;
                    if(ChangeAppointment.IsForFamilyMember)
                    {
                        message.body = ChangeAppointment.CounsollerName + ", please be advised your client " + ChangeAppointment.FMFirstName + " has cancelled their appointment at " + ChangeAppointment.StartTime + " (AEST) on " + ChangeAppointment.startDateInString;
                    }
                    else
                    {
                        message.body = ChangeAppointment.CounsollerName + ", please be advised your client " + ChangeAppointment.ClientName + " has cancelled their appointment at " + ChangeAppointment.StartTime + " (AEST) on " + ChangeAppointment.startDateInString;
                    }
                   
                    string smsStatus = _smsBL.SendSms(message, _config);
                }

                responseModel.Result = result;
            }
            return Ok(responseModel);
        }
        [HttpPost("[action]")]
        public ActionResult ConsentFormSubmit([FromBody]ClsConsentForm model)
        {
            _logger.LogInformation("GET: api/Ace/ConsentFormSubmit Invoke");
            model.ConsentPdfFile = TogetBase64ConsentForm(model.ConsentPdfFile);
            var ConsentFormSubmit = _aceService.ConsentFormSubmit(model);
            ClientFormSubmit objclient = new ClientFormSubmit();
            objclient.fileType = "pdf";
            objclient.formContentBase64 = ConsentFormSubmit.ConsentPdfFile;
            objclient.ClientId = ConsentFormSubmit.ACEClientId;
            ACEAPI objaceapi = new ACEAPI();
            var result = objaceapi.UploadClientForm(objclient);

            ResponseModel responseModel = new ResponseModel();


            if (ConsentFormSubmit == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
            {
                responseModel.Result = ConsentFormSubmit;

            }
            return Ok(responseModel);
        }
        [HttpGet("[action]")]
        public ActionResult GetInstantChatCounsellers()
        {
            _logger.LogInformation("GET: api/Ace/GetInstantChatCounsellers Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var GetAppointmentsTimediff = _aceService.GetInstantChatCounsellers();

            var result = GetAppointmentsTimediff;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }
        [HttpGet("[action]")]
        public ActionResult CreateInstantChatAppt(int Userid, int Counsellerid, int QueueId)
        {
            _logger.LogInformation("GET: api/Ace/CreateInstantChatAppt Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var InstantChatAppt = _aceService.CreateInstantChatAppt(Userid, Counsellerid, QueueId);

            var result = InstantChatAppt;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }
        [HttpGet("[action]")]
        public ActionResult IsValidTimeForInstantChat()
        {
            _logger.LogInformation("GET: api/Ace/IsValidTimeForInstantChat Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var IsValidTimeForInstantChat = _aceService.IsValidTimeForInstantChat();

            var result = IsValidTimeForInstantChat;
            //if (result != null)
            //{

            //    result.UtcstartTime = string.Format("{0:HH:mm}", result.UtcStartDate.ToUniversalTime());
            //}


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

        #region ## ConsentForm API (Post: api/Ace/ConsentFormSubmitEnc)
        [HttpPost("[action]")]
        public ActionResult ConsentFormSubmitEnc([FromBody]ClsConsentEncForm model)
        {
            _logger.LogInformation("POST: api/Ace/ConsentFormSubmitEnc Invoke");
            model.UserId = (model.UserId.Replace("œ", "+").Replace("Ž", "=").Replace("ô", "/"));
            model.UserId = EncryptionDecryptionHelper.DecryptString(model.UserId);
            model.AppointmenId = (model.AppointmenId.Replace("œ", "+").Replace("Ž", "=").Replace("ô", "/"));
            model.AppointmenId = EncryptionDecryptionHelper.DecryptString(model.AppointmenId);
            ClsConsentForm model1 = new ClsConsentForm();
            model1.UserId = Convert.ToInt32(model.UserId);
            model1.AppointmenId = Convert.ToInt32(model.AppointmenId);
            model1.FullName = model.FullName;
            model1.Phone = model.Phone;
            model1.Signature = model.Signature;
            model1.UserEnteredDate = model.UserEnteredDate;
            model1.EmergencyContactPerson = model.EmergencyContactPerson;
            model1.Address = model.Address;
            model1.ConsentPdfFile = TogetBase64ConsentForm(model.ConsentPdfFile);

            var ConsentFormSubmit = _aceService.ConsentFormSubmit(model1);
            ResponseModel responseModel = new ResponseModel();
            ClientFormSubmit objclient = new ClientFormSubmit();
            objclient.fileType = "pdf";
            objclient.formContentBase64 = ConsentFormSubmit.ConsentPdfFile;
            objclient.ClientId = ConsentFormSubmit.ACEClientId;
            ACEAPI objaceapi = new ACEAPI();
            var result = objaceapi.UploadClientForm(objclient);
            if (ConsentFormSubmit == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = ConsentFormSubmit;
            return Ok(responseModel);
        }
        #endregion

        #region ## DownloadPdf API (Post: api/Ace/DownloadPdf)
        [HttpPost("[action]")]
        public IActionResult DownloadPdf(htmlconverter htmlconverter)
        {
            var htmlText = @"<?xml version=""1.0"" encoding=""UTF-8""?>
                 <!DOCTYPE html 
                     PUBLIC ""-//W3C//DTD XHTML 1.0 Strict//EN""
                    ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"">
                 <html xmlns=""http://www.w3.org/1999/xhtml"" xml:lang=""en"" lang=""en"">
                    <head>
                       
                    </head>
                  <body>
                    " + htmlconverter.html1 + "</body></html>";
            var htmlContent = htmlText;
            // var wkhtmltopdf = new FileInfo(@"C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe");
            var FileName = Path.Combine(_hostingEnvironment.ContentRootPath.ToString(), "wwwroot/wkhtmltopdf/Windows/wkhtmltopdf.exe");
            var webRoot = _hostingEnvironment.WebRootPath + "wwwroot/wkhtmltopdf/Windows/wkhtmltopdf.exe";
            var wkhtmltopdf = new FileInfo(FileName);
            var converter = new HtmlToPdfConverter(wkhtmltopdf);
            var pdfBytes = converter.ConvertToPdf(htmlContent);
            string base64String = Convert.ToBase64String(pdfBytes, 0, pdfBytes.Length);

            FileResult fileResult = new FileContentResult(pdfBytes, "application/pdf");
            fileResult.FileDownloadName = "test.pdf";
            return fileResult;
        }
        #endregion

        #region
        public string TogetBase64ConsentForm(string htmlconverter)
        {
            var htmlText = @"<?xml version=""1.0"" encoding=""UTF-8""?>
                 <!DOCTYPE html 
                     PUBLIC ""-//W3C//DTD XHTML 1.0 Strict//EN""
                    ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"">
                 <html xmlns=""http://www.w3.org/1999/xhtml"" xml:lang=""en"" lang=""en"">
                    <head>
                       
                    </head>
                  <body>
                    " + htmlconverter + "</body></html>";
            var htmlContent = htmlText;
            var FileName = Path.Combine(_hostingEnvironment.ContentRootPath.ToString(), "wwwroot/wkhtmltopdf/Windows/wkhtmltopdf.exe");
            var webRoot = _hostingEnvironment.WebRootPath + "wwwroot/wkhtmltopdf/Windows/wkhtmltopdf.exe";
            var wkhtmltopdf = new FileInfo(FileName);
            var converter = new HtmlToPdfConverter(wkhtmltopdf);
            var pdfBytes = converter.ConvertToPdf(htmlContent);
            string base64String = Convert.ToBase64String(pdfBytes, 0, pdfBytes.Length);
            return base64String;


        }
        #endregion
        [HttpGet("[action]")]
        public ActionResult SendEmailForInstantchat(int Userid)
        {
            _logger.LogInformation("GET:api/Ace/SendEmailForInstantchat Invoke");
            ResponseModel responseModel = new ResponseModel();
            var GetAppointmentsTimediff = _aceService.SendEmailForInstantchat(Userid);

            var result = GetAppointmentsTimediff;
            EmailServiceHelper emailService = new EmailServiceHelper(_config, _email);
            if (result != null)
                emailService.SendEmailForInstantchat(result).Wait();
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);


        }

        [HttpPost("[action]")]
        public ActionResult EndChatSession(string ACEClientId, string ACEAppointmentId, [FromBody] IList<LBS_SYS_TableData> Messages)
        {
            _logger.LogInformation("GET:api/Ace/EndChatSession Invoke");
            ResponseModel responseModel = new ResponseModel();
            var ChatTranscript = (JsonConvert.SerializeObject(Messages));
            var ChatQuotedString = ChatTranscript.TrimStart('[').TrimEnd(']');
            //ACEAPI objaceapi = new ACEAPI();
             var ChatEncryptstring= EncryptionDecryptionHelper.EncryptString(ChatQuotedString);

            //var GetFindBookingSlotsDoc = objaceapi.EndchatTransript(model, ACEClientId);
            var EndChatSession = _aceService.EndChatSession(ACEAppointmentId, ChatEncryptstring);
           
            var result = EndChatSession;
            if ((!result.IsSurveyMailSent) && (result.IsCompleted))
            {
                EmailServiceHelper emailService = new EmailServiceHelper(_config, _email);
                if (_isSendMailBySendGrid)
                    emailService.SendEmailappointmentsurvey(result).Wait();
                _aceService.UpdateEmailSurveySent(result.ACEAppointmentId);

            }
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);


        }
        [HttpPost("[action]")]
        public ActionResult EndChatSessionEnded(string ACEClientId, string ACEAppointmentId, [FromBody] IList<LBS_SYS_TableData> Messages)
        {
            _logger.LogInformation("GET:api/Ace/EndChatSessionEnded Invoke");
            ResponseModel responseModel = new ResponseModel();
            var ChatTranscript = (JsonConvert.SerializeObject(Messages));
            var ChatQuotedString = ChatTranscript.TrimStart('[').TrimEnd(']');
            //ACEAPI objaceapi = new ACEAPI();
             var ChatEncryptstring= EncryptionDecryptionHelper.EncryptString(ChatQuotedString);

            //var GetFindBookingSlotsDoc = objaceapi.EndchatTransript(model, ACEClientId);
            var EndChatSession = _aceService.EndChatSessionEnded(ACEAppointmentId, ChatEncryptstring);

            var result = EndChatSession;
            if ((!result.IsSurveyMailSent) && (result.IsCompleted))
            {
                EmailServiceHelper emailService = new EmailServiceHelper(_config, _email);
                if (_isSendMailBySendGrid)
                    emailService.SendEmailappointmentsurvey(result).Wait();
                _aceService.UpdateEmailSurveySent(result.ACEAppointmentId);

            }
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);


        }
        [HttpGet("[action]")]
        public ActionResult EndChatSessionMsg(string ACEClientId, string ACEAppointmentId)
        {
            _logger.LogInformation("GET:api/Ace/EndChatSessionMsg Invoke");
            ResponseModel responseModel = new ResponseModel();

            // var ChatEncryptstring= EncryptionDecryptionHelper.EncryptString(ChatQuotedString);

            //var GetFindBookingSlotsDoc = objaceapi.EndchatTransript(model, ACEClientId);
            var EndChatSession = _aceService.EndChatSessionMsg(ACEAppointmentId);

            var result = EndChatSession;
            if ((!result.IsSurveyMailSent) && (result.IsCompleted))
            {
                EmailServiceHelper emailService = new EmailServiceHelper(_config, _email);
                if (_isSendMailBySendGrid)
                    emailService.SendEmailappointmentsurvey(result).Wait();
                _aceService.UpdateEmailSurveySent(result.ACEAppointmentId);

            }
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);


        }
        [HttpGet("[action]")]
        public ActionResult ChatStartedOn(string ACEAppointmentId)
        {
            _logger.LogInformation("GET:api/Ace/ChatStartedOn Invoke");
            ResponseModel responseModel = new ResponseModel();
            var EndChatSession = _aceService.ChatStartedOn(ACEAppointmentId);

            var result = EndChatSession;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);


        }
        [HttpGet("[action]")]
        public ActionResult IsFemaleCounsellerFirstF2FMeeting(int UserId, string CounsellerIdACE)
        {
            _logger.LogInformation("GET:api/Ace/IsFemaleCounsellerFirstF2FMeeting Invoke");
            ResponseModel responseModel = new ResponseModel();
            var EndChatSession = _aceService.IsFemaleCounsellerFirstF2FMeeting(UserId, CounsellerIdACE);

            var result = EndChatSession;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);


        }
        [HttpGet("[action]")]
        public IActionResult getconsetformpdf(int ApptmentId)
        {
            _logger.LogInformation("GET: api/Ace/ConsentFormSubmit Invoke");
            // model.pdffile = TogetBase64ConsentForm(model.ConsentPdfFile);
            var ConsentFormSubmit = _aceService.getconsetformpdf(ApptmentId);
            ResponseModel responseModel = new ResponseModel();
            FileResult fileResult = new FileContentResult(ConsentFormSubmit.pdffile, "application/pdf");
            fileResult.FileDownloadName = "test.pdf";

            return fileResult;


        }
        [HttpGet("[action]")]
        public ActionResult Remainder()
        {
            _logger.LogInformation("GET: api/Ace/Remainder Invoke");
            // model.pdffile = TogetBase64ConsentForm(model.ConsentPdfFile);
            var RemainderList = _aceService.RemainderList();
            EmailServiceHelper emailService = new EmailServiceHelper(_config, _email);
            if (RemainderList.Count != 0)
            {
                for (int i = 0; i < RemainderList.Count; i++)
                {
                    RemainderList[i].startDateInString = RemainderList[i].StartDate.ToString("MMM dd, yyyy");
                    RemainderList[i].StartTime = RemainderList[i].StartDate.ToShortTimeString();
                    if (_isSendMailBySendGrid)
                        emailService.SendMailReminder(RemainderList[i]).Wait();
                    var result = _aceService.Updateremaindermaillist(RemainderList[i].AppointmentId);
                }
            }
            ResponseModel responseModel = new ResponseModel();
            //var result = "";

            return Ok(responseModel);


        }
        [HttpGet("[action]")]
        public ActionResult GetAppointmentsEndTimediff(string ACEAppointmentId)
        {
            _logger.LogInformation("GET: api/Ace/GetAppointmentsEndTimediff Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var GetAppointmentsEndTimediff = _aceService.GetAppointmentsEndTimediff(ACEAppointmentId);

            var result = GetAppointmentsEndTimediff;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }

        [HttpPost("[action]")]
        public ActionResult StoretranscriptinACE(string ACEClientId, string ACEAppointmentId, [FromBody] IList<LBS_SYS_TableData> Messages)
        {
            _logger.LogInformation("GET:api/Ace/StoretranscriptinACE Invoke");
            ResponseModel responseModel = new ResponseModel();

            var ChatTranscript = (JsonConvert.SerializeObject(Messages));
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(ChatTranscript);
            var chatencript = System.Convert.ToBase64String(plainTextBytes);
            Clstransrpit model = new Clstransrpit();
            model.appointmentId = ACEAppointmentId;
            model.chatTranscriptBase64 = chatencript;
            ACEAPI objaceapi = new ACEAPI();
            var GetFindBookingSlotsDoc = objaceapi.EndchatTransript(model, ACEClientId);
            // var EndChatSession = _aceService.EndChatSession(ACEAppointmentId, ChatTranscript);

            var result = GetFindBookingSlotsDoc;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);


        }
        [HttpPost("[action]")]
        public ActionResult StoreInsattranscriptinACE(string ACEClientId, DateTime StartDate, DateTime EndDate, [FromBody] IList<LBS_SYS_TableData> Messages)
        {
            _logger.LogInformation("GET:api/Ace/StoretranscriptinACE Invoke");
            ResponseModel responseModel = new ResponseModel();

            var ChatTranscript = (JsonConvert.SerializeObject(Messages));
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(ChatTranscript);
            var chatencript = System.Convert.ToBase64String(plainTextBytes);
            ClsInsattransrpit model = new ClsInsattransrpit();
            model.dateTimeStart = StartDate;
            model.dateTimeEnd = EndDate;
            model.professionalId = ACEClientId;
            model.activityTypeId = "8f92ed4a-d676-4610-a394-b4e500a15f74";
            model.chatTranscriptBase64 = chatencript;
            ACEAPI objaceapi = new ACEAPI();
            var GetFindBookingSlotsDoc = objaceapi.InstantchatTransript(model, ACEClientId);
            // var EndChatSession = _aceService.EndChatSession(ACEAppointmentId, ChatTranscript);

            var result = GetFindBookingSlotsDoc;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);


        }
        [HttpGet("[action]")]
        public ActionResult CreateQueue(int UserId)
        {
            _logger.LogInformation("GET: api/Ace/CreateQueue Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var InsertQueue = _aceService.CreateQueue(UserId);

            var result = InsertQueue;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }
        [HttpGet("[action]")]
        public ActionResult PositionQueue(int QueueId)
        {
            _logger.LogInformation("GET: api/Ace/PositionQueue Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var PositionQueue = _aceService.PositionQueue(QueueId);

            var result = PositionQueue;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }
        [HttpGet("[action]")]
        public ActionResult ConnectdQueue(int UserId, int CounsellorId, int QueueId)
        {
            _logger.LogInformation("GET: api/Ace/ConnectdQueue Invoke");
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            var PositionQueue = _aceService.ConnectdQueue(UserId, CounsellorId, QueueId);

            var result = PositionQueue;
            if (result == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = result;
            return Ok(responseModel);
        }
        [HttpGet("[action]")]
        public ActionResult GetScedulechatList()
        {
            _logger.LogInformation("GET: api/Ace/GetScedulechatList Invoke");
            ResponseModel responseModel = new ResponseModel();
            var SceduleChatList = _aceService.GetScedulechatList();
            for (int i = 0; i < SceduleChatList.Count; i++)
            {
                Clstransrpit model = new Clstransrpit();
                string[] str = SceduleChatList[i].chatTranscript.Split(",");
                //var chattras = SceduleChatList[i].chatTranscript.Replace(",", "");
                //var chatTranscript = (chattras.Replace("œ", "+").Replace("Ž", "=").Replace("ô", "/"));
                string ChatDecryptstring = "";
                string ChatDecApp = "";
               for (int j=0;j< str.Length;j++)
                {
                   ChatDecryptstring = EncryptionDecryptionHelper.DecryptString(str[j]);
                    ChatDecApp = ChatDecApp + ChatDecryptstring;
                    ChatDecryptstring = "";

                }


                var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(ChatDecApp);
                model.chatTranscriptBase64 = System.Convert.ToBase64String(plainTextBytes);
                if(model.chatTranscriptBase64=="")
                {
                    var plainTextByte = System.Text.Encoding.UTF8.GetBytes("No chat text available");
                    model.chatTranscriptBase64 = System.Convert.ToBase64String(plainTextByte);
                }
                    
                //model.chatTranscriptBase64 = " ";
                model.appointmentId = SceduleChatList[i].ACEAppointmentId;
                ACEAPI objaceapi = new ACEAPI();
                var GetFindBookingSlotsDoc = objaceapi.EndchatTransript(model, SceduleChatList[i].ACEClientId);

                if (GetFindBookingSlotsDoc)

                    _aceService.UpdateScedulechatList(model.appointmentId);
            }
            return Ok(responseModel);
        }
        [HttpGet("[action]")]
        public ActionResult GetInstantchatList()
        {
            _logger.LogInformation("GET: api/Ace/GetInstantchatList Invoke");
            ResponseModel responseModel = new ResponseModel();
            var GetInstantchatList = _aceService.GetInstantchatList();
            for (int i = 0; i < GetInstantchatList.Count; i++)
            {
                ClsInsattransrpit model = new ClsInsattransrpit();
                string[] str = GetInstantchatList[i].ChatTranscript.Split(",");
                //var chattras = SceduleChatList[i].chatTranscript.Replace(",", "");
                //var chatTranscript = (chattras.Replace("œ", "+").Replace("Ž", "=").Replace("ô", "/"));
                string ChatDecryptstring = "";
                string ChatDecApp = "";
                for (int j = 0; j < str.Length; j++)
                {
                    ChatDecryptstring = EncryptionDecryptionHelper.DecryptString(str[j]);
                    ChatDecApp = ChatDecApp + ChatDecryptstring;
                    ChatDecryptstring = "";

                }
            
                var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(ChatDecApp);
                model.chatTranscriptBase64 = System.Convert.ToBase64String(plainTextBytes);
                if (model.chatTranscriptBase64 == "")
                {
                    var plainTextByte = System.Text.Encoding.UTF8.GetBytes("No chat text available");
                    model.chatTranscriptBase64 = System.Convert.ToBase64String(plainTextByte);
                }
                model.dateTimeStart = GetInstantchatList[i].StartDate;
                model.dateTimeEnd = GetInstantchatList[i].EndDate;
                model.professionalId = GetInstantchatList[i].ACEProfessinalId;
                model.activityTypeId = GetInstantchatList[i].ActivityTypeId;
                ACEAPI objaceapi = new ACEAPI();
                var GetFindBookingSlotsDoc = objaceapi.InstantchatTransript(model, GetInstantchatList[i].ACEClientId);


                if (GetFindBookingSlotsDoc)

                    _aceService.UpdateInstantchatList(GetInstantchatList[i].ACEAppointmentId);
            }
            return Ok(responseModel);
        }
        [HttpPost("[action]")]
        public ActionResult SendSMSForAppointmentCancel([FromBody] SendSMS message)
        {
            _logger.LogInformation("POST: api/Ace/GetScedulechatList Invoke");
            string smsStatus = _smsBL.SendSms(message, _config);
            return Ok(smsStatus);
        }

        public ClsGetAppointmentDetail GetBookedAppointments(int UserId, string CounsellerId, string Location, DateTime FromDateInUTC, DateTime ToDateInUTC)
        {
            _logger.LogInformation("GET: GetBookedAppointments Invoke");
            //  List<ClsGetAppointmentDetail> result = new List<ClsGetAppointmentDetail>();    
            var result = _aceService.GetBookedAppointments(UserId, CounsellerId, Location, FromDateInUTC, ToDateInUTC);
            return result;
        }
        [HttpPost("[action]")]
        public ActionResult CreateAceFamilyMember([FromBody]FamilyClientRequest model)
        {
            _logger.LogInformation("GET: api/Ace/CreateAceFamilyMember Invoke");
            ResponseModel responseModel = new ResponseModel();
            var FamlilyMemberExist = _aceService.FamlilyMemberExist(model.Email,model.UserId);
            if(FamlilyMemberExist.id == "Not exist")
            {
                CLSFamilyClientRequest objres = new CLSFamilyClientRequest();
                    objres.firstName = model.FirstName;
                    objres.lastName = model.LastName;
                    objres.email = model.Email;
                    objres.customerId = FamlilyMemberExist.ACECustomerId;
                    objres.dateOfBirth = model.DateOfBirth;
                    objres.isFamilyMember = true;
                    objres.phoneNumber = model.PhoneNumber;
                    objres.employerGroupId = FamlilyMemberExist.ClientOrgGroupId;
                    objres.employerDepartmentId = FamlilyMemberExist.ClientOrgDepartmentId;
                    objres.employerDivisionId = FamlilyMemberExist.ClientOrgDivisionId;
                    objres.postCode = "1234";
                    objres.serviceTypeId = "c573658a-525d-489c-a3d3-79b15eea8310";
                
                  
                ACEAPI objaceapi = new ACEAPI();
                var FamilyCreateClient = objaceapi.FamilyCreateClient(objres);
                if (FamilyCreateClient.id == null)
                {
                    responseModel.IsSuccess = false;
                    responseModel.Message = FamilyCreateClient.detail;
                    
                }
                else
                {
                    FamilyClientRequest objcreatefm = new FamilyClientRequest();
                    objcreatefm.FirstName = model.FirstName;
                    objcreatefm.LastName = model.LastName;
                    objcreatefm.Email = model.Email;
                    objcreatefm.DateOfBirth = model.DateOfBirth;
                    objcreatefm.PhoneNumber = model.PhoneNumber;
                    objcreatefm.CustomerId = FamlilyMemberExist.ACECustomerId;
                    objcreatefm.ACEClientId = FamilyCreateClient.id;
                    objcreatefm.UserId = model.UserId;
                    var CreateFamilyMembers = _aceService.InsertFamilyMembers(objcreatefm);
                    responseModel.Result = FamilyCreateClient;
                }
            }
            else
            {
                //var id = FamlilyMemberExist.ACEClientId;
                responseModel.Result = FamlilyMemberExist;
            }
 
            return Ok(responseModel);
        }
        [HttpPost("[action]")]
        public ActionResult FindBookingSlotsNew([FromBody]BookingSlotsnew model, string clientid, int userId, int type)
        {
            _logger.LogInformation("GET: api/Ace/FindBookingSlotsNew Invoke");
            var ActivityParameters = _aceService.GetActivityParameters(model);
            ResponseModel responseModel = new ResponseModel();
            ACEAPI objaceapi = new ACEAPI();
            Booking booking = new Booking();
            DateTime Todaydate = DateTime.Today;
            DateTime latestDate = DateTime.Today.AddDays(7);
            model.earliestDateTime = Todaydate;
            model.latestDateTime = latestDate;
            List<string> ActivityTypeId = new List<string>();
            ActivityTypeId.Add(ActivityParameters.ActivityTypeId);
            model.activityTypeIds = ActivityTypeId;
            var GetFindBookingSlotsDoc = objaceapi.FindBookingSlotsnew(model, clientid);
            if (GetFindBookingSlotsDoc != null)
            {
                var result = GetFindBookingSlotsDoc.Select(o => new ClsBookingSlots
                {
                    timeZone = o.timeZone,
                    professionalName = o.professionalName,
                    resourceOfficeName = o.resourceOfficeName,
                    dateTimeStart = o.dateTimeStart,
                    dateTimeEnd = o.dateTimeEnd,
                    professionalId = o.professionalId,
                    resourceOfficeId = o.resourceOfficeId,
                    bookingDiaryId = o.bookingDiaryId,
                    //startDate = string.Format("{0:D}", o.dateTimeStart.ToUniversalTime()),
                    startDate = string.Format("{0:dddd, MMM dd, yyyy}", o.localDateTimeStart.ToUniversalTime()),
                    endDate = string.Format("{0:dddd, MMM dd, yyyy}", o.localDateTimeEnd.ToUniversalTime()),
                    startTime = string.Format("{0:t}", o.localDateTimeStart.ToUniversalTime()),
                    endTime = string.Format("{0:t}", o.localDateTimeEnd.ToUniversalTime()),
                    Timetest = string.Format("{0:t}", o.localDateTimeStart.ToString("HH")),
                }).ToList();
                var timeFilter = DateTime.Now.AddMinutes(240);
                var slots = result.Where(w => w.dateTimeStart >= timeFilter).ToList();
                List<ClsBookingSlots> filteredresult = new List<ClsBookingSlots>(slots);
                List<ClsBookingSlots> finalList = new List<ClsBookingSlots>();
                //f2f
                if (type == 1)
                {
                    foreach (var item in slots)
                    {
                        var bookedAppointment = GetBookedAppointments(userId, item.professionalId, item.resourceOfficeName, item.dateTimeStart, item.dateTimeEnd);
                        if (bookedAppointment != null)
                        {
                            filteredresult.Remove(item);
                            // finalList.AddRange(filteredresult.Where(w => w.dateTimeStart < bookedAppointment.StartDate.AddMinutes(-60) && w.dateTimeEnd > bookedAppointment.EndDate.AddMinutes(60)));
                        }
                    }
                }


                booking.BookingSlots = (type == 1 && filteredresult.Count > 0) ? filteredresult : slots;
                //var rslt = result.Where(w => w.dateTimeStart.Hour >= (w.dateTimeStart.Hour + 4)).ToList();

                var pIds = GetFindBookingSlotsDoc.GroupBy(x => x.professionalId)
                  .Select(y => new
                  {
                      Id = y.Key
                  });
                var ids = pIds.Select(s => s.Id).ToList();

                var Professionalsdeatils = _aceService.GetProfessionalsdeatils(ids);
                foreach (var item in Professionalsdeatils)
                {
                    var location = result.Where(w => w.professionalId == item.professionalId).FirstOrDefault().resourceOfficeName;
                    item.Location = location;
                }
                booking.Professionals = Professionalsdeatils;
            }
            if (booking == null)
            {
                responseModel.IsSuccess = false;
                responseModel.Message = "No Record Found";
            }
            else
                responseModel.Result = booking;
            return Ok(responseModel);
        }
    }
}