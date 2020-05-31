import { TRowCosine } from "../../containers/AnalysisPage";
import React from "react";
import { StringStorage } from "../../services/StringStorage";

interface IProp {
    cosineRows: TRowCosine[]
}

export function CosineTable({cosineRows}: IProp): JSX.Element {

    const TABLE_CSS: string = StringStorage.TABLE_CSS;

    let cosineRowsJsx: JSX.Element[] = cosineRows
        .sort((a, b) => b.cosine_similarity - a.cosine_similarity)
        .slice(0, 3)
        .map((row: TRowCosine, index: number) => {
            return (
                <tr key={index}>
                    <td>{ row.cosine_similarity }</td>
                    <td>{ row.review }</td>
                </tr>
            );
    });

    return <table className={TABLE_CSS}>
                <thead>
                    <tr>
                    <th>Cosine Similarity</th>
                    <th>Review</th>
                    </tr>
                </thead>
                <tbody>
                    {cosineRowsJsx}
                </tbody>
            </table>
}