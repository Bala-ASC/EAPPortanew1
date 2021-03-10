using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.ACEModels
{
    public class Customers
    {
        public string id { get; set; }
        public string name { get; set; }
        public Boolean isTerminated { get; set; }
        public Boolean isInactive { get; set; }
        public string selfServiceKey { get; set; }
        public bool referToCallCentre { get; set; }
        public bool familyMembersAllowed { get; set; }
        public bool familyMembersUnder18Allowed { get; set; }
        public int number { get; set; }
        public List<Groups> groups { get; set; }
        public List<Employers> employers { get; set; }

    }
    public class DeleteCustomers
    {
        public string id { get; set; }
        public List<DeleteGroups> groups { get; set; }
        public List<DeleteEmployers> employers { get; set; }

    }
    public class Employers
    {
        public string id { get; set; }
        public string name { get; set; }
    }
    public class DeleteEmployers
    {
        public string id { get; set; }

    }
    public class DeleteGroups
    {
        public string id { get; set; }
        public List<DeleteDivisions> divisions { get; set; }
    }
    public class Groups
    {
        public string id { get; set; }
        public string name { get; set; }
        public List<Divisions> divisions { get; set; }
    }
    public class Divisions
    {
        public string id { get; set; }
        public string name { get; set; }
        public List<Departments> departments { get; set; }
    }
    public class DeleteDivisions
    {
        public string id { get; set; }

        public List<DeleteDepartments> departments { get; set; }
    }
    public class DeleteDepartments
    {
        public string id { get; set; }

    }
    public class Departments
    {
        public string id { get; set; }
        public string name { get; set; }
    }

}
