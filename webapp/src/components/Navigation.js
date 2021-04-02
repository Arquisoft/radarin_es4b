import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/amigos">Listar amigos</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/mapa">Ver mapa</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navigation