import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from spacy.lang.en import English

# No choice but to have a stateful nlp object. tfidf lemmatization works with n gram of words, cannot keep
# instantiating the nlp object as it will take too long.

nlp = English()

# Initialize the lemmatizer
def lemmatizer(text):
    tokens = nlp(text)
    results = [token.lemma_ for token in tokens]
    return results


# Initialize the stop words, and lemmatize them too
def create_stop_words():
    nlp = spacy.load('en_core_web_sm')
    stop_words = nlp.Defaults.stop_words
    stop_words = lemmatizer(str(stop_words))
    stop_words = set(stop_words)
    return stop_words


# Initialize the tfidf vectorizer
def create_tfidf_vectorizer():
    stop_words = create_stop_words()
    tfidf = TfidfVectorizer(tokenizer=lemmatizer, stop_words=stop_words, token_pattern=None)  # problem line, the lemmatizer taking too long
    return tfidf
