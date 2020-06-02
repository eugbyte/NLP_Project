import { takeEvery, put } from "redux-saga/effects";
import { ACTIONS, IAction } from "../actions";
import { StringStorage } from "../../services/StringStorage";
import axios, { AxiosResponse } from 'axios';
import { IAnalysisResult } from "../../models/AnalysisResult";


export function * saveResultsAsync(action: IAction) {
    console.log("submitting results...", action.value);
    const headers = { 'Content-Type': 'application/json' };
    const url = StringStorage.EB_APIURL + "analysisResult/saveResult";
    let webPage: IAnalysisResult = action.value as IAnalysisResult;
    yield put({ type: ACTIONS.SAVE_RESULTS_ASYNC });
    try {
        let response: AxiosResponse = yield axios.post(
            url, 
            webPage, 
            { headers: headers });
        let statusText: string = response.data;
        console.log(statusText);
        yield put({ type: ACTIONS.SAVE_RESULTS_ASYNC, statusText: statusText });
    } catch (error) {
        console.log(error);
    }   
}

export function * saveResults() {
    yield takeEvery(ACTIONS.SAVE_RESULTS, saveResultsAsync);
}