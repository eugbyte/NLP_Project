using NLP.Models;
using NLP.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NLP.Services
{
    public interface IAnalysisResultService
    {
        Task<List<AnalysisResult>> GetAllAnalysisResults();
        Task SaveAnalysis(AnalysisResult analysisResult);
        Task DeleteAnalysisResult(int analysisResultId);
    }
}
