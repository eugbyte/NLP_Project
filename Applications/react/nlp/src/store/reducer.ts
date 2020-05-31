import { ACTIONS, IAction } from './actions';
import {cloneDeep} from 'lodash';
import { IDocument } from '../models/Document';
import { IAnalysisResult } from '../models/AnalysisResult';


const initialState : IAction = {
    type: "",
    submittedDocuments: [],  //you need to instantiate this to [] as DocumentList relies on this
    statusTexts: []
}

export default function Reducer(prevState = initialState, action: IAction): IAction {

    let newState: IAction = cloneDeep(prevState);
        
    switch(action.type) {
        case(ACTIONS.FETCH_DOCUMENTS_ASYNC):
            newState.submittedDocuments = action.value as IDocument[];
            newState.url = action.url as string;
            return newState;
        case(ACTIONS.POST_DOCUMENTS_ASYNC):
            newState.submittedDocuments = action.documents as IDocument[];
            newState.response = action.value; //this is the problematic line
            return newState;
        case(ACTIONS.SAVE_RESULTS_ASYNC):
            newState.statusTexts?.push(action.statusText as string)
            return newState;
        case(ACTIONS.FETCH_SAVED_RESULTS_ASYNC):
            newState.analysisResults = action.analysisResults as IAnalysisResult[];
            return newState;
        case(ACTIONS.DELETE_SAVED_RESULT_ASYNC):
            newState.statusText = action.statusText as string;
            newState.analysisResultIdDeleted = action.analysisResultIdDeleted;
            return newState;
        default:
            return prevState;
    }
} 