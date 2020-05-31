using AngleSharp.Dom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NLP.ViewModels
{
    public class DocumentViewModel
    {
        //Variables need to be lower case for FastApi to process
        public string name { get; set; }
        public string textContent { get; set; }
        public bool isAncestorLink { get; set; }
        public int count { get; set; }
        public string sentiment { get; set; }
    }
}
