using System;
using System.Collections.Generic;
using System.Text;
using Mezcal.Dtos;
using System.Security.Claims;
using System.Threading.Tasks;
using Mezcal.Models;

namespace Mezcal.IRepository
{
    public interface IDashboardRepository
    {
        Task<List<DashboardCount>> GetCountForDashboard();
        Task<BarChartResponse> GetMappingData(int? year);
        Task<BarChartResponse> GetDeMappingDataForDashboard(int? year);
        Task<BarChartResponse> GetDamageDataForDashboard(int? year);
        Task<BarChartResponse> GetStolenDataForDashboard(int? year);
        Task<BarChartResponse> GetRegisteredDataForDashboard(int? year);

    }
}
