using System;
using System.IO;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Mezcal.Models
{
    public class CommonResponse
    {
        public int RespCd { get; set; }
        public string RespMsg { get; set; }
    }
    public class Response
    {
        public string ResponseCode { get; set; }
        public string ResponseMessage { get; set; }

    }

    public class CommonUtils
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SortBy { get; set; }
        public string SortOrder { get; set; }
        public string Search { get; set; }
        public bool IsActive { get; set; }

        public static string DecryptQRCode(string encryptedStr)
        {
            string passPhase = "m@e@ca$123";
            encryptedStr += "==";
            encryptedStr = encryptedStr.Replace("*", "/").Replace("-", "+");
            string decryptedValue = DecryptString(encryptedStr, passPhase);
            return decryptedValue;
        }
        public static string DecryptString(string cipherText, string passPhrase)
        {
            try
            {
                const string initVector = "pemghil9uzpgzl88";
                //const int keysize = 256;
                //byte[] initVectorBytes = Encoding.UTF8.GetBytes(initVector);

                //byte[] cipherTextBytes = Convert.FromBase64String(cipherText);
                //PasswordDeriveBytes password = new PasswordDeriveBytes(passPhrase, null);
                //byte[] keyBytes = password.GetBytes(keysize / 8);
                //RijndaelManaged symmetricKey = new RijndaelManaged();
                //symmetricKey.Mode = CipherMode.CBC;
                //ICryptoTransform decryptor = symmetricKey.CreateDecryptor(keyBytes, initVectorBytes);
                //MemoryStream memoryStream = new MemoryStream(cipherTextBytes);
                //CryptoStream cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read);
                //byte[] plainTextBytes = new byte[cipherTextBytes.Length];
                //int decryptedByteCount = cryptoStream.Read(plainTextBytes, 0, plainTextBytes.Length);
                //memoryStream.Close();
                //cryptoStream.Close();
                //return Encoding.UTF8.GetString(plainTextBytes, 0, decryptedByteCount);
                const int keysize = 256;
                byte[] initVectorBytes = Encoding.UTF8.GetBytes(initVector);

                byte[] cipherTextBytes = Convert.FromBase64String(cipherText);
                PasswordDeriveBytes password = new PasswordDeriveBytes(passPhrase, null);
                byte[] keyBytes = password.GetBytes(keysize / 8);
                RijndaelManaged symmetricKey = new RijndaelManaged();
                symmetricKey.Mode = CipherMode.CBC;
                ICryptoTransform decryptor = symmetricKey.CreateDecryptor(keyBytes, initVectorBytes);
                MemoryStream memoryStream = new MemoryStream(cipherTextBytes);
                CryptoStream cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read);
                byte[] plainTextBytes = new byte[cipherTextBytes.Length];
                int decryptedByteCount = cryptoStream.Read(plainTextBytes, 0, plainTextBytes.Length);
                memoryStream.Close();
                cryptoStream.Close();
                return Encoding.UTF8.GetString(plainTextBytes, 0, decryptedByteCount);
            }
            catch (Exception ex)
            {
                return "Invalid";
            }
        }
        public string Base64ToFile(string Base64Data, string extension)
        {
            try
            {
                if (Base64Data != null)
                {
                    Span<byte> buffer = new Span<byte>(new byte[Base64Data.Length]);
                    if (Base64Data != null)
                    {
                        string[] ImageBase64 = Base64Data.Split(',');
                        if (ImageBase64 != null && ImageBase64.Length >= 2)
                        {
                            if (Convert.TryFromBase64Chars(ImageBase64[1], buffer, out int bytesParsed))
                            {
                                var baseUrl = "";
                                string uniqueFileName = Guid.NewGuid().ToString();
                                string fileName = uniqueFileName + "." + extension;
                                string imageFileName = $"{ fileName}";
                                byte[] Bytes = Convert.FromBase64String(ImageBase64[1]);
                                if (!System.IO.Directory.Exists(@"wwwroot\ProductImage"))
                                {
                                    System.IO.Directory.CreateDirectory(@"wwwroot\ProductImage");
                                }
                                //var rootFolder = this.env.WebRootPath;
                                string imgPath = Path.Combine(@"wwwroot/ProductImage", imageFileName);
                                File.WriteAllBytes(imgPath, Bytes);
                                //uploadedUrl = baseUrl + imageFileName;
                                return imgPath;
                            }
                            //uploadedUrl = null;
                            return "";
                        }
                        //uploadedUrl = null;
                        return "";
                    }
                    else
                    {
                        //uploadedUrl = null;
                        return "";
                    }
                }
                else
                {
                    //uploadedUrl = null;
                    return "";
                }
            }
            catch (Exception e)
            {
                //uploadedUrl = e.Message;
                return "";
            }
        }


    }
    public class CommonUtilsReport
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SortBy { get; set; }
        public string SortOrder { get; set; }
        public string Search { get; set; }
        public bool IsActive { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }
        public class CheckNumbers
    {
        public int CheckRangeData(dynamic list, decimal? FromNo, decimal? ToNo)
        {
            int i = 0;
            CheckRange[] include = new CheckRange[list.Count];
            CheckRange[] NewRange = new CheckRange[include.Length + 1];


            for (int j = 0; j < list.Count; j++)
            {
                include[j] = new CheckRange(list[j].FromNumber, list[j].ToNumber);
            }

            foreach (CheckRange item in include)
            {
                if (item.Start <= FromNo && item.End >= ToNo)
                {
                    i++;
                }
            }
            return i;
        }
        public class CheckRange
        {
            public Nullable<decimal> Start { get; set; }
            public Nullable<decimal> End { get; set; }

            public CheckRange(decimal? start, decimal? end)
            {
                this.Start = start;
                this.End = end;
            }
        }
    }
    public class ReportRequest
    {
        [Required]
        public int pageSize { get; set; }
        [Required]
        public int pageNumber { get; set; }
        public string sortBy { get; set; }
        public int? First { get; set; }
        public int? UserId { get; set; }
        public string sortOrder { get; set; }
        public string search { get; set; }
        public string sortColumn { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
 
    }


}
