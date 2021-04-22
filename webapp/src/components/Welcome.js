import React from 'react';


class Welcome extends React.Component {
  render() {
    return (
      <div>
        <img src="/img/radarinLogo.png" alt="inrupt" />
        <h1 className="h1Card">¡ Bienvenido a Radarin !</h1>
        <h5 className="h5Card">Radarin es un sistema para facilitar encuentros entre amigos utilizando nuevas tecnologías.
        <h6><br></br>El sistema es compatible con el proyecto <a href="https://en.wikipedia.org/wiki/Solid_(web_decentralization_project">SOLID </a>y no almacena información personal sobre los usuarios de forma centralizada. </h6> </h5>

      </div>
    );
  }
}

export default Welcome;