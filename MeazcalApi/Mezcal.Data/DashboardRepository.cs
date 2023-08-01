using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Dapper;
using Mezcal.Dtos;
using Mezcal.IRepository;
using Microsoft.Extensions.Options;
using System.Data;
using Mezcal.Helper;
using System.Data.SqlClient;
using Mezcal.Models;

namespace Mezcal.Data
{
    public class DashboardRepository:IDashboardRepository
    {
        private readonly IOptions<DbConnection> _appSettings;
        public DashboardRepository(IOptions<DbConnection> appSettings)
        {
            _appSettings = appSettings;
        }
        public async Task<List<DashboardCount>> GetCountForDashboard()
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var res = await dbConnection.QueryAsync<DashboardCount>("uspGetCountForDashboard", commandType: CommandType.StoredProcedure);
                return res.ToList();
            }
        }
        public async Task<BarChartResponse> GetMappingData(int? year)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                List<DashboardResponse> resp = dbConnection.QueryAsync<DashboardResponse>("uspGetMappingDataBarChart", new
                {
                    year
                }, commandType: CommandType.StoredProcedure).Result.ToList();
                BarChartResponse barChart = new BarChartResponse();
                //var data = resp.Select(x => x.TotalCount).ToList();
                if (resp.Any())
                {
                    barChart.labels = (resp.Select(x => x.MonthName)).ToArray();
                    //Mapping
                    barChart.datasets.Add(new BarChartData { label = "Mapear", backgroundColor = "#9FAEEF", data = resp.Select(x => x.TotalCount).ToList() });
                }
                return await Task.Run(() => barChart);
            }
        }
        public async Task<BarChartResponse> GetDeMappingDataForDashboard(int? year)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                List<DashboardResponse> resp = dbConnection.QueryAsync<DashboardResponse>("uspGetDemappingData", new
                {
                    year
                }, commandType: CommandType.StoredProcedure).Result.ToList();
                BarChartResponse barChart = new BarChartResponse();
                if (resp.Any())
                {
                    barChart.labels = (resp.Select(x => x.MonthName)).ToArray();
                    //De-Mapping
                    barChart.datasets.Add(new BarChartData { label = "eliminar Mapeo", backgroundColor = "#A7C85F", data = resp.Select(x => x.TotalCount).ToList() });
                }
                return await Task.Run(() => barChart);
            }
        }
        public async Task<BarChartResponse> GetDamageDataForDashboard(int? year)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                List<DashboardResponse> resp = dbConnection.QueryAsync<DashboardResponse>("uspGetDamageDataForDashboard", new
                {
                    year
                }, commandType: CommandType.StoredProcedure).Result.ToList();
                BarChartResponse barChart = new BarChartResponse();
                if (resp.Any())
                {
                    barChart.labels = (resp.Select(x => x.MonthName)).ToArray();
                    //Damage
                    barChart.datasets.Add(new BarChartData { label = "dañado", backgroundColor = "#6BBAF3", data = resp.Select(x => x.TotalCount).ToList() });
                }
                return await Task.Run(() => barChart);
            }
        }
        public async Task<BarChartResponse> GetStolenDataForDashboard(int? year)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                List<DashboardResponse> resp = dbConnection.QueryAsync<DashboardResponse>("uspGetStolenDataForDashboard", new
                {
                    year
                }, commandType: CommandType.StoredProcedure).Result.ToList();
                BarChartResponse barChart = new BarChartResponse();
                if (resp.Any())
                {
                    barChart.labels = (resp.Select(x => x.MonthName)).ToArray();
                    //Stolen
                    barChart.datasets.Add(new BarChartData { label = "robado", backgroundColor = "#B382F7", data = resp.Select(x => x.TotalCount).ToList() });
                }
                return await Task.Run(() => barChart);
            }
        }
        public async Task<BarChartResponse> GetRegisteredDataForDashboard(int? year)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                List<DashboardResponse> resp = dbConnection.QueryAsync<DashboardResponse>("uspGetRegisteredUserDataForDashboard", new
                {
                    year
                }, commandType: CommandType.StoredProcedure).Result.ToList();
                BarChartResponse barChart = new BarChartResponse();
                if (resp.Any())
                {
                    barChart.labels = (resp.Select(x => x.MonthName)).ToArray();
                    barChart.datasets.Add(new BarChartData { label = "usuario registrado", backgroundColor = "#6290A0", data = resp.Select(x => x.TotalCount).ToList() });
                }
                return await Task.Run(() => barChart);
            }
        }
    }
}
