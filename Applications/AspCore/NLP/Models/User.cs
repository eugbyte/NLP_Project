using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NLP.Models
{
    public class User : IdentityUser
    {
        public override string Id { get => base.Id; set => base.Id = value; }

        public List<AnalysisResult> AnalysisResults { get; set; }

    }
}
