import React from 'react';
import Button from "react-bootstrap/Button";
import { LoginContainer, LoginWrapper } from "../AppStyles";

class LogIn extends React.Component {


    async handleButton(e) {
        e.preventDefault()
        await this.props.logIn();
    }

    render() {
        return (
            <LoginWrapper>

                <LoginContainer>
                    <h2>Bienvenido</h2>
                    <br />
                    <h4>
                        <Button variant="primary" onClick={this.handleButton.bind(this)}>
                            Accede con tu POD</Button>
                    </h4>
                    <br />
                    <p>¿No tienes un POD? <a href="https://solidproject.org/users/get-a-pod">Hazte uno</a></p>
                </LoginContainer>
                <p class="alert">Es necesario añadir Radarin en aplicaciones de confianza</p>

            </LoginWrapper>
        );
    }
}

export default LogIn