import React, { useState } from "react";
import { StringStorage } from "../../services/StringStorage";

interface IProp {
    confusionMatrix: number[][];
    showAtFirst?: boolean;
}

export function ConfusionTable({confusionMatrix: confusionArray, showAtFirst }: IProp): JSX.Element {

    let [isShowTable, setIsShowTable] = useState<boolean>(showAtFirst ?? true);
    const handleClick = () => {
        setIsShowTable(!isShowTable);
    }


    const TABLE_CSS: string = StringStorage.TABLE_CSS;

    let rows: JSX.Element[] = [];
    let first_columns: string[] = ["Actual positive", "Actual neutral", "Actual negative"];
    for (let i = 0; i < confusionArray.length; i++) {
        let subArray: number[] = confusionArray[i];
        let tds: JSX.Element[] = subArray.map((value, index) => {
            return (index === i) 
            ? <td key={ i + index }><b>{ value }</b></td> 
            : <td key={ i + index }>{ value }</td>   //make diagonal bold
        });

        if (confusionArray.length === 3) {
            tds.unshift(<td key = { i + 100 }><b>{ first_columns[i] }</b></td>);
        }
        let row: JSX.Element = <tr key={i}>{tds}</tr>
        rows.push(row);
    }    

    if (confusionArray.length === 2) {        
        return <div>
            <label style={{display: "inline-block", marginRight: "10px"}}>Confusion Matrix</label>
            <button onClick={handleClick} className="btn btn-sm btn-primary" style={{display: "inline-block"}}>Hide</button>
            <br></br>
            {isShowTable &&
            <table className={TABLE_CSS}>                
                <tbody>
                    {rows}
                </tbody>
            </table>
            }
            
        </div> 
    }

    return <div>
        <label style={{display: "inline-block", marginRight: "10px"}}>Confusion Matrix</label>
        <button onClick={handleClick} className="btn btn-sm btn-outline-primary" style={{display: "inline-block"}}>Hide</button>
        <br/><br/>
        {isShowTable &&
            <table className={TABLE_CSS} >
                <thead>
                    <tr>
                        <th></th>
                        <th>Predicted Positive</th>
                        <th>Predicted Neutral</th>
                        <th>Predicted Negative</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
        </table>
        }
    </div>

}