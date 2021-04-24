import React from 'react';
import getText from '../translations/i18n';

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <img src="/img/radarinLogo.png" alt="inrupt" />
        <h1 className="h1Card">{ getText("welcome.bienvenida") }</h1>
        <h5 className="h5Card">{ getText("welcome.descripcion") }
        <h6><br></br>{ getText("welcome.info1") }<a href="https://en.wikipedia.org/wiki/Solid_(web_decentralization_project">SOLID </a>{ getText("welcome.info2") }</h6> </h5>
      </div>
    );
  }
}

export default Welcome;