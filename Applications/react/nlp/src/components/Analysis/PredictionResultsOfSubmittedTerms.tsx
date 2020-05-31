import React from "react";
import { TRowCosine } from "../../containers/AnalysisPage"
import { CosineTable } from "./CosineTable";

interface IProp {
    cosineRows: TRowCosine[],
    searchQuerySubmitted: string,
    searchQueryPrediction: string,
}

export function PredictionResultsOfSubmittedTerms({cosineRows, searchQuerySubmitted, 
    searchQueryPrediction}: IProp): JSX.Element {

    return (
    <div>
        {searchQuerySubmitted &&
            <div>
                <h3>Predictions</h3>
                <p>Sentiment predicted for <i>"{searchQuerySubmitted}"</i>: <b>{searchQueryPrediction}</b></p>
                <label>Top 3 most relevant documents</label>
                <CosineTable cosineRows={cosineRows}/>
            </div>
        }
    </div>

            
    )
     
    


}

