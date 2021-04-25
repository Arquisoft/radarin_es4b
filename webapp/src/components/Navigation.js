import React from 'react';
import { NavLink } from 'react-router-dom';
import { LoggedIn, LoggedOut } from '@solid/react';
import { Dropdown } from 'react-bootstrap';
import { changeLanguage } from '../translations/i18n';

class Navigation extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <NavLink className="navbar-brand" to="/"><img src="/img/radarinSmallLogo.png" alt="inrupt" className="NavLogo" /></NavLink>

                    <ul className="navbar-nav mr-auto">

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

                        <li className="nav-item">
                            <Dropdown className="nav-link">
                                <Dropdown.Toggle className="btn btn-secondary btn-sm dropdown-toggle">
                                    Idioma
                            </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => changeLanguage("es")}>
                                    <img src="/img/if_spain_flag.png" alt="inrupt" />   Español</Dropdown.Item>
                                    <Dropdown.Item onClick={() => changeLanguage("en")}>
                                    <img src="/img/if_uk_flag.png" alt="inrupt" />   Inglés</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>

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