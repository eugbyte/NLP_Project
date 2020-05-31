from typing import List

from src.models.Document import Document
import pandas as pd
from sklearn.svm import LinearSVC
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn import metrics
from sklearn.metrics import confusion_matrix

from src.services.clean_data import clean_data
from src.services.tfidf.encode_data import encode_data
from src.services.tfidf.tfidf_vectorizer import create_tfidf_vectorizer


def tfidf_sentiment_analysis(documents: List[Document], search_query: str) -> object:
    text_contents: List[str] = [document.textContent for document in documents]
    sentiments: List[str] = [document.sentiment for document in documents]

    df = pd.DataFrame({'label': sentiments, 'review': text_contents})

    df = clean_data(df)
    df = encode_data(df)

    print(len(df))

    # Instantiate the TfIdf vectorizer
    tfidf_vectorizer = create_tfidf_vectorizer()

    # Instantiate the predictor
    classifier = LinearSVC()

    # Create the pipeLine
    text_clf = Pipeline([('tfidf', tfidf_vectorizer), ('clf', classifier)])

    # Get the training and testing sets
    X = df['review']
    y = df['label']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)

    print(X_train.shape, X_test.shape, y_train.shape, y_test.shape)

    tfidf_vectorizer.fit(X_train, y_train)

    # Train the pipeline
    text_clf.fit(X_train, y_train)

    predictions = text_clf.predict(X_test)
    accuracy = metrics.accuracy_score(y_test, predictions)

    conf_matrix = confusion_matrix(y_test, predictions).tolist()

    # fast api cannot serialize np int 64
    df_X_test_predictions = pd.DataFrame({
        'predicted_sentiment': predictions,
        'actual_sentiment': y_test,
        'review': X_test
    })

    sentiment_dict = {
        1: "positive",
        0: "neutral",
        -1: "negative"
    }

    df_X_test_predictions['predicted_sentiment'] = df_X_test_predictions['predicted_sentiment'].map(sentiment_dict)
    df_X_test_predictions['actual_sentiment'] = df_X_test_predictions['actual_sentiment'].map(sentiment_dict)

    print(df_X_test_predictions)

    result = {
        "accuracy_score": accuracy,
        "conf_matrix": conf_matrix,
        "sentiment_df": df_X_test_predictions,
        "search_query": search_query
    }

    if search_query != "" and not search_query.isspace():
        search_prediction = text_clf.predict(pd.Series(search_query))
        search_prediction = int(search_prediction[0])
        search_prediction_str = sentiment_dict[search_prediction]
        result["search_query_prediction"] = search_prediction_str

    return result
