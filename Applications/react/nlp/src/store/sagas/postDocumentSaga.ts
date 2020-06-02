import axios, { AxiosResponse } from 'axios';
import { ACTIONS, IAction } from '../actions';
import { takeEvery, put } from 'redux-saga/effects';
import { StringStorage } from '../../services/StringStorage';
import { IDocument } from '../../models/Document';
import { DocumentSearchQueryViewModel } from '../../models/DocumentSearchQueryViewModel';

export function * postDocumentsAsync(action: IAction) {
    console.log("in postDocumentAsync");

    const headers = { 'Content-Type': 'application/json' };
    const url = StringStorage.EB_APIURL + "webScrapping/analyzeSentiment";
    try {
        let documents: IDocument[] = action.value as IDocument[];   
        let documentSearchQueryVM = new DocumentSearchQueryViewModel();
        documentSearchQueryVM.documents = documents;
        documentSearchQueryVM.searchQuery = action.searchQuery ? action.searchQuery : "";
        console.log(documentSearchQueryVM);
        let response: AxiosResponse<IDocument[]> = yield axios.post(
            url, 
            documentSearchQueryVM, 
            { headers: headers });
        let data: IDocument[] = response.data;
        console.log("response from postDocumentSaga", data);
        yield put({ type: ACTIONS.POST_DOCUMENTS_ASYNC, value: data, documents: documents });
    } catch (error) {
        console.log("error accessing", url, error);
    }   
    
}

export function * postDocuments() {
    yield takeEvery(ACTIONS.POST_DOCUMENTS, postDocumentsAsync);
}