import React from "react";
import { IDocument } from "../../models/Document";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp, faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons";
import { StringStorage } from "../../services/StringStorage";

interface IProp {
    documents: IDocument[],
    onMergeUp:(index: number) => void,
    onMergeDown: (index: number) => void,
    onDelete: (index: number) => void,
    pageSize: number,
    page: number,
    onSetSentiment: (event: React.ChangeEvent<HTMLSelectElement>, index: number) => void
}

export function DocumentList({ documents, onMergeUp, onMergeDown, onDelete, pageSize, page, onSetSentiment }: IProp): JSX.Element {

    const TABLE_CSS: string = StringStorage.TABLE_CSS;

    const rows: JSX.Element[] | any = documents.map((element: IDocument, index: number) => {
        let startIndex: number = (page - 1) * pageSize;
        let endIndex: number = startIndex + pageSize;
        if (index < startIndex || index >=  endIndex)
            return null;

        return (
            <tr key={ index }>
                <td>{ index + 1 }</td>
                <td className="text-center">
                    <button onClick={ event=> onMergeUp(index) } className="btn btn-sm">
                        <FontAwesomeIcon icon={faArrowAltCircleUp} size="lg" />
                        <span> Merge Up</span>
                    </button>
                    <p>{element.textContent}</p>
                    <button onClick={ event=> onMergeDown(index) } className="btn btn-sm">
                        <FontAwesomeIcon icon={faArrowAltCircleDown} size="lg" />
                        <span> Merge Down</span>
                    </button>
                </td>
                <td>
                    <div className="form-group">
                        <select onChange={ (event) => onSetSentiment(event, index)} defaultValue={element.sentiment} >
                            <option value="positive">Postive</option>
                            <option value="neutral">Neutral</option>
                            <option value="negative">Negative</option>
                        </select>
                    </div>                    
                </td>
                <td><button onClick={ event=> onDelete(index) } className="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>);
    });

    return <div>
                <table className={ TABLE_CSS }>
                    <thead className="thead">
                        <tr>
                            <th>Document Number</th>
                            <th>Text Context</th>
                            <th>Sentiment</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
}