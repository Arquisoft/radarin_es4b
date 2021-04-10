import React from 'react';
import { Name } from "@solid/react";
import { ListItemText, ListItem } from "@material-ui/core";
import data from "@solid/query-ldflex";
import { FriendImage, FriendImageContainer } from "../../AppStyles";



function Friend(props) {

    const image = data[props.friendID].vcard_hasPhoto;

    return (
        <ListItem id={props.friendID}>
            <FriendImageContainer>
                <FriendImage src={image} defaultSrc="/img/defaultUser.png" />
            </FriendImageContainer>
            <ListItemText primary={<Name src={props.friendID} />} secondary={<a href={props.friendID}>URL del POD de <Name src={props.friendID} /></a>} />
        </ListItem>
    );
}

export default Friend;