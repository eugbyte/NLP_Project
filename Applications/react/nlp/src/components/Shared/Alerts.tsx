import React from "react";

export interface IProp {
    statusTexts: string[],
    alertType?: ALERT_TYPES
}

export enum ALERT_TYPES {
    warning = "warning",
    danger = "danger",
    success = "success"
}

export function Alerts({statusTexts, alertType}: IProp): JSX.Element {

    alertType = alertType ?? ALERT_TYPES.warning;

    let alertClass: string = `alert alert-${alertType} alert-dismissible fade show`;

    let alerts: (JSX.Element | null)[] = statusTexts.map((statusText: string, index: number) => 
        (statusText)
        ? <div className={alertClass} key={index} role="alert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            {statusText}
        </div>
        : null );
    
    return <div>{alerts}</div>
}