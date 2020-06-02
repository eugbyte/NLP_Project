import { takeEvery, put } from "redux-saga/effects";
import { ACTIONS, IAction } from "../actions";
import { StringStorage } from "../../services/StringStorage";
import axios, { AxiosResponse } from 'axios';

export function * deleteResultAsync(action: IAction) {
    const headers = { 'Content-Type': 'application/json' };
    const deleteUrl = StringStorage.EB_APIURL + "webPages/" + action.analysisResultId;

    try {
        let response: AxiosResponse = yield axios.delete(deleteUrl, { headers: headers });
        let statusText: string = response.data;
        console.log(statusText);
        yield put({ type: ACTIONS.DELETE_SAVED_RESULT_ASYNC, statusText: statusText, webPageIdDeleted: action.analysisResultId }); 
         
    } catch (error) {
        console.log(error);
    }
}

export function * deleteResult() {

    yield takeEvery(ACTIONS.DELETE_SAVED_RESULT, deleteResultAsync);

    //Channels not working - aim here is to delete, and then refetch results
    // const deleteChannel = yield actionChannel(ACTIONS.DELETE_WEBPAGE);
    // const fetchChannel = yield actionChannel(ACTIONS.FETCH_SAVED_RESULTS);
    // while (true) {
    //     const {deletePayload} = yield take(deleteChannel);
    //     yield call(deleteResultAsync, deletePayload);

    //     const {fetchPayload} = yield take(fetchChannel);
    //     yield call(fetchSavedResultsAsync, fetchPayload);
    //  }

}