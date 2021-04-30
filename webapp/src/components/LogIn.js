import React from 'react';
import Button from "react-bootstrap/Button";
import { LoginContainer, LoginWrapper } from "../AppStyles";
import { getText } from '../translations/i18n';

class LogIn extends React.Component {


    async handleButton(e) {
        e.preventDefault()
        await this.props.logIn();
    }

    render() {
        return (
            <LoginWrapper>

                <LoginContainer>
                    <h2>{ getText("login.bienvenida") }</h2>
                    <br />
                    <h4>
                        <Button variant="primary" onClick={this.handleButton.bind(this)}>
                        { getText("login.botonInicio") }</Button>
                    </h4>
                    <br />
                    <p>{ getText("login.info1") }<a href="https://solidproject.org/users/get-a-pod">{ getText("login.info2") }</a></p>
                </LoginContainer>
                <p class="alert"><a href="https://github.com/Arquisoft/radarin_es4b/wiki/Manual-de-usuario">{ getText("login.info3") }</a> </p>

            </LoginWrapper>
        );
    }
}

export default LogIn