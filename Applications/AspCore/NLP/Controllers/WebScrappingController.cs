using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NLP.Data;
using NLP.Services;
using NLP.ViewModels;

namespace NLP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WebScrappingController : ControllerBase
    {
        private IWebScrapService webScrapService;
        public WebScrappingController()
        {
            webScrapService = new WebScrapService();
        }

        [HttpPost("analyzeSentiment")]
        public async Task<ActionResult> Analyze(DocumentSearchQueryViewModel vm)
        {
            string stringyfiedResult = await webScrapService.AnalyzeWebPage(vm);
            return Ok(stringyfiedResult);
        }

        [HttpPost]
        public async Task<ActionResult> ScrapSite(UrlViewModel vm)
        {
            Console.WriteLine("URL: " + vm.Url);
            string stringyfiedResult = await webScrapService.ScrapWebPage(vm.Url);
            return Ok(stringyfiedResult);
        }
    }
}
