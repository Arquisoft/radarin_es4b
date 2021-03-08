import React from 'react';


class UsersList extends React.Component{

    //Constructor
    constructor(){
        super()
    }

    //Formamos una tabla con la informacion de los usuarios contenidos en la lista que se pasó como parámetro ("users")
    render() {
        return (
            <div className="UsersList" class="table-responsive">
                <h2>Lista de amigos:</h2>
                <table class="table table-bordered" id="tableUsers">
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Latitud</th>
						<th>Longitud</th>
                        <th>Altitud</th>
					</tr>
				</thead>
				<tbody>
                    {this.props.users.map(function(user, i){
                        return (<tr key={i}>
                        <td id={"nombre" + i}>{user.nombre}</td>
                        <td id={"latitud" + i}>{user.latitud}</td>
                        <td id={"longitud" + i}>{user.longitud}</td>
                        <td id={"altitud" + i}>{user.altitud}</td>
                        </tr>)
                    })}
				</tbody>
			</table>
           </div>
        )
    }
}

export default UsersList