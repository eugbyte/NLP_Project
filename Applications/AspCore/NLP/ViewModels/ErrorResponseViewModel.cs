using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NLP.ViewModels
{
    public class ErrorResponseViewModel
    {
        public string Path { get; set; }
        public string Summary { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public string ExceptionName { get; set; }
        public string InnerException { get; set; }
    }
}
