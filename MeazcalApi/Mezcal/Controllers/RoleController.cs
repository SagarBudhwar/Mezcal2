using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mezcal.Data;
using Mezcal.Models;
using Mezcal.Dtos;
using Mezcal.IRepository;
using System.Net;

namespace Mezcal.Controllers
{
    [Authorize]
    public class RoleController : BaseController
    {
        private readonly IRoleRepository _roleRepository;
        public RoleController(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }
        [HttpPost]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetRoles(CommonUtils commonUtils)
        {
            var rolesfromRepo = await _roleRepository.GetRole(commonUtils);
          

            if (rolesfromRepo.Any())
            {
                return Ok(new { ResponseData = rolesfromRepo, ResponseMessage = "Record found !!", ResponseCode = HttpStatusCode.OK });
            }
            else
            {
                return Ok(new { ResponseData = rolesfromRepo, ResponseMessage = "Record not found !!", ResponseCode = 201 });
            }

           
        }


        /// <summary>
        /// This method use to create and update role in application
        /// </summary>
        /// <param name="request"></param>
        /// <returns code="200">Message of action</returns>
        [HttpPost]
        [ProducesResponseType(200)]
        public async Task<IActionResult> CreateUpadteRole(RoleRequest request)
        {
            var createRole = await _roleRepository.CreateUpdateRole(request);

            return Ok(createRole);
        }


        /// <summary>
        /// This method use to map page to role in application
        /// </summary>
        /// <param name="request"></param>
        /// <returns code="200">Message of action</returns>
        [HttpPost]
        [ProducesResponseType(200)]
        public async Task<IActionResult> MapPageRole(MapRolePageRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _roleRepository.AssignPageToRole(request);

          //  return Ok(result);

            if (result.RespCd==200)
            {
                return Ok(new { ResponseData = result, ResponseMessage = result.RespMsg, ResponseCode = HttpStatusCode.OK });
            }
            else
            {
                //return Ok(new { ResponseData = result, ResponseMessage = "Role can't be assigned !!", ResponseCode = 201 });
                return Ok(new { ResponseData = result, ResponseMessage = "No se puede asignar el rol !!", ResponseCode = 201 });
            }

        }


        /// <summary>
        /// To get role for different users
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetRoleForUsers()
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _roleRepository.GetRoleForUsers();

            return Ok(result);

        }

        /// <summary>
        /// This method use to get role detail  in application
        /// </summary>
        /// <param name="id"></param>
        /// <returns code="200">Message of action</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetRoleDetail(int id)
        {

            IEnumerable<RoleAccess> result = await _roleRepository.GetRoleAccesses(id);

            if (!result.Any())
            {
               return Ok(result);
               // return NotFound("No Record found!");

            }

         //   return Ok(new { ResponseData = result, ResponseMessage = "Record found !!", ResponseCode = HttpStatusCode.OK });
            return Ok(result);
        }

        /// <summary>
        /// This method use to get pages for SPA user
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns code="200">Message of action</returns>
        [HttpGet("{roleId}")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetPagesForUser(int roleId)
        {
            var result = await _roleRepository.GetPageByRoleId(roleId);

            if (!result.Any())
                return NotFound("No Record found!");

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetUserRoleListForDdl()
        {
            var userlist = await _roleRepository.GetUserRoleListForDdl();

            if (userlist.Count() > 0)
            {
                return Ok(new { ResponseCode = HttpStatusCode.OK, ResponseMessage = "Data Found", ResponseData = userlist });
            }
            else
            {
                return Ok(new { ResponseCode = HttpStatusCode.NotFound, ResponseMessage = "Data Not Found", ResponseData = userlist });
            }
        }


    }
}
