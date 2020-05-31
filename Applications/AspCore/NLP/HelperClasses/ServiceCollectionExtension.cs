using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NLP.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using NLP.Services;
using NLP.Filters;

namespace NLP.HelperClasses
{
    public static class ServiceCollectionExtension
    {

        public static void AddDbContextExtension(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<NlpDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("MSSQL")));
        }

        public static void AddTransientServicesExtension(this IServiceCollection services)
        {
            services.AddTransient(typeof(IWebScrapService), typeof(WebScrapService));
            services.AddTransient(typeof(IAnalysisResultService), typeof(AnalysisResultService));
        }

        public static void AddGlobalExceptionFilterExtension(this IServiceCollection services)
        {
            services.AddMvc(options =>
            {
                options.Filters.Add(new GlobalExceptionFilter());
            });
        }
    }

}
