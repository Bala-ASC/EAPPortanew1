using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using EAP.ACE.Service;
using EAPAccess.Entities.ACEModels;

namespace EAP.ACE.ApiTest
{
    class Program
    {
        static void Main(string[] args)
        {
            // ServiceTypes();
            ACEAPI obj = new ACEAPI();
            //  obj.GetServiceTypes();
            // obj.GetActivityTypes();
            // obj.GetCustomersandEmps();
            //  obj.GetProfessionals();
            //  obj.GetLocations();
            // obj.Getclintsbyid("cf54e8c9-7b4a-4557-93e7-4c32ba270cf7");
            //  ClientRequest ob = new ClientRequest();
            // ClientDetails ob = new ClientDetails();
            // ob.id = "cf54e8c9-7b4a-4557-93e7-4c32ba270cf7";
            // ob.email = "naiknaik@gmail.com";
            // ob.firstName = "naik.com";
            // ob.lastName = "h";
            //ob.employerId="";
            // ob.customerId = "32e57fce-ad44-4da8-a366-26225033267a";
            // ob.phoneNumberCountry = "90";
            // ob.phoneNumberArea = "naik@gmail.com";
            // ob.phoneNumber = "98567142365";
            // ob.postCode = "1001";
            // ob.cityId = "61e5b9fb-2a84-4f4b-bd17-2f84684a56fb";
            // ob.stateId = "e4ef96ca-b88b-49a0-900e-d83f91564027";
            // ob.addressLine1 = "hhh mm";
            // ob.addressLine2 = "gg jj";
            // ob.addressLine3 = "gg jj kk";

            // ob.employerGroupId = "75b088b4-8bab-4b2c-b908-16deefb0576f";
            // ob.employerDivisionId = "82d3bb7b-6623-4552-b9c9-83951efad031";
            // ob.employerDepartmentId="121960dc-cf53-44f6-b7ca-ccb7b5bffce9";
            // ob.serviceTypeId = "48659344-d51b-4a63-9807-7b29846be375";
            //obj.Createclient(ob);
            // obj.UpdateClient(ob);
            //obj.GetClientDashboard("cf54e8c9-7b4a-4557-93e7-4c32ba270cf7");
            //  BookingSlots ob = new BookingSlots();
            //ob.earliestDateTime = DateTime.Parse("2020-02-09T00:00:00.000Z") ;
            //ob.latestDateTime = DateTime.Parse("2020-02-10T00:00:00.000Z");
            //ob.gender = "";
            //ob.credential = "";

            //obj.FindBookingSlots(ob, "cf54e8c9-7b4a-4557-93e7-4c32ba270cf7");
            obj.DeleteAppointment("5eaedae0-2637-47ab-b7bb-f6e845b4959c");
        }
    }
}
