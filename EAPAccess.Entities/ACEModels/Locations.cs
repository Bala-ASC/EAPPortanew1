using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.ACEModels
{
    public class Locations
    {
        public string id { get; set; }
        public string name { get; set; }
        public string abbreviation { get; set; }
        public List<Cities> cities { get; set; }
    }
    public class Cities
    {
        public string id { get; set; }
        public string name { get; set; }

        public string postcode { get; set; }
    }
}
