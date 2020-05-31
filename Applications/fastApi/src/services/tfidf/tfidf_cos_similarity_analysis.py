from typing import List

import pandas as pd
import numpy as np
import spacy
import copy
from sklearn.metrics.pairwise import cosine_similarity


from src.models.Document import Document
from src.services.clean_data import clean_data
from src.services.tfidf.tfidf_vectorizer import create_tfidf_vectorizer


def order_documents_by_relevance(documents: List[Document], query_string: str) -> List[Document]:
    text_contents: List[str] = [document.textContent for document in documents]

    original_df = pd.DataFrame({'cosine_similarity': np.zeros(len(text_contents)), 'review': text_contents})
    df = copy.deepcopy(original_df)

    df = clean_data(df)

    # Initialize the tfidf vectorizer
    tfidf_vectorizer = create_tfidf_vectorizer()

    # Initialize the df representing the word vector with tfidf score for each word
    matrix = tfidf_vectorizer.fit_transform(df['review'])
    matrix_dense = matrix.todense()
    arr = np.array(matrix_dense)
    column_names = tfidf_vectorizer.get_feature_names()

    df_tfidf = pd.DataFrame(arr, columns=column_names)
    print(df_tfidf.head())



    # Parse the search query so as to ignore numbers and punctuation, and get the lemmatized text
    nlp = spacy.load('en_core_web_sm')
    queries: list = [token.lemma_ for token in nlp(query_string)]

    # Get the column index of the query in the tfidf dataFrame should the query be there
    query_indexes = [column_names.index(query) for query in queries if query in column_names]

    # refer to https://janav.wordpress.com/2013/10/27/tf-idf-and-cosine-similarity/
    # main concept is that to compare cosine similarity, the search string must be represented as a vector,
    # with the same number of columns as the tfidf array
    # you are comparing the query vector against each document

    for index, document in df_tfidf.iterrows():
        query_vector = np.zeros(len(df_tfidf.columns), )
        # print(document.shape, query_vector.shape)
        # e.g. (167,) (167,)  # must be same shape in order to compare cosine similarity

        for query_index in query_indexes:

            query: str = column_names[query_index]
            doc = nlp(df.loc[index, "review"])
            doc_texts = [token.text for token in doc]

            if query not in doc_texts:
                continue

            old_tf: float = doc_texts.count(query) / len(doc_texts)  # e.g. 0.022222222222222223
            old_tfidf: float = document[query_index]  # e.g. 0.23875188851084744
            idf: float = old_tfidf / old_tf  # e.g. 10.743834982988135
            new_tf: float = queries.count(query) / len(queries)  # e.g. 0.5
            new_tfidf: float = idf * new_tf  # e.g. 5.3719174914940675

            query_vector[query_index] = new_tfidf

        similarity = cosine_similarity([query_vector], [document.to_numpy()])

        if similarity > 0:
            print(similarity.shape)
            # (1, 1)
            df.at[index, "cosine_similarity"] = similarity[0][0]

    df.sort_values('cosine_similarity', inplace=True, ascending=False)

    return df






