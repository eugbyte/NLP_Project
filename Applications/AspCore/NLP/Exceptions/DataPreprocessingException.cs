using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NLP.Exceptions
{
    public class DataPreprocessingException : Exception
    {
        public DataPreprocessingException()
        {
        }

        public DataPreprocessingException(string message) : base(message)
        {
        }

        public DataPreprocessingException(string message, Exception inner) : base(message, inner)
        {
        }
    }
}
