using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.ACEModels
{
    public class Professionals
    {

        public string id { get; set; }
        public string name { get; set; }
        public string emailAddress { get; set; }
        public string photoUrl { get; set; }
        public int age { get; set; }
        public string gender { get; set; }
        public string mobilePhone { get; set; }
        public List<ActivityTypes> ActivityTypes { get; set; }
        public List<ResourceOffices> resourceOffices { get; set; }

        public string[] credentials { get; set; }
        public string[] specialities { get; set; }
    }

    public class ResourceOffices
    {
        public string id { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public string postcode { get; set; }
        public string cityId { get; set; }
        public string cityName { get; set; }
        public string stateId { get; set; }
        public string stateName { get; set; }

    }

    public class ClsSpecialities {
        public string id { get; set; }
        public string description { get; set; }
    }
}
