import React, { useState } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import { TRowSentiment } from "../../containers/AnalysisPage";
import { StringStorage } from "../../services/StringStorage";

interface IProp {
    sentimentRows: TRowSentiment[],
}

export function SentimentTable({sentimentRows}: IProp): JSX.Element {

    const TABLE_CSS: string = StringStorage.TABLE_CSS;

    let [isShowTable, setIsShowTable] = useState<boolean>(true);
    const handleClick = () => {
        setIsShowTable(!isShowTable);
    }

    let sentimentRowsJsx: JSX.Element[] = sentimentRows.map((row: TRowSentiment, index: number) => {
        return (
            <tr key={index}>
                <td>{ row.predicted }</td>
                <td>{ row.actual }</td>
                <td>{ row.review }</td>
            </tr>
        );
    });

    return <div>
        <h3 style={{display: "inline-block", marginRight: "10px"}}>Test Data Set</h3>
        <button onClick={handleClick} className="btn btn-sm btn-outline-primary" style={{display: "inline-block"}}>Hide</button>
        <br/><br/>
        {sentimentRowsJsx.length > 0 && isShowTable &&
            <div>
                <table className={TABLE_CSS}>
                    <thead>
                        <tr>
                            <th>Predicted sentiment</th>
                            <th>Actual sentiment</th>
                            <th>Review</th>
                        </tr>                    
                    </thead>
                    <tbody>
                        {sentimentRowsJsx}
                    </tbody>
                </table>     
            </div>               
            }
            {sentimentRowsJsx.length === 0 &&
                <CircularProgress style={{marginLeft: '50%'}} /> 
            }
    </div>
}