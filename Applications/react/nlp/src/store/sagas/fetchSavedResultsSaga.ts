import { takeEvery, put } from 'redux-saga/effects';
import { ACTIONS, IAction } from "../actions";
import { StringStorage } from "../../services/StringStorage";
import axios, { AxiosResponse } from 'axios';
import { AnalysisResult } from "../../models/AnalysisResult";


export function * fetchSavedResultsAsync(action: IAction) {
    console.log("in fetchSavedResultsAsync");
    const headers = { 'Content-Type': 'application/json' };
    const url: string = StringStorage.APIURL + "analysisResult";

    try {
        let response: AxiosResponse<AnalysisResult[]> = yield axios.get(url, { headers: headers });
        let analysisResults: AnalysisResult[] = yield response.data;
        console.log(analysisResults);
        yield put({
            type: ACTIONS.FETCH_SAVED_RESULTS_ASYNC,
            analysisResults: analysisResults
        });
    } catch (error) {
        console.log(error);
    }   
}

export function * fetchSavedResults() {
    yield takeEvery(ACTIONS.FETCH_SAVED_RESULTS, fetchSavedResultsAsync)
}