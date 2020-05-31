import { fetchDocuments } from "./sagas/fetchDocumentSaga";
import  { postDocuments } from "./sagas/postDocumentSaga";
import { all, spawn } from "redux-saga/effects";
import { saveResults } from "./sagas/saveResultsSaga";
import { fetchSavedResults } from "./sagas/fetchSavedResultsSaga";
import { deleteResult } from "./sagas/deleteResultSaga";


export function * rootSaga() {

    yield all([
        spawn(postDocuments),
        spawn(fetchDocuments),
        spawn(saveResults),
        spawn(fetchSavedResults),
        spawn(deleteResult)   
    ]);
}