import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class URLForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {url: ''}
  }

  changeUrl(e) {
    const url = e.target.value ;
    this.setState({url: url});
  }

  changeUserName(e) {
    const username = e.target.value ;
    this.setState({username: username});
  }

  async handleSubmit(e) {
    e.preventDefault()
    //Add the user to the database
    if (this.state.url){
      this.props.fetchUsers(this.state.url)
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
        </div>           
    )
  }
}

export default URLForm