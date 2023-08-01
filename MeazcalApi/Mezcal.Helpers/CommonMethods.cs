using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;

namespace Mezcal.Helpers
{
    public class CommonMethods
    {
        public static string sendEmailViaWebApi(string toEmail, string baseURL, string customerName)
        {
            string Body = string.Empty;
            Body = System.IO.File.ReadAllText
               (baseURL+"~/HtmlPages/password_recovery.html");
            Body = Body.Replace("#CustomerName#", customerName);
            Body = Body.Replace("#NewPassword#", "1234");

            MailMessage mail = new MailMessage();
            mail.To.Add(toEmail);
            mail.From = new MailAddress("HolostikBi@holostik.com");
            mail.Subject = "Reset Password Link";
            mail.IsBodyHtml = true;
            mail.Body = Body;
            mail.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.office365.com"; //Or Your SMTP Server Address
            smtp.Port = 587;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new System.Net.NetworkCredential("HolostikBi@holostik.com", "Baho9485"); // ***use valid credentials***
            smtp.EnableSsl = true;
            smtp.Send(mail);
            return "Mail Successfully Sent";



        }

    }
}
