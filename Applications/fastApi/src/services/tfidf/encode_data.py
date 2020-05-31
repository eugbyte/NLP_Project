import pandas as pd

import spacy
nlp = spacy.load('en_core_web_sm')

def encode_data(df: pd.DataFrame.dtypes) -> pd.DataFrame:
    # trim the strings
    df = df.applymap(lambda cell: cell.strip() if (type(cell) == str) else cell)

    # remove punctuation
    df['review'] = df['review'].apply(remove_punctuation)

    # encode the sentiment
    sentiment_mapping = {
        'positive': 1,
        'neutral': 0,
        'negative': -1,
    }

    df['label'] = df['label'].map(sentiment_mapping)
    return df


def remove_punctuation(text):

    doc = nlp(text)
    tokens = [token.text for token in doc if token.is_alpha or token.is_digit]
    return " ".join(tokens)
