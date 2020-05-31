import React, { useState, useEffect } from "react";
import { AnalysisResponseViewModel, ISentimentDataFrame, ICosineDataFrame } from "../models/AnalysisViewModel";
import { useSelector, useDispatch } from "react-redux";
import { IAction, actionPostDocuments, saveAnalysisResults } from "../store/actions";
import { IDocument } from "../models/Document";
import { Dispatch } from "redux";
import { PredictionResultsOfSubmittedTerms } from "../components/Analysis/PredictionResultsOfSubmittedTerms";
import { AnalysisForm } from "../components/Analysis/AnalysisForm";
import { ConfusionTable } from "../components/Analysis/ConfusionTable";
import CircularProgress from '@material-ui/core/CircularProgress';
import { SentimentTable } from "../components/Analysis/SentimentTable";
import { IAnalysisResult, AnalysisResult } from "../models/AnalysisResult";
import { Alerts, ALERT_TYPES } from "../components/Shared/Alerts";
import { Instruction } from "../components/Shared/Instruction";


export type TRowSentiment = {
    "predicted": string,
    "actual": string,
    "review": string
}

export type TRowCosine = {
    "cosine_similarity": number;
    "review": string
}

export function AnalysisPage(): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch(); 

    let DOCUMENTS: IDocument[] = useSelector((reduxState: IAction) => reduxState.submittedDocuments as IDocument[]);
    let sentimentResponse: AnalysisResponseViewModel = useSelector((reduexState: IAction) => reduexState.response as AnalysisResponseViewModel); 

    let urlAnalyzed: string = useSelector((reduxState: IAction) => reduxState.url as string);
    let accuracyScore: number = sentimentResponse?.accuracy_score ?? -1;
    let sentimentDataFrame: ISentimentDataFrame = sentimentResponse?.sentiment_df;
    let searchQuerySubmitted: string = sentimentResponse?.search_query ?? "";
    let searchQueryPrediction: string = sentimentResponse?.search_query_prediction ?? "";
    let confusionMatrix: number[][] = sentimentResponse?.conf_matrix ?? [[]];

    let sentimentRows: TRowSentiment[] = [];

    let cosineDataFrame: ICosineDataFrame = sentimentResponse?.cosine_df;
    let cosineRows: TRowCosine[] = [];

    let statusTextsOnSave: string[] = useSelector((reduxState: IAction) => reduxState.statusTexts as string[]) ?? [];  

    useEffect(() => {
        setIsPendingResponse(false);
    }, [sentimentResponse])

    let [searchQuery, setSearchQuery] = useState<string>(); 
    let [isPendingResponse, setIsPendingResponse] = useState<boolean>(false); 

    const handleChanges = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(event.target.value);
    }

    const handleSubmit = (): void => {
        const action: IAction = actionPostDocuments(DOCUMENTS, searchQuery);
        action.searchQuery = searchQuery;
        console.log(action);
        dispatch(action);  
        setIsPendingResponse(true);
    }

    const handleSave = (): void => {
        let webPage: IAnalysisResult = new AnalysisResult();
        webPage.url = urlAnalyzed;
        webPage.accuracyScore = accuracyScore;
        webPage.confusionMatrix = JSON.stringify(confusionMatrix);

        let action: IAction = saveAnalysisResults(webPage);
        dispatch(action);
    }

    if (sentimentDataFrame != null) {
        let { predicted_sentiment: predictedSentiments, 
            actual_sentiment: actualSentiments, 
            review: reviews } = sentimentDataFrame;
        let size: number = Object.keys(predictedSentiments).length;
        for (let i = 0; i < size; i++) {
            let row: TRowSentiment = {
                "predicted": Object.values(predictedSentiments)[i],
                "actual": Object.values(actualSentiments)[i],
                "review": Object.values(reviews)[i]
            }
            sentimentRows.push(row);
        }
    }

    if (cosineDataFrame != null) {
        let { cosine_similarity: cosineSimilarities, review: reviews } = cosineDataFrame;
        let size: number = Object.keys(cosineSimilarities).length;
        for (let i = 0; i < size; i++) {
            let row: TRowCosine = {
                "cosine_similarity": Object.values(cosineSimilarities)[i],
                "review": Object.values(reviews)[i]
            }
            cosineRows.push(row);
        }
    }    

    let instructions: string[] = [
        "The results of the sentiment prediction using tfidif are displayed here",
        "The Accuracy score and Confusion Matrix are displayed under the Metrics portion",
        "You can save the evaluation results for this website analysed, which " +
        "You can view the saved results under the View Saved Results tab on the navigation pane ",
        "The Test Data, as distinct from the Training data, is displayed under the Test Data Set portion",
        "You can also predict the sentiment of search terms, and its cosine similarity against the documents, by submitting the " +
        "search terms under the Predict portion",
    ];
    
    return (
        <div>
            <br></br>
            <Instruction instructions={instructions} title={"Step 3. View and save evaluation report, make further predictions"} />
            <AnalysisForm handleSubmit={handleSubmit} handleChanges={handleChanges} />  
            <hr/>

            {(accuracyScore === -1 || isPendingResponse)  &&
            <CircularProgress style={{marginLeft: '50%', marginTop: '10%'}} /> 
            }
            {!isPendingResponse && accuracyScore !== -1 &&
                <div>
                    <PredictionResultsOfSubmittedTerms cosineRows={cosineRows}
                        searchQuerySubmitted={searchQuerySubmitted} 
                        searchQueryPrediction={searchQueryPrediction} />

                    <hr/>
                    <h3>Metrics</h3>
                    <p>Accuracy Score: <b>{accuracyScore}</b></p>
                    <ConfusionTable confusionMatrix={confusionMatrix} />       
                    <button onClick={handleSave} className="btn btn-success btn-lg" style={{marginBottom: "10px"}}>Save Score</button>
                    <Alerts statusTexts={statusTextsOnSave} alertType={ALERT_TYPES.warning} />

                    <hr/>             
                    <SentimentTable sentimentRows={sentimentRows} />  
                </div>
            }
         
        </div>)
        
}