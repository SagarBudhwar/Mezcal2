using Mezcal.Dtos;
using Mezcal.Helper;
using Mezcal.IRepository;
using Mezcal.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace Mezcal.Data
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly IOptions<DbConnection> _appSettings;

        public EmployeeRepository(IOptions<DbConnection> appsetting)
        {
            _appSettings = appsetting;
        }
        public async Task<CommonResponse> SaveEmployee(Employee employee)
        {

            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                return await dbConnection.QueryFirstOrDefaultAsync<CommonResponse>("pr_SaveEmployee",
                       param: new
                       {
                           employee.Name,
                           employee.Address
                       },
                       commandType: CommandType.StoredProcedure);


            }
        }
    }
}
