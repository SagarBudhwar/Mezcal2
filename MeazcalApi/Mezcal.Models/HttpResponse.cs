using System;
using System.Collections.Generic;
using System.Text;

namespace Mezcal.Models
{
    public class HttpResponse<T> where T : class
    {
        public string ResponseCode { get; set; }
        public string ResponseMessage { get; set; }
        public IEnumerable<T> ResponseData { get; set; }

    }
    public class SingleResponse<T> where T : class
    {
        public string ResponseCode { get; set; }
        public string ResponseMessage { get; set; }
        public T ResponseData { get; set; }
    }
    public class FakeResponse
    {
        public int VerificationID { get; set; }
        public string ResponseCode { get; set; }
        public string ResponseMessage { get; set; }
    }
    public class ProductAuthResponse
    {
        public int VerificationId { get; set; }
        public string SeqNo { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string BrandName { get; set; }
        public string Category { get; set; }

        public string Type { get; set; }
        public string Species { get; set; }
        public string Ingredients { get; set; }
        public string Presentation { get; set; }
        public string CertificationNo { get; set; }

        public string LotNo { get; set; }

        public string CompanyName { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public string State { get; set; }
        public string Atributes { get; set; }
        public string ResponseCode { get; set; }
        public string ResponseMessage { get; set; }
        //public string MarketedBy { get; set; }
        //public string CustomerCareDetails { get; set; }


        public string CreatedDt { get; set; }
        public string ProductImg { get; set; }

        public int FeedbackId { get; set; }
        public int Status { get; set; }

        public string GenuineAudio { get; set; }
  
      
    }
    public class FeedbackResponse
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string MobNo { get; set; }
        public string UsrFeedback { get; set; }
        public string UsrCity { get; set; }
        public string ResponseCode { get; set; }
        public string ResponseMessage { get; set; }
        public int FeedbackId { get; set; }
        public int Status { get; set; }

        public FeedbackResponse()
        {
            Name = string.Empty;
            Email = string.Empty;
            MobNo = string.Empty;
            UsrFeedback = string.Empty;
          
            ResponseMessage = string.Empty;
            ResponseCode = string.Empty;
        }


    }

    public class ScanLogHistoryResponse
    {
        public int VerificationId { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public string QrData { get; set; }
        public string ResultMessage { get; set; }
        public int Status { get; set; }
        public int SeqNo { get; set; }
        public string MobNo { get; set; }
        public string Email { get; set; }
        public string Remarks { get; set; }
        public string VerifiedBy { get; set; }
        public string VerifiedDt { get; set; }
        public string Usrlatitude { get; set; }
        public string Usrlongitude { get; set; }
        public string UsrAdrs { get; set; }
        public string ProductName { get; set; }
        public string Rating { get; set; }
        public string ScanFrom { get; set; }

    }

}
