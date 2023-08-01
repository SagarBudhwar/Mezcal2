using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Mezcal.IRepository;
using Mezcal.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Mezcal.Controllers
{
    [AllowAnonymous]
    public class DashboardController : BaseController
    {
        private readonly IDashboardRepository _dashboard;
        public DashboardController(IDashboardRepository repository)
        {
            _dashboard = repository;
        }
        /// <summary>
        /// Get total count for dashboard
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetCountForDashboard()
        {
            var result = await _dashboard.GetCountForDashboard();
            if (result.Any())
            {
                return Ok(new { ResponseCode = 200, ResponseMessage = "Data Available", ResponseData = result });
            }
            else
            {
                return Ok(new { ResponseCode = 400, ResponseMessage = "Data Not Available", ResponseData = result});
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetMappingDataForDashboard(int year)
        {
            var result = await _dashboard.GetMappingData(year);
            return Ok(new { ResponseCode = 200, ResponseMessage = "Data Available", ResponseData = result });
        }
        [HttpGet]
        public async Task<IActionResult> GetDeMappingDataForDashboard(int year)
        {
            var result = await _dashboard.GetDeMappingDataForDashboard(year);
                return Ok(new { ResponseCode = 200, ResponseMessage = "Data Available", ResponseData = result });
        }
        [HttpGet]
        public async Task<IActionResult> GetDamageDataForDashboard(int year)
        {
            var result = await _dashboard.GetDamageDataForDashboard(year);
            return Ok(new { ResponseCode = 200, ResponseMessage = "Data Available", ResponseData = result });
        }
        [HttpGet]
        public async Task<IActionResult> GetStolenDataForDashboard(int year)
        {
            var result = await _dashboard.GetStolenDataForDashboard(year);
            return Ok(new { ResponseCode = 200, ResponseMessage = "Data Available", ResponseData = result });
        }
        [HttpGet]
        public async Task<IActionResult> GetRegisteredDataForDashboard(int year)
        {
            var result = await _dashboard.GetRegisteredDataForDashboard(year);
            return Ok(new { ResponseCode = 200, ResponseMessage = "Data Available", ResponseData = result });
        }

    }
}
