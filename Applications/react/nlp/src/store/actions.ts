import { Action } from "redux";
import { IDocument } from "../models/Document";
import { IAnalysisResult } from "../models/AnalysisResult";

export enum ACTIONS {
    INCREMENT = "INCREMENT",
    DECREMENT = "DECREMENT",
    FETCH_DOCUMENTS = "FETCH_DOCUMENTS",
    FETCH_DOCUMENTS_ASYNC = "FETCH_DOCUMENTS_ASYNC",
    POST_DOCUMENTS = "POST_DOCUMENTS",
    POST_DOCUMENTS_ASYNC = "POST_DOCUMENTS_ASYNC",
    SAVE_RESULTS = "SAVE_RESULTS",
    SAVE_RESULTS_ASYNC = "SAVE_RESULTS_ASYNC",
    FETCH_SAVED_RESULTS = "FETCH_SAVED_RESULTS",
    FETCH_SAVED_RESULTS_ASYNC = "FETCH_SAVED_RESULTS_ASYNC",
    DELETE_SAVED_RESULT = "DELETE_SAVED_RESULT",
    DELETE_SAVED_RESULT_ASYNC = "DELETE_SAVED_RESULT_ASYNC"
}

export interface IAction extends Action {
    type: string,
    value?: any,

    url?: string,
    searchQuery?: string,
    documents?: IDocument[],
    submittedDocuments?: IDocument[],

    statusText?: string,
    statusTexts?: string[],

    response?: any,
    analysisResults?: IAnalysisResult[],    
    analysisResultId?: number,
    analysisResultIdDeleted?: number;
}

export function actionDeleteWebPage(webPageId: number): IAction {
    return {
        type: ACTIONS.DELETE_SAVED_RESULT,
        analysisResultId: webPageId
    } 
}

export function actionFetchDocuments(value?: any): IAction {
    value = value ?? null;
    return {
        type: ACTIONS.FETCH_DOCUMENTS,
        value: value,
    }
}

export function actionPostDocuments(value: IDocument[], searchQuery?: string): IAction {
    return {
        type: ACTIONS.POST_DOCUMENTS,
        value: value,
        searchQuery: searchQuery
    }
}

export function saveAnalysisResults(value: IAnalysisResult): IAction {
    return {
        type: ACTIONS.SAVE_RESULTS,
        value: value
    }
}


