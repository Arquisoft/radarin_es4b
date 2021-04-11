import Button from "react-bootstrap/Button";
import React from 'react';
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { addFriend } from "./addFriendFunction";



class AddFriend extends React.Component {


    constructor(props) {
        super(props);
        this.state = { friendWebId: '' , showAlert: false}
    }


    changeUrl(e) {
        const url = e.target.value ;
        this.setState({friendWebId: url});
    }
    





    render() {
        return (
            <div className="AddFriend">
                <h4>Añadir amigo</h4>
                <Form name="friend">
                    <Form.Group>
                        <Form.Label>Introduce el WebID de tu amigo:</Form.Label>
                        <Form.Control name="url" type="text" placeholder="WebID/URL" onChange={this.changeUrl.bind(this)} value={this.state.friendWebId} required/>
                        <Form.Control.Feedback type="invalid">Escriba un WebID válido</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" onClick={() => addFriend(this.state.friendWebId,sessionStorage.getItem("webId"))}>Añadir</Button>
                </Form>
                <div className="AddFriend-Alert">
                {this.state.showAlert && <Alert variant="success" onClose={ this.setState((prevState) => ({ ...prevState, showAlert: true }))} dismissible>
                ¡Amigo añadido con éxito!
                </Alert>}
                </div>
            </div>
        )
    }






}

export default AddFriend