using Mezcal.Data;
using Mezcal.IRepository;
using Mezcals.IRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Mezcal.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Mezcal.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICommonRepository, CommonMasterRepository>();
            services.AddScoped<IHologramStockRepository, HologramStockRepository>();
            services.AddScoped<IDamageRepository, DamageRepository>();
            services.AddScoped<IMappingRepository, MappingRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IStolenRepository, StolenRepository>();
            services.AddScoped<IDashboardRepository, DashboardRepository>();
            services.AddScoped<IReportRepository, ReportRepository>();
            services.AddScoped<IAuthenticationRepository, ProductAuthRepository>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();


            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState
                        .Where(e => e.Value.Errors.Count > 0)
                        .SelectMany(x => x.Value.Errors)
                        .Select(x => x.ErrorMessage).ToArray();

                    var errorResponse = new ApiValidationErrorResponse
                    {
                        Errors = errors
                    };

                    return new BadRequestObjectResult(errorResponse);
                };
            });

            return services;
        }
    }
}
