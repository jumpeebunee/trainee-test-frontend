import React from "react";
import UserItem from "./UserItem";

const UserList = ({users, userDep}) => {
    return (
        <ul className="app-list">
            {users.map((user, index) => <UserItem
            key={user.id}
            id={user.id}
            image={user.avatarUrl}
            firstName={user.firstName}
            lastName={user.lastName}
            userTag={user.userTag === 'string' ? '' : user.userTag}
            department={userDep[user.department]}
            ></UserItem>)}
        </ul>
    );
};

export default UserList;