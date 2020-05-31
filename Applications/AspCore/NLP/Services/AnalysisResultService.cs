using AngleSharp;
using AngleSharp.Dom;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NLP.Data;
using NLP.Models;
using NLP.ViewModels;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace NLP.Services
{
    public class AnalysisResultService : IAnalysisResultService
    {
        protected NlpDbContext db;

        public AnalysisResultService(NlpDbContext db)
        {
            this.db = db;
        }

        public async Task< List<AnalysisResult>> GetAllAnalysisResults()
        {
            List<AnalysisResult> analysisResults = await db.AnalysisResults.ToListAsync();
            return RemoveSelfReference(analysisResults);
        }

        public async Task SaveAnalysis(AnalysisResult _analysisResult)
        {

            AnalysisResult analysisResult = new AnalysisResult();

            //Check if url already exists in database. If so, update, else, create
            AnalysisResult existingResult = await db.AnalysisResults.Where(wp => wp.Url == _analysisResult.Url).FirstOrDefaultAsync();
            if (existingResult != null)
                analysisResult = existingResult;

            analysisResult.AccuracyScore = _analysisResult.AccuracyScore;
            analysisResult.ConfusionMatrix = _analysisResult.ConfusionMatrix;
            analysisResult.Url = _analysisResult.Url;
            analysisResult.UserId = "1";

            if (existingResult != null)
            {
                await db.SaveChangesAsync();
                return;
            }

            db.AnalysisResults.Add(analysisResult);
            await db.SaveChangesAsync();
        }
        
        public async Task DeleteAnalysisResult(int analysisResultId)
        {
            AnalysisResult analysisResult = await db.AnalysisResults.FindAsync(analysisResultId);
            db.AnalysisResults.Remove(analysisResult);
            await db.SaveChangesAsync();
        }

        protected AnalysisResult RemoveSelfReference(AnalysisResult analysisResult)
        {
            if (analysisResult.User != null)
            {
                analysisResult.User.AnalysisResults = null;
            }
            return analysisResult;
        }

        protected List<AnalysisResult> RemoveSelfReference(List<AnalysisResult> analysisResults)
        {
            analysisResults.ForEach(webPage => RemoveSelfReference(webPage));
            return analysisResults;
        }


    }
}
