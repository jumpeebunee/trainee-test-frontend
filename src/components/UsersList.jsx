import React from "react";
import UserItem from "./UserItem";
import ErrorFind from "./UI/ErrorFind/ErrorFind";
import ErrorMessage from "./UI/ErrorMessage/ErrorMessage";

const UserList = ({users, userDep, selectedSort, birthdayInYear, isError, fetchUsers}) => {
    if (isError) {
        console.log(isError)
        return (
            <ErrorMessage fetchUsers={fetchUsers}/>
        );
    };

    if (users.length === 0) {
        return (
           <ErrorFind/>
        )
    };

    return (
        <ul className="app-list">
            {users.map((user, index) => <UserItem
                key={user.id}
                user={user}
                index={index + 1}
                id={user.id}
                image={user.avatarUrl}
                firstName={user.firstName}
                lastName={user.lastName}
                userTag={user.userTag === 'string' ? '' : user.userTag}
                department={userDep[user.department]}
                selectedSort={selectedSort}
                birthdayInYear={birthdayInYear}
            ></UserItem>)}
        </ul>
    );
};

export default UserList;