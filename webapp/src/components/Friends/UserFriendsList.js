import React from 'react';
import Friend from "./Friend";
import { FriendsWrapper, FriendsCard, FriendsList } from "../../AppStyles"
import AddFriend from '../AddFriend/AddFriend';
import { getText } from '../../translations/i18n';

function UserFriendsList(props) {


    return (
        <div>
            <h1 className="h1Card">{ getText("userFriendsList.titulo") }</h1>
            <FriendsWrapper>
                <FriendsCard className="friends-list">
                    <FriendsList src="user.friends">
                        {(friend) =>
                            <Friend friendID={friend.value} />
                        }
                    </FriendsList>
                </FriendsCard>
            </FriendsWrapper>
            <AddFriend />
        </div>
    );
}

export default UserFriendsList;