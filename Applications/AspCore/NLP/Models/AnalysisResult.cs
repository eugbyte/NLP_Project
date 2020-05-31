using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;

namespace NLP.Models
{
    public class AnalysisResult
    {
        public int AnalysisResultId { get; set; }

        public string Url { get; set; }
        public double AccuracyScore { get; set; }
        public string ConfusionMatrix { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

    }
}