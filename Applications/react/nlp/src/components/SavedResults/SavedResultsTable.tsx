import React from "react"
import { IAnalysisResult } from "../../models/AnalysisResult";
import { ConfusionTable } from "../Analysis/ConfusionTable";

interface IProp {
    analysisResults: IAnalysisResult[],
    handleDelete: (analysisResultId: number) => void
}

export function SavedResultsTable({analysisResults, handleDelete}: IProp): JSX.Element {
    let rows: JSX.Element[] = analysisResults.map((analysisResult: IAnalysisResult, index: number) => <tr key={index}>
        <td>{analysisResult.url}</td>
        <td>{analysisResult.accuracyScore}</td>
        <td><ConfusionTable confusionMatrix={JSON.parse(analysisResult.confusionMatrix) as number[][]} showAtFirst={false}/></td>
        <td><button onClick={(event) => handleDelete(analysisResult.analysisResultId)} className="btn btn-danger btn-sm">Delete</button></td>
    </tr>);

    return <table className="table table-sm table-bordered">
        <thead>
            <tr>
                <th>Url</th>
                <th>Accuracy Score</th>
                <th>Confusion Matrix</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>

    
}