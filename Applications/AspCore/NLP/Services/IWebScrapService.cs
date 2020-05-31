using NLP.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NLP.Services
{
    public interface IWebScrapService
    {
        Task<string> AnalyzeWebPage(DocumentSearchQueryViewModel vm);
        Task<string> ScrapWebPage(string url);

    }
}
