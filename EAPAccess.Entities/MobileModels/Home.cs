using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.MobileModels
{
    public class Home
    {
        public List<ContentModule> Recommended { get; set; }
        public List<PersonalSnapshot> PersonalSnapshots { get; set; }
        public List<WellBeingHistory> WellBeingHistories { get; set; }
       // public ContentModule ContentModule { get; set; }
    }
}
