import React, { useState } from "react";

interface IProp {
    instructions: string[],
    title?: string
}

export function Instruction({instructions, title}: IProp): JSX.Element {

    let [isDisplay, setIsDisplay] = useState<boolean>(true);

    const handleClick = () => {
        setIsDisplay(!isDisplay);
    };


    let rows = instructions.map((text: string, index: number) => 
        <li key={index}>{ text }</li>
    );

    return <div style={{backgroundColor: "#E9ECEF", borderRadius: "5px", padding: "10px", margin: "10px"}}>
        <p className="lead" style={{display: "inline-block", marginRight: "10px"}}>{title}</p>
        <button onClick={handleClick} className="btn btn-sm btn-outline-primary" style={{display: "inline-block", marginRight: "10px"}}>
            Hide Instructions
        </button>
        {isDisplay &&
            <ol>{ rows }</ol>
        } 
    </div>
    
}