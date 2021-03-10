using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.ACEModels
{
    public class ActivityTypes
    {
        public string id { get; set; }
        public string description { get; set; }
        public bool isFaceToFace { get; set; }
        public bool isVideo { get; set; }
        public bool isScheduledChat { get; set; }
        public bool isInstantChat { get; set; }
    }
}
