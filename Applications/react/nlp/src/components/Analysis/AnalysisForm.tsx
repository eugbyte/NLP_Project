import React from "react";

interface IProp {
    handleSubmit: () => void;
    handleChanges: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AnalysisForm({handleSubmit, handleChanges}: IProp): JSX.Element {


    return <div>        
      
        <div className="form-group">
            <h3>Predict</h3>
            <label htmlFor="text">Predict sentiment and cosine similarity of search terms</label>
            <input type="text" onChange={(event) => handleChanges(event)} 
                className="form-control" id="text" 
                placeholder="Enter words from document to predict its sentiment and cosine similarity"/>
        </div>

        <div>
            <button onClick={(event) => handleSubmit()} className="btn btn-primary">Predict</button>
            <br></br>
        </div>
    </div>
}