import React, { useEffect, useState, Dispatch } from "react";
import "../App.css";

import { useSelector, useDispatch } from "react-redux";
import { IDocument } from "../models/Document";
import { cloneDeep } from "lodash";
import Pagination from '@material-ui/lab/Pagination';
import { DocumentService } from "../services/DocumentServices";
import CircularProgress from '@material-ui/core/CircularProgress';
import { DocumentList } from "../components/PreProcessing/DocumentList";
import { IAction, actionPostDocuments } from "../store/actions";
import { useHistory } from "react-router-dom";
import { Instruction } from "../components/Shared/Instruction";

export function PreProcesingPage(): JSX.Element {
    const documentService: DocumentService = new DocumentService();
    const dispatch: Dispatch<any> = useDispatch();   
    const historyHook = useHistory();

    //ELEMENTS is immutable
    let DOCUMENTS: IDocument[] = useSelector((reduxState: IAction) => reduxState.submittedDocuments) ?? []; 
    console.log(DOCUMENTS);
    let [documents, setDocuments] = useState<IDocument[]>([]);  

    useEffect(() => {
        setDocuments(DOCUMENTS);
    }, [DOCUMENTS]);

    const pageSize: number = 10;
    let [pageLength, setPageLength] = useState(10);
    let [page, setPage] = useState(1);

    useEffect(() => {
        let newPageLength: number = documents.length / pageSize;
        newPageLength = Math.ceil(newPageLength);
        setPageLength(newPageLength);
    }, [documents]);

    const onDelete = (index: number): void => {
        let newElements: IDocument[] = cloneDeep(documents);
        newElements.splice(index, 1);
        setDocuments(newElements);
    }

    const onMergeUp = (index: number): void => {
        if (index < 1) 
            return; 
        let newElements: IDocument[] = documentService.mergeUp(documents, index);
        setDocuments(newElements); 
    } 

    const onMergeDown = (index: number): void => {
        if (index === documents.length - 1) {
            return;
        }
        let newElements: IDocument[] = documentService.mergeDown(documents, index);
        setDocuments(newElements);
    }

    const onSubmit = (): void => {
        const action: IAction = actionPostDocuments(documents);
        console.log(documents);
        dispatch(action);
        historyHook.push("/sentimentAnalysis");
    }

    const onSetSentiment = (event: React.ChangeEvent<HTMLSelectElement>, index: number): void => {
        let docs: IDocument[] = cloneDeep(documents);
        let doc: IDocument = docs[index];
        doc.sentiment = event.target.value;
        setDocuments(docs);
    }

    const instructions: string[] = [
        "The documents below represent the <p> scrapped from the website",
        "The sentiment for each document (review) has been pre-set using Vader Sentiment",
        "However, you are free to set the sentiments as Vader is not completely accurate",
        "You can also merge documents with the 'merge up/down' buttons, and delete documents through the 'delete' buttons",
        "Make sure you have at least 2 types sentiments, and have at least 3 documents",
        "When ready, submit the documents for NLP analysis"
    ];

    return(
        <div>            
            <Instruction instructions={instructions} title="Step 2: Process the data" />
            {documents.length === 0 &&
                <div>
                    <CircularProgress style={{marginLeft: '50%', marginTop: '10%'}} />    
                </div>                
            }
            {documents.length > 0 &&
                <div className="text-center">                    
                    <button onClick={ event => onSubmit() }
                        className="btn btn-success">Submit documents for NLP analysis</button>
                    <Pagination count={pageLength} onChange={ (event, index) => setPage(index) }
                        style={{marginRight: '1px', position: 'relative'}} />                    
                    <DocumentList documents={documents} onMergeUp={onMergeUp} onMergeDown={onMergeDown}
                        onDelete={onDelete} pageSize={pageSize} page={page}
                        onSetSentiment={onSetSentiment} />
                </div>
            }
        </div>);

}