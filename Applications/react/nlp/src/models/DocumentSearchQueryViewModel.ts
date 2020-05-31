import { IDocument } from "./Document"

export interface IDocumentSearchQueryViewModel {
    searchQuery: string;
    documents: IDocument[];
}


export class DocumentSearchQueryViewModel {
    searchQuery: string
    documents: IDocument[]

    constructor() {
        this.searchQuery = "";
        this.documents = [];
    }
}
    
