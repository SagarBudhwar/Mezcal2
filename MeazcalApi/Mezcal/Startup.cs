using Mezcal.Data;
using Mezcal.Extensions;
using Mezcal.Helper;
using Mezcal.Middlewares;
using Mezcals.IRepository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mezcal
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IConfiguration _configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();


            //.AddNewtonsoftJson(opt => { opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore; })
            //.AddFluentValidation(configuration => configuration.RegisterValidatorsFromAssemblyContaining<Startup>());

            /////////////// Db connection service
            services.Configure<DbConnection>(_configuration.GetSection("DbConnection"));

            services.AddCors();

            // refer extensions folder to add new dependency
            services.AddApplicationServices();


            ///////////// Adding Identity service for JWT
            services.AddIdentityServices(_configuration);



            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Mezcal", Version = "v1" });
            //});

            services.AddSwaggerDocumentation();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            ///////////////// ------ Our Custom Exception MiddleWare
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseStatusCodePagesWithReExecute("/errors/{0}");

           // app.UseSwaggerDocumentation();

            //app.UseSwagger();
            //app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Mezcal v1"));

            //app.UseSwaggerDocumentation();
            //if (env.IsDevelopment())
            //{
            //    app.UseDeveloperExceptionPage();
            //    app.UseSwagger();
            //    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Mezcal v1"));
            //}

            app.UseRouting();

            // We need to add cors between UseRouting and UseAuthorization.
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            //throw new NullReferenceException("Student object is null.");

            ////////////// Use this for Authorization for jwt
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseStaticFiles();


            app.UseSwaggerDocumentation();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
