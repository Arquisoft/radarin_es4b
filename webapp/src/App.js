import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getFriends, isBanUser } from "./api/api";
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
import Admin from "./components/Admin";

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      users: [],
      lat: null,
      lon: null,
      marks: [],
      mapOptions: {zoom: 8
        ,radius: 10000}
    };
  }

  componentDidMount() {
    this.loadWebId();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.updateUserPosition.bind(this));
    }
  }

  updateUserPosition(position) {
    if (position) {
      this.setState((prevState) => ({
        ...prevState,
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        mapOptions: {
          ...prevState.mapOptions,
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
      }));
    }
  }

  async loadWebId() {
    let session = await solidauth.currentSession();
    if (session) {
      sessionStorage.setItem("webId", session.webId);
      let a = await isBanUser(session.webId);
      if(a) {
        this.logOut();
      }
    }
    else {
      sessionStorage.setItem("webId", "");
    }
  }

  async fetchUsers() {
    solidauth.trackSession(async session => {
      if(session) {
        try {
          let listOfFriends = await getFriends(session.webId);
          this.setState((prevState) => ({ 
            ...prevState, 
            users: listOfFriends, 
            marks: this.getMarks(listOfFriends) 
          }));
          console.log(listOfFriends);
        } catch (error) {
          console.log("Error fetching user list from restapi. Is it on?");
        }
      }
    });
  }

  async logIn() {
    let session = await solidauth.currentSession();
    let popupUri = "https://solid.github.io/solid-auth-client/dist/popup.html";
    if (!session) session = await solidauth.popupLogin({ popupUri}); //Muestra el pop up si no has iniciado sesión
    sessionStorage.setItem("webId", session.webId);
    window.location.replace("/");
    let a = await isBanUser(session.webId);
    if(a) {
      this.logOut();
    }
  }

  logOut() {
    solidauth.logout();
    sessionStorage.setItem("webId", "");
  }

  zoomInUser(user) {
    this.setState((prevState) => ({
      ...prevState,
      mapOptions: {
        lat: user.latitud,
        lon: user.longitud,
        zoom: 12,
      },
    }));
  }
  distanceTo(lat2, lng2) {
    const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
        new window.google.maps.LatLng({ lat: this.state.lat, lng: this.state.lon }),
        new window.google.maps.LatLng({ lat: lat2, lng: lng2 }));
    return distance;
  }

  getMarks(users) {
    let newMarks = [];

    if (this.state.lat || this.state.lon) {
      newMarks.push({
        nombre: 'YOU',
        lat: this.state.lat,
        lng: this.state.lon,
      })
    }

    users.forEach(user => {
      if (this.distanceTo(user.latitud,user.longitud) < this.state.mapOptions.radius)
      newMarks.push({
        nombre: user.nombre,
        lat: user.latitud,
        lng: user.longitud,
        foto: user.foto,
        fecha: user.fecha
      });
    });
    console.log(this.state.mapOptions.radius);
    return newMarks;
  }
  handRangeChange(event) {
    this.setState((prevState) => ({
      ...prevState,
      mapOptions: {
        lat:this.state.mapOptions.lat,
        lon:this.state.mapOptions.lon,
        zoom: this.state.mapOptions.zoom,
        radius: event.target.value },
    }));
    this.setState({marks: this.getMarks(this.state.users)}) ;
  }

  render() {
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

              <Route path="/amigos"><UserFriendsList /></Route>

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
                    radius = {this.state.radius}
                    handRangeChange = {(event) => this.handRangeChange(event)}
                    mapOptions={this.state.mapOptions}
                    lat={this.state.lat}
                    lon={this.state.lon}
                    marks={this.state.marks}
                  />
                </WhiteContainer>
              </Route>

              <Route path="/logOut"><LogOut logOut={this.logOut.bind(this)} /></Route>
              {
                  sessionStorage.getItem("webId") === "https://radarinadmin.solidcommunity.net/profile/card#me" &&
                  <Route path="/admin"><Admin /></Route>

                }

              <Route path="/"><Home /></Route>

            </Switch>
          </LoggedIn>

        </Router>
      </div>
    );
  }
}

export default App;
