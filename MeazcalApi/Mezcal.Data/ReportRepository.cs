using Mezcal.Dtos;
using Mezcal.Helper;
using Mezcal.Models;
using Mezcals.IRepository;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Security.Claims;
using System.Threading.Tasks;
using Dapper;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Mezcal.IRepository;

namespace Mezcal.Data
{
   public class ReportRepository:IReportRepository
    {
        private readonly IOptions<DbConnection> _appSettings;
        public ReportRepository(IOptions<DbConnection> appsetting)
        {
            _appSettings = appsetting;
        }
        public async Task<List<ScanLogList>> ScanLogReportByDate(CommonUtilsReport commonUtils)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                string sql = "SpGetVerificationReport";

                var reslist = await dbConnection.QueryAsync<ScanLogList>(sql, new
                {
                    @PageNo = commonUtils.PageNumber,@PageSize = commonUtils.PageSize,
                    @SortOrder = commonUtils.SortOrder,
                    @SearchValue = commonUtils.Search,
                    @UserId = "",
                    @SortColumn = commonUtils.SortBy,
                    commonUtils.FromDate,
                    commonUtils.ToDate
                }, commandType: CommandType.StoredProcedure);
                return reslist.ToList();
            }

        }
        public async Task<IEnumerable<ProductAuth>> GetFeedbackReport(ReportRequest request)
        {
            IEnumerable<ProductAuth> _resResult = null;
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                _resResult = await con.QueryAsync<ProductAuth>("spGetFeedbackReport", new
                {
                    request.pageNumber,
                    request.search,
                    request.pageSize,
                    request.sortBy,
                    request.sortOrder,
                    //request.sortColumn,
                    request.FromDate,
                    request.ToDate
                 
                }, commandType: CommandType.StoredProcedure);
            }

            return _resResult;
        }

    }

}
