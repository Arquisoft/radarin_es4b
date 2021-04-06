import React from "react";
import { Redirect } from 'react-router-dom';


class LogOut extends React.Component {

    async handleButton() {
        await this.props.logOut();
    }

    render() {
        this.handleButton(); 
        return (<Redirect to="/" />);
    }
}

export default LogOut