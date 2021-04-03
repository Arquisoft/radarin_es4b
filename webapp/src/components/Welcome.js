import React from 'react';


class Welcome extends React.Component {
  render() {
    return (
      <section className="header-wrap">
        <div className="logo-block">
          <img src="/img/radarinLogo.png" alt="inrupt" />
        </div>
        <h1>¡ Bienvenido a Radarin !</h1>
      </section>);
  }
}

export default Welcome;