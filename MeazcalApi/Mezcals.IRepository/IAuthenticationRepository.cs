using Mezcal.Dtos;
using Mezcal.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
namespace Mezcal.IRepository
{
    public interface IAuthenticationRepository
    {
        Task<ProductAuthResponse> VerifyProduct(ProductAuth productAuth);
        Task<FakeResponse> VerifyFakeProduct(ProductAuth productAuth);
        Task<FeedbackResponse> UpdateFeedback(Productfeedback productAuth);
        Task<List<ScanLogHistoryResponse>> GetScanLogData(int UserID);

    }
}
