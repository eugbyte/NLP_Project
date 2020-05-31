using AngleSharp;
using AngleSharp.Dom;
using Force.DeepCloner;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NLP.Exceptions;
using NLP.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace NLP.Services
{
    public class WebScrapService : IWebScrapService
    {
        private readonly string baseAddress = "http://127.0.0.1:8000";

        public async Task<string> AnalyzeWebPage(DocumentSearchQueryViewModel vm)
        {
            CheckValidityOfData(vm.documents);

            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseAddress);

                HttpResponseMessage response = await client.PostAsJsonAsync<DocumentSearchQueryViewModel>("analyzeSentiment", vm);
                HttpContent content = response.Content;
                string jsonStringResult = await content.ReadAsStringAsync();  //the string will be serialized in the Ok() method in the controller
                return jsonStringResult;
            }
        }

        protected void CheckValidityOfData(List<DocumentViewModel> documents)
        {
            List<string> sentiments = documents.Select(doc => doc.sentiment).ToList();
            HashSet<string> uniqueSentiments = new HashSet<string>(sentiments);
            if (uniqueSentiments.Count < 2)
                throw new DataPreprocessingException("Data Set must have 2 or more sentiments for classifier to work");

            if (documents.Count < 3)
                throw new DataPreprocessingException("test dataset set to 1/3 of total data" +
                    "sample size must be at least 3");
        }

        public async Task<string> ScrapWebPage(string url)
        {
            //source = @"https://www.glassdoor.sg/Interview/ST-Engineering-Interview-Questions-E1451658.htm";
            //source = @"https://www.yelp.com/biz/capitol-theatre-singapore";
            //source = @"https://www.burpple.com/park-bench-deli";

            List<DocumentViewModel> documents = await ParseHTML(url);

            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseAddress);

                HttpResponseMessage response = await client.PostAsJsonAsync<List<DocumentViewModel>>("vader", documents);

                //Throw exception when response status is not a status code
                response.EnsureSuccessStatusCode();

                HttpContent content = response.Content;
                string jsonStringResult = await content.ReadAsStringAsync();

                return jsonStringResult;
            }
        }

        protected async Task<List<DocumentViewModel>> ParseHTML(string source)
        {
            IConfiguration config = Configuration.Default.WithDefaultLoader();
            IBrowsingContext context = BrowsingContext.New(config);
            IDocument dom = await context.OpenAsync(source);

            if (dom == null)
                throw new WebScrappingException("The website might not exist");

            List<DocumentViewModel> documents = dom.All
                .Where(element => !string.IsNullOrEmpty(element.TextContent))
                .Where(element => !IsAncestorLink(element))
                .Select(element => new DocumentViewModel
                {
                    textContent = element.TextContent,
                    name = element.LocalName,
                    isAncestorLink = IsAncestorLink(element),
                })
                .Where((DocumentViewModel document) => document.name == "p")
                .Where(document => IsSentenceMoreThanNWords(document.textContent, 4))
                .ToList();

            documents.ForEach(document => document.textContent.Replace("\r\n", "").Replace("\r", ""));
            documents = documents.GroupBy(document => document.textContent)
                .Select(grp => grp.First())
                .Take(20)
                .ToList();

            return documents;
        }

        protected bool IsAncestorLink(IElement element)
        {
            IElement parent = element.ParentElement;
            if (parent == null)
                return false;
            List<INode> ancestors = element.Ancestors().ToList();
            return ancestors.Any(ancestor => ancestor.NodeName == "BUTTON"
                || ancestor.NodeName == "I"
                || ancestor.NodeName == "A");
        }

        protected bool IsSentenceMoreThanNWords(string sentence, int minWords)
        {
            //Regex used here to detect words that have more than one whitespace in between
            RegexOptions options = RegexOptions.None;
            Regex regex = new Regex("[ ]{2,}", options);
            sentence = regex.Replace(sentence, " ");
            int count = 0;
            string[] words = sentence.Split(" ");
            words.ToList().ForEach(word =>
            {
                if (Regex.IsMatch(word, @"^[a-zA-Z]+$"))
                    count += 1;
            });
            return count > minWords;
        }
    }
}
