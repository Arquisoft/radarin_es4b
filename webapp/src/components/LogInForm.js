import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class LogInForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {url: '', password: ''}
  }

  changeUrl(e) {
    const url = e.target.value ;
    this.setState({url: url});
  }

  changeUserName(e) {
    const username = e.target.value ;
    this.setState({username: username});
  }

  changePassword(e) {
    const password = e.target.value ;
    this.setState({password: password});
  }


  async handleSubmit(e) {
    e.preventDefault()
    //Add the user to the database
    console.log("mandar info: ",this.state.url,this.state.password);
  }

  render(){
    return(
        <div className="LogInForm">
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group>
              <Form.Label>POD</Form.Label>
              <Form.Control  type="text" placeholder="Dirección url de su POD" onChange={this.changeUrl.bind(this)} value={this.state.url}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" onChange={this.changePassword.bind(this)} value={this.state.password}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Continuar
            </Button>
          </Form>
        </div>           
    )
  }
}

export default LogInForm