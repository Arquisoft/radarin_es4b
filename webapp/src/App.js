import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getFriends } from "./api/api";
import solidauth from "solid-auth-client";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoggedIn, LoggedOut } from '@solid/react';
import { WhiteContainer } from './AppStyles';


//Imports componentes
import SimpleMap from "./components/SimpleMap";
import UsersMapList from "./components/UsersMapList";
import UserFriendsList from "./components/Friends/UserFriendsList";
import Welcome from "./components/Welcome";
import Navigation from "./components/Navigation";
import LogIn from "./components/LogIn";
import LogOut from "./components/LogOut";
import Home from "./components/Home";

class App extends React.Component {

  constructor() {
    super();
    this.loadWebId(); 
    this.state = {
      users: [],
     lat: null,
      lon: null,
      marks: [],
      webId: "",
      logged: false,
      zoom: 8
    };
    const self = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) { //watchPosition()
        self.state.lat = position.coords.latitude
        self.state.lon = position.coords.longitude
      });

    }
  }

  async loadWebId() {
    let session = await solidauth.currentSession();
    if(session) {
      sessionStorage.setItem("webId",session.webId); 
    }
    else {
      sessionStorage.setItem("webId",""); 
    }
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
    let popupUri = "https://solid.github.io/solid-auth-client/dist/popup.html";
    if (!session) session = await solidauth.popupLogin({ popupUri }); //Muestra el pop up si no has iniciado sesión
    sessionStorage.setItem("webId",session.webId); 
    window.location.replace("/");
  }

  logOut() {
    solidauth.logout();
    sessionStorage.setItem("webId",""); 
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
  setMarks() {
    this.setState((prevState) => ({
      ...prevState, marks:[],})),

    this.state.marks.push({
      nombre: 'YOU',
      lat: this.state.lat,
      lng: this.state.lon,
    })

      this.state.users.forEach(user => {
      this.state.marks.push({
        nombre: user.nombre,
        lat: user.latitud,
        lng: user.longitud,
      });
    });
      
    return this.state.marks;
  }
  render() {
    this.setMarks()
    return (
      <div className="App">
        <Router >
          <Navigation ></Navigation>

          <LoggedOut>
            <Switch>
              <Route path="/logIn"><LogIn logIn={this.logIn.bind(this)} /></Route>
              <Route path="/"><Welcome /></Route>
            </Switch>
          </LoggedOut>

          <LoggedIn>
            <Switch>

              <Route path="/amigos"><UserFriendsList/></Route>

              <Route path="/mapa">


                <WhiteContainer className="Friends">
                  <div className="UsersList">
                    <UsersMapList
                      fetchUsers={this.fetchUsers.bind(this)}
                      users={this.state.users}
                      onUserClick={this.zoomInUser.bind(this)}
                    />
                  </div>

                  <SimpleMap
                    fetchUsers={this.fetchUsers.bind(this)}
                    lat={this.state.lat}
                    lon={this.state.lon}
                    zoom={this.state.zoom}
                    marks={this.state.marks}
                  />
                </WhiteContainer>
              </Route>

              <Route path="/logOut"><LogOut logOut={this.logOut.bind(this)} /></Route>
              

              <Route path="/"><Home /></Route>

            </Switch>
          </LoggedIn>

        </Router>
      </div>
    );
  }
}

export default App;
