import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getFriends } from "./api/api";
import Button from "react-bootstrap/Button";
import solidauth from "solid-auth-client";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Imports componentes
import SimpleMap from "./components/SimpleMap";
import LogInMessage from "./components/LogInMessage";
import UsersList from "./components/UsersList";
import Welcome from "./components/Welcome";
import Navigation from "./components/Navigation";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      mapOptions: {
        lat: "43.36",
        lon: "-5.85",
        zoom: 8,
      },
      webId: "",
      logged: false,
    };
  }

  async fetchUsers() {
    const URL = (await solidauth.currentSession()).webId;
    try {
      let listOfFriends = await getFriends(URL);
      this.setState((prevState) => ({ ...prevState, users: listOfFriends }));
      console.log(listOfFriends);
    } catch (error) {
      console.log("Error fetching user list from restapi. Is it on?");
    }
  }

  async logIn() {
    let session = await solidauth.currentSession();
    let popupUri = "https://solidcommunity.net/common/popup.html";
    if (!session) session = await solidauth.popupLogin({ popupUri }); //Muestra el pop up si no has iniciado sesión
    this.setState((oldState) => ({
      ...oldState,
      webId: session.webId,
      logged: !oldState.logged,
    }));
    this.fetchUsers();
    alert(`Has accedido como ${session.webId}`); //Si ya has iniciado sesión muestra el webID
  }

  logOut() {
    solidauth.logout().then(() => alert("Has desvinculado tu Pod"));
    this.setState((oldState) => ({
      ...oldState,
      webId: "",
      logged: !oldState.logged,
    }));
  }

  zoomInUser(user) {
    this.setState((prevState) => ({
      ...prevState,
      mapOptions: {
        lat: user.latitud,
        lon: user.longitud,
        zoom: 10,
      },
    }));
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">

        {!this.state.logged && (
          <header className="App-header">
            <h1>Radarin</h1>
          </header>
        )}
        {this.state.logged && (
          <Router>
            <Navigation></Navigation>
            <Switch>

              <Route exact path="/"><Welcome /></Route>

              <Route path="/amigos"><UsersList users={this.state.users} onUserClick={this.zoomInUser.bind(this)} /></Route>

              <Route path="/mapa">
                <div className="Friends">
                  <div className="UsersList">
                    <UsersList
                      users={this.state.users}
                      onUserClick={this.zoomInUser.bind(this)}
                    />
                    <Button variant="secondary" onClick={this.logOut.bind(this)}>
                      Desvincular Pod{" "}
                    </Button>
                  </div>

                  <SimpleMap
                    lat={this.state.mapOptions.lat}
                    lon={this.state.mapOptions.lon}
                    zoom={this.state.mapOptions.zoom}
                    marks={this.state.users.map((user) => {
                      return {
                        nombre: user.nombre,
                        lat: user.latitud,
                        lng: user.longitud,
                      };
                    })}
                  />
                </div>
              </Route>

            </Switch>
          </Router>
        )}

        {!this.state.logged && (
          <div className="App-content">
            <div className="NotLogged-content">
              <LogInMessage showLogInPopUp={this.logIn.bind(this)} />
              <br />
            </div>
          </div>
        )}

      </div>
    );
  }
}

export default App;
