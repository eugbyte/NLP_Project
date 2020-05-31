using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NLP.Exceptions
{
    public class WebScrappingException : Exception
    {
        public WebScrappingException()
        {
        }

        public WebScrappingException(string message): base(message)
        {
        }

        public WebScrappingException(string message, Exception inner) : base(message, inner)
        {
        }
    }
}
