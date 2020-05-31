import pandas as pd


def clean_data(df: pd.DataFrame.dtypes) -> pd.DataFrame:
    # check for NaN values
    print(df.isnull().sum())
    df.dropna(inplace=True)

    # remove white spaces and empty strings
    blanks = []

    for index, row in df.iterrows():
        review = row['review']
        if type(review) == str:
            if (review.isspace()):
                blanks.append(index)

        label = row.get('label')
        if label is None:
            continue
        if label.isspace():
            blanks.append(index)

    df.drop(index=blanks, inplace=True)

    return df
