import React from 'react';
import './App.css';
import URLForm from "./components/URLForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFriends } from "./api/api";
import { inyectSamples } from "./api/api";
import UsersList from "./components/UsersList";
import Button from "react-bootstrap/Button";

import SimpleMap from './components/SimpleMap';
import LogInMessage from './components/LogInMessage';

import solidauth from 'solid-auth-client';
import LoadingButton from './components/LoadingButton';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      users: [],
      mapOptions: {
        lat: "43.36",
        lon: "-5.85",
        zoom: 8
      },
      webId: "",
      logged: false
    }

  }

  async fetchUsers(URL) {


    URL = (await solidauth.currentSession()).webId;
    try {
      let listOfFriends = await getFriends(URL)
      this.setState(prevState => ({ ...prevState, users: listOfFriends }));
      console.log(listOfFriends)
    }
    catch (error) {
      console.log("Error fetching user list from restapi. Is it on?")
    }
  }


  async showLogInPopUp() {
    let session = await solidauth.currentSession();
    let popupUri = 'https://solidcommunity.net/common/popup.html';
    if (!session)
      session = await solidauth.popupLogin({ popupUri }); //Muestra el pop up si no has iniciado sesión
    this.state.webId = session.webId;
    this.setState(oldState => ({ logged: !oldState.logged }));
    alert(`Has accedido como ${session.webId}`); //Si ya has iniciado sesión muestra el webID

  }

  logOut() {
    solidauth.logout().then(() => alert('Has desvinculado tu Pod'));
    this.state.webId = "";
    this.setState(oldState => ({ logged: !oldState.logged }));
  }

  zoomInUser(user) {
    this.setState(prevState => ({
      ...prevState,
      mapOptions: {
        lat: user.latitud,
        lon: user.longitud,
        zoom: 10
      }
    }));
    console.log(this.state)
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Radarin</h1>
        </header>
        <div className="App-content">

          {!this.state.logged && <div className="NotLogged-content">
            <LogInMessage showLogInPopUp={this.showLogInPopUp.bind(this)} />
            <br />
          </div>}

          {this.state.logged && <div className="Logged-content">
            <LoadingButton variant="secondary" action={this.fetchUsers.bind(this)}> Mostrar amigos</LoadingButton>
            <br />
            <Button variant="secondary" onClick={this.logOut.bind(this)}>Desvincular Pod </Button>



            {/*<URLForm fetchUsers={this.fetchUsers.bind(this)}/>*/}
            <br />
            <UsersList users={this.state.users} onUserClick={this.zoomInUser.bind(this)} />
            <br />

          </div>}
        </div>
        <SimpleMap
            lat={this.state.mapOptions.lat}
            lon={this.state.mapOptions.lon}
            zoom={this.state.mapOptions.zoom}
            marks={this.state.users.map(user => { return { nombre: user.nombre, lat: user.latitud, lng: user.longitud } })}
          />
      </div>
    )
  }
}

export default App;