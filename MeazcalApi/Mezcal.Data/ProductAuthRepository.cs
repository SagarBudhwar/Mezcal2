using Dapper;
using Microsoft.Extensions.Options;
using Mezcal.Dtos;
using Mezcal.Helpers;
using Mezcal.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mezcal.Data;
using Mezcal.Helper;
using Mezcal.IRepository;

namespace Mezcal.Data
{
    public class ProductAuthRepository :IAuthenticationRepository
    {
        private readonly IOptions<DbConnection> _appSettings;
        public ProductAuthRepository(IOptions<DbConnection> appSettings)
        {
            _appSettings = appSettings;
        }
        /// <summary>
        /// Verify Product when Scanning
        /// </summary>
        /// <param name="productAuth"></param>
        /// <returns></returns>
        public async Task<ProductAuthResponse> VerifyProduct(ProductAuth productAuth)
        {

            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                var _resResult = await con.QueryFirstOrDefaultAsync<ProductAuthResponse>("SpVerifyProduct",
                      param: new
                      {
                    @UID = productAuth.UID,
                    @Prefix = productAuth.Prefix,
                    @SeqNo = productAuth.SeqNo,
                    @VerifiedBy = productAuth.VerifiedBy,
                    @MobNo = productAuth.MobNo,
                    @Email = productAuth.Email,
                    @Usrlongitude = productAuth.Usrlongitude,
                    @Usrlatitude = productAuth.Usrlatitude,
                    @VerificationType = productAuth.VerificationType,
                    @VerificationMode = productAuth.VerificationMode,
                    @UsrCity = productAuth.UsrCity,
                    @UsrState = productAuth.UsrState,
                    @UsrCntry = productAuth.UsrCntry,
                    @UsrAdrs = productAuth.UsrAdrs,
                    @UsrZip = productAuth.UsrZip,
                    @DeviceId = productAuth.DeviceId,
                    @UserID = productAuth.UserID,
                    @ScanFrom = productAuth.ScanFrom

                }, commandType: CommandType.StoredProcedure);

              
                return _resResult;
            }
        }
        public async Task<FakeResponse> VerifyFakeProduct(ProductAuth productAuth)
        {

            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                var _resResult = await con.QueryFirstOrDefaultAsync<FakeResponse>("uspInsertInVerificationLogWhenNotValidURL",
                      param: new
                      {
                          @UID = productAuth.UID,
                          @SeqNo = productAuth.SeqNo,
                          @VerifiedBy = productAuth.VerifiedBy,
                          @MobNo = productAuth.MobNo,
                          @Email = productAuth.Email,
                          @Usrlongitude = productAuth.Usrlongitude,
                          @Usrlatitude = productAuth.Usrlatitude,
                          @VerificationType = productAuth.VerificationType,
                          @VerificationMode = productAuth.VerificationMode,
                          @UsrCity = productAuth.UsrCity,
                          @UsrState = productAuth.UsrState,
                          @UsrCntry = productAuth.UsrCntry,
                          @UsrAdrs = productAuth.UsrAdrs,
                          @UsrZip = productAuth.UsrZip,
                          @DeviceId = productAuth.DeviceId,
                          @UserID = productAuth.UserID,
                          @ScanFrom = productAuth.ScanFrom

                      }, commandType: CommandType.StoredProcedure);


                return _resResult;
            }
        }
        /// <summary>
        /// Save Feedback
        /// </summary>
        /// <param name="productAuth"></param>
        /// <returns></returns>
        public async Task<FeedbackResponse> UpdateFeedback(Productfeedback productAuth)
        {
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                var _resResult = await con.QueryFirstOrDefaultAsync<FeedbackResponse>("spUpdateFeedback", new
                {
                    @FeedbackId = productAuth.FeedbackId,
                    @Name = productAuth.Name,
                    @MobNo = productAuth.MobNo,
                    @Email = productAuth.Email,
                    @UsrCity = productAuth.UsrCity,
                    @UsrFeedback = productAuth.UsrFeedback,
                    @Rating     =productAuth.Rating

                }, 
                commandType: CommandType.StoredProcedure);

                return _resResult;
            }
        }
        public async Task<List<ScanLogHistoryResponse>> GetScanLogData(int UserID)
        {
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                var _resResult = await con.QueryAsync<ScanLogHistoryResponse>("uspScanLogReport", new
                {
                    UserID

                }, commandType: CommandType.StoredProcedure);

                return _resResult.ToList();
            }
        }
    }
}
