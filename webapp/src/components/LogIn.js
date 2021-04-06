import React from 'react';
import Button from "react-bootstrap/Button";

class LogIn extends React.Component {

    async handleButton(e) {
        e.preventDefault()
        await this.props.logIn();
    }

    render() {
        return (
            <div className="Login-content">
                <div className="LogInMessage">
                    <h2>Bienvenido</h2>
                    <br />
                    <h4>
                        <Button variant="primary" onClick={this.handleButton.bind(this)}>
                            Accede con tu POD</Button>
                    </h4>
                    <br />
                    <br />
                    <p>¿No tienes un POD? <a href="https://solidproject.org/users/get-a-pod">Hazte uno</a></p>
                </div>
                <br />
            </div>
        );
    }
}

export default LogIn