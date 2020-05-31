using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using NLP.Exceptions;
using NLP.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace NLP.Filters
{
    public class GlobalExceptionFilter : IExceptionFilter
    {
        private readonly ILogger logger;

        public GlobalExceptionFilter()
        {
            logger = LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
                builder.AddEventSourceLogger();
            }).CreateLogger("exception logging");
        }
        public void OnException(ExceptionContext context)
        {
            logger.LogInformation(context.Exception.ToString());

            HttpResponse response = context.HttpContext.Response;
            ErrorResponseViewModel errorVM = CreateErrorResponseVM(context);

            if (context.Exception is HttpRequestException)
            {
                errorVM.Summary = "Machine learning server encoutered an error";
                response.StatusCode = StatusCodes.Status500InternalServerError;
            }
            else if (context.Exception is WebScrappingException)
            {
                errorVM.Summary = "Error encountered when attempting to scrap website";
                response.StatusCode = StatusCodes.Status500InternalServerError;
            }
            else if (context.Exception is DataPreprocessingException)
            {
                errorVM.Summary = "Documents submitted for analysis is not preprocessed properly";
                response.StatusCode = StatusCodes.Status400BadRequest;
            }
            else
            {
                errorVM.Summary = "An unhandled error occured";
                response.StatusCode = StatusCodes.Status500InternalServerError;
            }
        }

        protected ErrorResponseViewModel CreateErrorResponseVM(ExceptionContext exceptionContext)
        {
            ErrorResponseViewModel errorVM = new ErrorResponseViewModel();
            errorVM.Message = exceptionContext.Exception.Message;
            errorVM.Path = exceptionContext.HttpContext.Request.Path;
            errorVM.StackTrace = (exceptionContext.Exception.StackTrace)?.Substring(0, 500);
            errorVM.ExceptionName = exceptionContext.GetType().ToString();
            errorVM.InnerException = exceptionContext.Exception.InnerException?.Message;
            return errorVM;
        }
    }
}
