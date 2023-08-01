using Mezcal.Dtos;
using Mezcal.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Mezcal.IRepository
{
    public interface IEmployeeRepository
    { 
        Task<CommonResponse> SaveEmployee(Employee employee);
    }
}
