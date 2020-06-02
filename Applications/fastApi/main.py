from typing import List

from fastapi import FastAPI

from src.models.Document import Document
from src.models.DocumentSearchQueryViewModel import DocumentSearchQueryViewModel
from src.services.tfidf.tfidf_cos_similarity_analysis import order_documents_by_relevance
from src.services.tfidf.tfidf_sentiment_analysis import tfidf_sentiment_analysis
from src.services.vader.vader_sentiment_analysis import vader_sentiment_analysis
from fastapi.encoders import jsonable_encoder

app = FastAPI()



@app.post("/vader")
async def vader_sentiment(documents: List[Document]):
    for doc in documents:
        print(doc.textContent)
    result: List[Document] = vader_sentiment_analysis(documents)
    return jsonable_encoder(result)


@app.post("/analyzeSentiment")
async def analyze_sentiment(document_query_view_model: DocumentSearchQueryViewModel):
    documents: List[Document] = document_query_view_model.documents
    search_query: str = document_query_view_model.searchQuery
    result = tfidf_sentiment_analysis(documents, search_query)
    if not search_query.isspace():
        result["cosine_df"] = order_documents_by_relevance(documents, search_query)
        print(result["cosine_df"])
    return jsonable_encoder(result)


@app.get("/")
async def root():
    return {"message": "Hello World"}

# To run the application, key in the following in the terminal:
# uvicorn main:app --reload
