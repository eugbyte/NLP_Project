export interface IDocument {
    name: string,
    textContent: string,
    isAncestorLink?: boolean,
    count?: number,
    sentiment: string
}

export class Document implements IDocument {
    name: string;
    textContent: string;
    sentiment: string;

    constructor() {
        this.name = "";
        this.textContent = "";
        this.sentiment = "";
    }
}