using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NLP.Data;
using NLP.Models;
using NLP.Services;
using NLP.ViewModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NLP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalysisResultController : Controller
    {
        private IAnalysisResultService analysisResultService;

        public AnalysisResultController(NlpDbContext db)
        {
            analysisResultService = new AnalysisResultService(db);
        }

        [HttpGet]
        public async Task<ActionResult> GetAnalysisResults()
        {
            List<AnalysisResult> webPages = await analysisResultService.GetAllAnalysisResults();
            return Ok(webPages);
        }

        [HttpPost("saveResult")]
        public async Task<ActionResult> SaveResult(AnalysisResult webPage)
        {
            await analysisResultService.SaveAnalysis(webPage);
            return  Ok("results saved");
        }

        [HttpDelete("{analysisResultId}")]
        public async Task <ActionResult> DeleteAnalysisResult(int analysisResultId)
        {
            await analysisResultService.DeleteAnalysisResult(analysisResultId);
            return Ok("webPage deleted");
        }
        


    }
}
