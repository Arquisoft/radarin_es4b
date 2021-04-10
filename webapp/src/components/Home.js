import React from 'react';
import Profile from './Profile/Profile';
import { DivConFondo } from "../AppStyles"


function Home(props) {

    return (
        <DivConFondo>
            <h1>¡ Bienvenido a Radarin !</h1>
            <Profile />
        </DivConFondo>
    );
}

export default Home;