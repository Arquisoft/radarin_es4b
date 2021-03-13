import React from 'react';
import Form from "react-bootstrap/Form";
import LoadingButton from './LoadingButton';

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

  async handleSubmit() {
    if (this.state.url){
      await this.props.fetchUsers(this.state.url)
    }
  }

  render(){
    return(
        <div className="URLForm">
          <Form name="friends">
            <Form.Group>
              <Form.Label>Introduce tu WebID:</Form.Label>
              <Form.Control name="url" type="text" placeholder="WebID" onChange={this.changeUrl.bind(this)} value={this.state.url}/>
            </Form.Group>
            <LoadingButton variant="primary" type="submit" action={this.handleSubmit.bind(this)}>
              Enviar
            </LoadingButton>
          </Form>
        </div>           
    )
  }
}

export default URLForm