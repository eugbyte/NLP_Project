export interface IAnalysisResponseViewModel {
    "accuracy_score": number;
    "conf_matrix": number[][];
    "sentiment_df": ISentimentDataFrame;
    "search_query": string;
    "search_query_prediction": string;
    "cosine_df": ICosineDataFrame;
}

export class AnalysisResponseViewModel implements IAnalysisResponseViewModel {
    "accuracy_score": number;
    "conf_matrix": number[][];
    "sentiment_df": ISentimentDataFrame;
    "search_query": string;
    "search_query_prediction": string;
    "cosine_df": ICosineDataFrame;
}

export interface ISentimentDataFrame {
    "predicted_sentiment": object;
    "actual_sentiment": object;
    "review": object
}


export interface ICosineDataFrame {
    "cosine_similarity": object;
    "review": object
}

