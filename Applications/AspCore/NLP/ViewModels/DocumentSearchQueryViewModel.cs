using AngleSharp.Dom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NLP.ViewModels
{
    public class DocumentSearchQueryViewModel
    {
        public string searchQuery { get; set; }
        public List<DocumentViewModel> documents { get; set; }
    }
}
