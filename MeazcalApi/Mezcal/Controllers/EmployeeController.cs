using Mezcal.Dtos;
using Mezcal.IRepository;
using Mezcal.Models;
using Mezcals.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;

namespace Mezcal.Controllers
{
    public class EmployeeController : BaseController
    {
        private readonly IEmployeeRepository _empRepository;
        public EmployeeController(IEmployeeRepository empRepository)
        {
            _empRepository = empRepository;
        }

        [HttpPost]
        public async Task<ActionResult> SaveEmployee(Employee employee)
        {
            CommonResponse commonResponse = await _empRepository.SaveEmployee(employee);

        if(commonResponse.RespCd==1){
                return Ok(new { ResponseData = new object(), ResponseMessage = commonResponse.RespMsg, ResponseCode = HttpStatusCode.OK });
            }

            else
            {
                return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "Data not saved !!", ResponseData = new { } });

            }

        } 
}
    
}
