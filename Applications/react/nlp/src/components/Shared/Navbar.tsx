import React from 'react';
import { NavLink } from "react-router-dom";


export function NavBar(): JSX.Element {

return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink to="/" className="navbar-brand">Home</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-ite m">
                        <NavLink to="/savedResults" className="nav-link">View Saved Results</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    );
}