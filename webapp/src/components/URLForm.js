import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {getFriends} from '../api/api'

class URLForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {url: '', enabled: false}
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
      let users = await getFriends(URL)
      console.log(users)
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
          <Form name="register" onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group>
              <Form.Label>URL del POD</Form.Label>
              <Form.Control name="url" type="text" placeholder="Url del POD" onChange={this.changeUrl.bind(this)} value={this.state.url}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
    )
  }
}

export default URLForm