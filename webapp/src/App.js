import React from 'react';
import './App.css';
import logo from './logo.svg';
import Welcome from './components/Welcome';
import URLForm from "./components/URLForm";
import UserList from "./components/UserList";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component{
  constructor(){
    super()
    this.state = {users:[]}
  }


  render(){
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <Welcome name="ASW students"/>
        </header>
        <div className="App-content">
          <URLForm/>
          <UserList users={this.state.users}/>
          <a className="App-link"
            href="https://github.com/pglez82/radarin_0"
            target="_blank"
            rel="noopener noreferrer">Source code</a>
        </div>
      </div>
    )
  }
}

export default App;