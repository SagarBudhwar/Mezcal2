using Mezcal.Dtos;
using Mezcal.IRepository;
using Mezcal.Models;
using Mezcal.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Mezcals.IRepository;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Hosting;
using System.Web;

namespace Mezcal.Controllers
{
    public class ReportsController : BaseController
    {
        private readonly IReportRepository _reportRepository;
        public ReportsController(IReportRepository reportRepository, IWebHostEnvironment env)
        {
            _reportRepository = reportRepository;
           
        }
        [HttpPost]
        public async Task<IActionResult> ScanLogReport(CommonUtilsReport request)
        {
            var list = await _reportRepository.ScanLogReportByDate(request);

            if (!list.Any())
            {
                return Ok(new { ResponseData = "", ResponseMessage = "", ResponseCode = HttpStatusCode.NotFound });
            }
            else
            {
                return Ok(new { ResponseData = list, ResponseMessage = "", ResponseCode = HttpStatusCode.OK });
                // return Ok(list);
            }
        }

        [HttpPost]
        public async Task<IActionResult> GetFeedbackReport(ReportRequest request)
        {
            HttpResponse<ProductAuth> res = new HttpResponse<ProductAuth>();
        
               // request.pageNumber = Convert.ToInt32(Math.Ceiling(Convert.ToDecimal(request.First) / Convert.ToDecimal(request.pageSize)));

                IEnumerable<ProductAuth> _users = null;
                _users = await  _reportRepository.GetFeedbackReport(request);

                if (_users != null && _users.Count() > 0)
                {
                    res.ResponseCode = "200";
                    res.ResponseMessage = "successfully";
                    res.ResponseData = _users;
                return Ok(new { ResponseData = res, ResponseMessage = res.ResponseMessage, ResponseCode = HttpStatusCode.Found });
                
                }
                else
                {
                    res.ResponseCode = "200";
                    res.ResponseMessage = "no data found";
                return Ok(new { ResponseData = "", ResponseMessage = "", ResponseCode = HttpStatusCode.NotFound });
            }
           
          
        }
     


    }
}
