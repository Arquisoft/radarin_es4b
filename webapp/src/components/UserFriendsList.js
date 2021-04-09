import React from 'react';
import data from "@solid/query-ldflex";


function UserFriendsList(props) {
    const webId = sessionStorage.getItem("webId");
    const image = data[webId].vcard_hasPhoto;

    return (
        <h1>Parte en desarrollo. Se sacaran los amigos del POD del usuario.</h1>
    );
}

export default UserFriendsList;