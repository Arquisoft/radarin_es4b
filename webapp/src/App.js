import React from 'react';
import './App.css';
import logo from './logo.svg';
import Welcome from './components/Welcome';
import URLForm from "./components/URLForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import {getFriends} from "./api/api";
import UsersList from "./components/UsersList";

import SimpleMap from './components/SimpleMap';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      users: []
    }
  }

  async fetchUsers(URL){
    try{
      let listOfFriends = await getFriends(URL)
      this.setState({users: listOfFriends});
      console.log(listOfFriends)
    }
    catch(error)
    {
      console.log("Error fetching user list from restapi. Is it on?")
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Welcome name="ASW students" />
        </header>
        <div className="App-content">
          <URLForm fetchUsers={this.fetchUsers.bind(this)}/>
          <br/>
          <UsersList users={this.state.users}/>
          <br/>
        </div>
        <SimpleMap lat="43" lon="-5" marks={this.state.users.map(user => {return { nombre: user.nombre, lat: user.latitud, lng: user.longitud }})}/> 
      </div>
    )
  }
}

export default App;