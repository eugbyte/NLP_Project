import { IDocument } from "../models/Document";
import { cloneDeep } from "lodash";

export class DocumentService {
    mergeUp(elements:  IDocument[], index: number): IDocument[] {
        let newElements: IDocument[] = cloneDeep(elements);
        let targetElement: IDocument = newElements[index];
        let previousElement: IDocument = newElements[index - 1];
        previousElement.textContent += " " + targetElement.textContent;
        previousElement.name += " | " + targetElement.name;

        newElements.splice(index, 1);
        return newElements;
    }

    mergeDown(elements: IDocument[], index: number): IDocument[] {
        let newElements: IDocument[] = cloneDeep(elements);
        let targetElement: IDocument = newElements[index];
        let nextElement: IDocument = newElements[index + 1];
        nextElement.textContent = targetElement.textContent + " " + nextElement.textContent;
        nextElement.name = targetElement.name + " | " + nextElement.name;

        newElements.splice(index, 1);
        return newElements;
    }

}