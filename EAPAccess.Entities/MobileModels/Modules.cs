using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.Entities.MobileModels
{
   public class Modules
    {
        public MiniModule ModuleDetail { get; set; }
        public List<MiniModule> RelatedModules { get; set; }
    }
}
