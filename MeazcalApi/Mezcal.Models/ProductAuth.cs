using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Mezcal.Models
{
    public class ProductAuth
    {
        public int VerificationId { get; set; }
        public int FeedbackId { get; set; }
        public string DeviceId { get; set; }
        public string UID { get; set; }
        public int? UserID { get; set;}
        public string ScanFrom { get; set; }
        public string SeqNo { get; set; }
        public string VerifiedDt { get; set; }
        public string VerifiedBy { get; set; }
        public string ProductName { get; set; }
        public string MobNo { get; set; }
        public string Email { get; set; }
        public string Usrlongitude { get; set; }
        public string Usrlatitude { get; set; }
        public string ResultMessage { get; set; }
        public int Status { get; set; }
        public string UsrCity { get; set; }
        public string FCity { get; set; }
        public string UsrState { get; set; }
        public string UsrCntry { get; set; }
        public string UsrZip { get; set; }
        public int ProductId { get; set; }
        public string UsrAdrs { get; set; }
        public string Name { get; set; }
        public string UsrFeedback { get; set; }
        public string Rating { get; set; }
        public int VerificationType { get; set; }
        public string VerificationMode { get; set; }
        public string PurchaseImg { get; set; }
        public string Prefix { get; set; }
        public string PurchasedFrm { get; set; }
        public int TotalRows { get; set; }

    }
    public class Productfeedback
    {
        public int VerificationId { get; set; }
        [Required]
        public int FeedbackId { get; set; }
        public string Rating { get; set; }
        public string UID { get; set; }
        public string SeqNo { get; set; }
        public string VeifiedDt { get; set; }
        public string VerifiedBy { get; set; }
        //[Required(ErrorMessage = "Please enter your mobile no.")]
        public string MobNo { get; set; }
        public string Email { get; set; }
        public float Usrlongitude { get; set; }
        public float Usrlatitude { get; set; }
        public string ResultMessage { get; set; }
        public int Status { get; set; }
        public string UsrCity { get; set; }
        public string FCity { get; set; }
        public string UsrState { get; set; }
        public string UsrCntry { get; set; }
        public string UsrZip { get; set; }
        public int ProductId { get; set; }
        public string UsrAdrs { get; set; }
        [Required(ErrorMessage = "Please enter your name.")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Please enter your feedback.")]
        public string UsrFeedback { get; set; }
        public int VerificationType { get; set; }
        public string VerificationMode { get; set; }
 
        public int TotalRows { get; set; }
    }
    
}
