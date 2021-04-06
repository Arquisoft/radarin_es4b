import React from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <NavLink className="navbar-brand" to="/">Radarin</NavLink>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>

                        {!this.props.logged && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/logIn">Iniciar sesión</NavLink>
                            </li>
                        )}

                        {this.props.logged && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/amigos">Listar amigos</NavLink>
                            </li>
                        )}


                        {this.props.logged && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/mapa">Ver mapa</NavLink>
                            </li>
                        )}

                        {this.props.logged && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/logOut">Cerrar sesión</NavLink>
                            </li>
                        )}

                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navigation