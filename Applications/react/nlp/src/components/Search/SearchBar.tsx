import React, { useState } from "react";
import { IAction, actionFetchDocuments } from "../../store/actions";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useHistory } from "react-router-dom";

interface IProps {
    history?: any
}

export function SearchBar({history}: IProps): JSX.Element {
    const defaultUrl: string = `https://www.glassdoor.sg/Interview/ST-Engineering-Interview-Questions-E1451658.htm`;
    const dispatch: Dispatch<any> = useDispatch(); 
    let [url, setUrl] = useState<string>(defaultUrl);

    const historyHook = useHistory();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let newUrl: string = event.target.value;
        setUrl(newUrl);
    }

    const onSubmit = (): void => {
        let action: IAction = actionFetchDocuments(url);
        dispatch(action);
        historyHook.push("/documents");
    }
    
    return (        
        <div>
            <div className="form-group">
                <label>Key in the website to scrap</label>
                <input onChange={ (event) => onChange(event) } type="text" className="form-control"                
                    value={ url }/>
            </div>
            <input onClick={ (event) => onSubmit() } type="submit" value="Submit" className="btn btn-success"/>
        </div>
    );
}