import React from 'react';
import Button from "react-bootstrap/Button";

class LogInMessage extends React.Component{
  constructor(props) {
    super(props);
  }



  async goToRegisterUser() {
    console.log("enviar usuario a register");
  }


  render(){
    return(
        <div className="LogInMessage">
         <h2>Bienvenido</h2>
         Identíficate  o<Button variant="link" onClick={this.goToRegisterUser()}>crea una cuenta</Button>
        </div>           
    )
  }
}

export default LogInMessage