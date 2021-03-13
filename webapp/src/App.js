import React from 'react';
import './App.css';
import URLForm from "./components/URLForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import {getFriends} from "./api/api";
import UsersList from "./components/UsersList";

import SimpleMap from './components/SimpleMap';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      users: [],
      mapOptions : {
        lat: "43.36",
        lon: "-5.85",
        zoom: 8
      }
    }
  }

  async fetchUsers(URL){
    try{
      let listOfFriends = await getFriends(URL)
      this.setState(prevState => ({...prevState, users: listOfFriends}));
      console.log(listOfFriends)
    }
    catch(error)
    {
      console.log("Error fetching user list from restapi. Is it on?")
    }
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
          <URLForm fetchUsers={this.fetchUsers.bind(this)}/>
          <br/>
          <UsersList users={this.state.users} onUserClick={this.zoomInUser.bind(this)}/>
          <br/>
        </div>
        <SimpleMap 
          lat={this.state.mapOptions.lat} 
          lon={this.state.mapOptions.lon} 
          zoom={this.state.mapOptions.zoom}
          marks={this.state.users.map(user => {return { nombre: user.nombre, lat: user.latitud, lng: user.longitud }})}
        /> 
      </div>
    )
  }
}

export default App;