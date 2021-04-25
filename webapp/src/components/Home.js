import React from 'react';
import Profile from './Profile/Profile';
import { getText } from '../translations/i18n'


function Home(props) {

    return (
        <div>
            <h1 className="h1Card">{ getText("home.bienvenida") }</h1>
            <Profile />
        </div>
    );
}

export default Home;