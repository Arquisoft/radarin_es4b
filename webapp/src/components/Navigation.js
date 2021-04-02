import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        
                        <li class="nav-item">
                            <Link to="/">Home</Link>
                        </li>

                        <li class="nav-item">
                            <Link to="/amigos">Listar amigos</Link>
                        </li>

                        <li class="nav-item">
                            <Link to="/mapa">Ver mapa</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navigation