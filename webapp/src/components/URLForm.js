import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {getFriends} from '../api/api'
import UsersList from "./UsersList";

class URLForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {url: '', users:[]}
  }

  componentDidMount(){
    this.fetchUsers()
  }

  changeUrl(e) {
    const url = e.target.value ;
    this.setState({url: url});
  }

  changeUserName(e) {
    const username = e.target.value ;
    this.setState({username: username});
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

  async handleSubmit(e) {
    e.preventDefault()
    //Add the user to the database
    if (this.state.url){
      this.fetchUsers(this.state.url)
    }
  }

  render(){
    return(
        <div className="URLForm">
          <Form name="register" onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group>
              <Form.Label>URL del POD</Form.Label>
              <Form.Control name="url" type="text" placeholder="Url del POD" onChange={this.changeUrl.bind(this)} value={this.state.url}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <br/>
          <UsersList users={this.state.users}/>
        </div>           
    )
  }
}

export default URLForm