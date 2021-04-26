import Button from "react-bootstrap/Button";
import React from 'react';
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { addFriend } from "./addFriendFunction";
import { getText } from '../../translations/i18n';


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
                <h4>{ getText("addFriend.titulo") }</h4>
                <Form name="friend">
                    <Form.Group>
                        <Form.Label>{ getText("addFriend.solicitud") }</Form.Label>
                        <Form.Control name="url" type="text" placeholder="WebID/URL" onChange={this.changeUrl.bind(this)} value={this.state.friendWebId} required/>
                        <Form.Control.Feedback type="invalid">{ getText("addFriend.feedback") }</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" onClick={() => addFriend(this.state.friendWebId,sessionStorage.getItem("webId"))}>
                        { getText("addFriend.accion") }</Button>
                </Form>
                <div className="AddFriend-Alert">
                {this.state.showAlert && <Alert variant="success" onClose={ this.setState((prevState) => ({ ...prevState, showAlert: true }))} dismissible>
                { getText("addFriend.exito") }
                </Alert>}
                </div>
            </div>
        )
    }






}

export default AddFriend