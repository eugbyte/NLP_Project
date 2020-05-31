import axios, { AxiosResponse } from 'axios';
import { takeEvery, put } from 'redux-saga/effects';
import { ACTIONS, IAction } from '../actions';
import { IDocument } from '../../models/Document';
import { StringStorage } from '../../services/StringStorage';

function * fetchDocumentsAsnyc(action: IAction) {
    const backendUrl: string = StringStorage.APIURL + "webScrapping";
    const headers = { 'Content-Type': 'application/json' };

    try {
        let urlToScrapeFrom: string = action.value as string;
        let requestBody: object = { 'url': urlToScrapeFrom };
        let response: AxiosResponse<IDocument[]> = yield axios.post(
            backendUrl, 
            requestBody, 
            { headers: headers });
        let data: IDocument[] = response.data;

        //Should you want to randomize the sentiment, instead of letting Vader do it for you
        // let sentiments: string[] = ["positive", "neutral", "negative"];
        // data.forEach(doc => doc.sentiment = sentiments[getRandomInt(0, 2)]);    

        yield put({ 
            type: ACTIONS.FETCH_DOCUMENTS_ASYNC, 
            value: data,
            url: urlToScrapeFrom
        });
    } catch (error) {
        console.log("Error occured", error);
    }    
}

export function * fetchDocuments() {
    yield takeEvery(ACTIONS.FETCH_DOCUMENTS, fetchDocumentsAsnyc);
}

// function getRandomInt(min: number, max: number) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }