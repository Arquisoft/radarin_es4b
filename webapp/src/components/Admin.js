import React from 'react';
import Button from "react-bootstrap/Button";
import { getUsers } from '../api/api';
import { banUser } from '../api/api';
import Friend from "./Friends/Friend";
import { FriendsWrapper, FriendsCard,LoginWrapper } from "../AppStyles"
import { getText } from '../translations/i18n';

class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = { users: [], nUsers: 0 }
        this.updateUsers();
    }



    displayUsers() {
        let users = this.state.users;
        console.log(users);
    }

    async updateUsers() {
        let allUsers = await getUsers();
        this.setState({ users: allUsers, nUsers: allUsers.length });
        console.log(this.state.users);


        this.state.users.map(user => { console.log(user.URL) })



    }


    async banUser(user) {

        await banUser(user.URL);

        this.updateUsers();

    }



    render() {
        return (

            <div>
                <h1 className="h1Card">{getText("admin.titulo")}</h1>



                <LoginWrapper>
                    <FriendsCard>
                        <h4>{getText("admin.usuariosTotales")}{this.state.nUsers}</h4>
                    </FriendsCard>
                </LoginWrapper>

                {this.state.users.map(user => {
                    return (
                        <FriendsWrapper>
                            <FriendsCard className="friends-list">
                                <Friend friendID={user.URL} />
                                <h3>{getText("admin.ubicacion")}</h3>
                                <p>{getText("admin.fecha")}{user.fecha}</p>
                                <p>{getText("admin.latitud")}{user.location.coordinates[1]}</p>
                                <p>{getText("admin.longitud")}{user.location.coordinates[0]}</p>
                                <p>{getText("admin.baneado")}{user.banned}</p>
                                <Button variant="danger" onClick={() => this.banUser(user)}>{getText("admin.botonBan")}</Button>
                                <p>---</p>
                            </FriendsCard>
                        </FriendsWrapper>
                    );
                })}


            </div>
        );
    }


}
export default Admin;