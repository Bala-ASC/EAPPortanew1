using EAPAccess.BAL.Interfaces;
using EAPAccess.DAL;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace EAPAccess.BAL
{
  public  class CommonService: BaseRepository, ICommonService
    {
        private IConfiguration _config;
        private string baseUrl;
        private string Filepath;
        private string imageFolderPath;
        public CommonService(IConfiguration config)
        {
            _config = config;
            baseUrl = _config.GetSection("baseUrl").GetSection("Test").Value;
            Filepath = _config.GetSection("imagePaths").GetSection("FilePath").Value;
            
        }

        public bool FileUpload(string rootPath, string imagePath, string fileName, string base64String)
        {
            string filePath = Filepath + imagePath;
            var mappedPath = System.IO.Path.Combine(filePath);

            byte[] b = Convert.FromBase64String(base64String);
            string path = mappedPath;
            //Check if directory exist and delete existing files

            System.IO.DirectoryInfo di = new DirectoryInfo(path);
            if (System.IO.Directory.Exists(path))
            {
                if (di.GetFiles().Length > 0)
                {
                    foreach (FileInfo file in di.GetFiles())
                    {
                        file.Delete();//To delete existing files
                    }
                }
            }


            if (!System.IO.Directory.Exists(path))
            {
                System.IO.Directory.CreateDirectory(path); //Create directory if it doesn't exist
            }

            string Filename = fileName;
           //set the image path
            Filename = Filename.Replace(':', '_');
            string FilePath = Path.Combine(path + "/" + Filename);
            byte[] imageBytes = Convert.FromBase64String(base64String);
            System.IO.File.WriteAllBytes(FilePath, imageBytes);

            return true;
        }
        public bool VedioUpload(string rootPath, string vedioPath, string VedioFileName, string base64StringForVedio)
        {
            string filePath = Filepath + vedioPath;
            var mappedPath = System.IO.Path.Combine(rootPath, filePath);
            byte[] b = Convert.FromBase64String(base64StringForVedio);
            string path = mappedPath;
            System.IO.DirectoryInfo di = new DirectoryInfo(path);
            if (System.IO.Directory.Exists(path))
            {
                if (di.GetFiles().Length > 0)
                {
                    foreach (FileInfo file in di.GetFiles())
                    {
                        file.Delete(); //To delete existing files
                    }
                }
            }
            if (!System.IO.Directory.Exists(path))
            {
                System.IO.Directory.CreateDirectory(path); //Create directory if it doesn't exist
            }
            string VedioName = VedioFileName;
            string FilePath = Path.Combine(path + "/" + VedioName);
            byte[] imageBytes = Convert.FromBase64String(base64StringForVedio);
            System.IO.File.WriteAllBytes(FilePath, imageBytes);
            return true;
        }
    }
}
