import React from 'react';
import Friend from "./Friend";
import { DivConFondo, FriendsWrapper, FriendsCard, FriendsList } from "../../AppStyles"

function UserFriendsList(props) {


    return (
        <DivConFondo>
            <h1>Lista de amigos</h1>
            <FriendsWrapper>
                <FriendsCard className="friends-list">
                    <FriendsList src="user.friends">
                        {(friend) =>
                            <Friend friendID={friend.value} />
                        }
                    </FriendsList>
                </FriendsCard>
            </FriendsWrapper>
        </DivConFondo>
    );
}

export default UserFriendsList;