import React from 'react';
import { DivConFondo } from "../AppStyles";



class Welcome extends React.Component {
  render() {
    return (
      <DivConFondo >
        <div className="logo-block">
          <img src="/img/radarinLogo.png" alt="inrupt" />
        </div>
        <h1>¡ Bienvenido a Radarin !</h1>
      </DivConFondo>);
  }
}

export default Welcome;