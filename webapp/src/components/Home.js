import React from 'react';
import Profile from './Profile/Profile';


function Home(props) {

    return (
        <div>
            <h1 className="h1Card">¡ Bienvenido a Radarin !</h1>
            <Profile />
        </div>
    );
}

export default Home;