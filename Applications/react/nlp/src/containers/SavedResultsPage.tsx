import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { IAction, ACTIONS, actionDeleteWebPage } from "../store/actions";
import { IAnalysisResult } from "../models/AnalysisResult";
import { SavedResultsTable } from "../components/SavedResults/SavedResultsTable";
import { Instruction } from "../components/Shared/Instruction";

export function SavedResultsPage(): JSX.Element {

    const dispatch: Dispatch<any> = useDispatch();
   
    let analysisResults: IAnalysisResult[] = useSelector((reduxState: IAction) => reduxState.analysisResults as IAnalysisResult[]) ?? [];
    console.log(analysisResults);
    let analysisResultIdDeleted: number = useSelector((reduxState: IAction) => reduxState.analysisResultIdDeleted as number) ?? 0;

    useEffect(() => {
        console.log(analysisResultIdDeleted);
        dispatch({ type: ACTIONS.FETCH_SAVED_RESULTS });
    }, [analysisResultIdDeleted]);

    const handleDelete = (webPageId: number): void => {
        let action: IAction = actionDeleteWebPage(webPageId);
        dispatch(action);
    }

    const instructions: string[] = [
        "The saved evaluation results are displayed here",
        "To create a result, simply go to the Home page and enter the url of the website to scrap and analyze",
        "To update a result, do the same. The application will overwrite the previous result",
        "To delete a result, press the delete button for the corresponding result"
    ]
    

    return <div>
        <h3>Saved Evaluation Results</h3>
        <Instruction instructions={instructions} />
        <SavedResultsTable analysisResults={analysisResults} handleDelete={handleDelete} />
    </div>
}