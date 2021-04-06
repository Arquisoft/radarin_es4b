import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getFriends } from "./api/api";
import Button from "react-bootstrap/Button";
import solidauth from "solid-auth-client";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Imports componentes
import SimpleMap from "./components/SimpleMap";
import UsersList from "./components/UsersList";
import Welcome from "./components/Welcome";
import Navigation from "./components/Navigation";
import LogIn from "./components/LogIn";

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
  }

  logOut() {
    solidauth.logout(); 
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
        <Router >
          <Navigation logged = {this.state.logged}></Navigation>

          {!this.state.logged && (
            <Switch>
              <Route path="/logIn"><LogIn logIn={this.logIn.bind(this)}/></Route>
              <Route path="/"><Welcome /></Route>
            </Switch>
          )}

          {this.state.logged && (
            <Switch>

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

              <Route path="/logIn"><Welcome/></Route>

              <Route path="/"><Welcome /></Route>

            </Switch>
          )}
        </Router>
      </div>
    );
  }
}

export default App;
