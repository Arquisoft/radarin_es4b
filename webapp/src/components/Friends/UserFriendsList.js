import React from 'react';
import Friend from "./Friend";
import { FriendsWrapper, FriendsCard, FriendsList } from "../../AppStyles"

function UserFriendsList(props) {


    return (
        <div>
            <h1 className="h1Card">Lista de amigos</h1>
            <FriendsWrapper>
                <FriendsCard className="friends-list">
                    <FriendsList src="user.friends">
                        {(friend) =>
                            <Friend friendID={friend.value} />
                        }
                    </FriendsList>
                </FriendsCard>
            </FriendsWrapper>
        </div>
    );
}

export default UserFriendsList;