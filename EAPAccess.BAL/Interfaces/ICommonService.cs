using System;
using System.Collections.Generic;
using System.Text;

namespace EAPAccess.BAL.Interfaces
{
    public interface ICommonService
    {
        bool FileUpload(string rootPath, string imagePath, string fileName, string base64String);
        bool VedioUpload(string rootPath, string vedioPath, string VedioFileName, string base64StringForVedio);
    }
}
