import copy
from typing import List
import pandas as pd
import nltk

nltk.download('vader_lexicon')
from nltk.sentiment.vader import SentimentIntensityAnalyzer

from src.models.Document import Document
from src.services.clean_data import clean_data


def vader_sentiment_analysis(documents: List[Document]) -> List[Document]:
    text_contents: List[str] = [document.textContent for document in documents]

    original_df = pd.DataFrame({'review': text_contents})
    df = copy.deepcopy(original_df)

    df = clean_data(df)

    sid = SentimentIntensityAnalyzer()
    df['compound_score'] = df["review"].apply(lambda text: sid.polarity_scores(text)['compound'])
    df['sentiment'] = df['compound_score'].apply(lambda score: convert_score_to_sentiment(score))
    df.drop("compound_score", 1, inplace=True)

    result_documents = copy.deepcopy(documents)

    for index, row in df.iterrows():
        doc = result_documents[index]
        doc.textContent = row["review"]
        doc.sentiment = row["sentiment"]

    return result_documents


def convert_score_to_sentiment(score):
    if score > 0:
        return "positive"
    elif score == 0:
        return "neutral"
    else:
        return "negative"
