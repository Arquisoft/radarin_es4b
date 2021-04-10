import React from 'react';
import { NavLink } from 'react-router-dom';
import { LoggedIn, LoggedOut } from '@solid/react';


class Navigation extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <NavLink className="navbar-brand" to="/">Radarin</NavLink>

                        <LoggedIn>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/amigos">Listar amigos</NavLink>
                            </li>
                        </LoggedIn>


                        <LoggedIn>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/mapa">Ver mapa</NavLink>
                            </li>
                        </LoggedIn>

                    </ul>

                    <ul class="nav navbar-nav navbar-right">

                        <LoggedOut>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/logIn">Iniciar sesión</NavLink>
                            </li>
                        </LoggedOut>


                        <LoggedIn>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/logOut">Cerrar sesión</NavLink>
                            </li>
                        </LoggedIn>

                    </ul>

                </div>
            </nav>
        );
    }
}

export default Navigation