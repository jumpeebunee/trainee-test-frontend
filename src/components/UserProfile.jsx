import React from "react";

const UserProfile = ({username, tag, department, image}) => {
    return (
        <div className="user-profile">
            <img src={image}/>
            <div className="user-profile__name">
                <h3>{username}</h3>
                <span>{tag}</span>
            </div>
            <div className="user-profile__job">{department}</div>
        </div>
    );
};
export default UserProfile;