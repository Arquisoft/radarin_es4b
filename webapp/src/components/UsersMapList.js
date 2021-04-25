import Button from "react-bootstrap/Button";
import React from 'react';
import { getText } from '../translations/i18n'


class UsersMapList extends React.Component {

    constructor(props) {
        super(props); 
        this.props.fetchUsers();  
    }

    render() {
        return (
            <div className="table-responsive">
                <h2>{ getText("userMapList.titulo") }</h2>
                <table className="table table-bordered" id="tableUsers">
				<thead>
					<tr>
						<th>{ getText("userMapList.nombre") }</th>
						<th>{ getText("userMapList.latitud") }</th>
						<th>{ getText("userMapList.longitud") }</th>
                        <th>{ getText("userMapList.altitud") }</th>
					</tr>
				</thead>
				<tbody>
                    {this.props.users.map(function(user, i){
                        return (<tr key={i}>
                        <td id={"nombre" + i}>
                            <Button onClick={() => this.props.onUserClick(user)} variant="link">{user.nombre}</Button>
                        </td>
                        <td id={"latitud" + i}>{user.latitud}</td>
                        <td id={"longitud" + i}>{user.longitud}</td>
                        <td id={"altitud" + i}>{user.altitud}</td>
                        </tr>)
                    }.bind(this))}
				</tbody>
			</table>
           </div>
        )
    }
}

export default UsersMapList