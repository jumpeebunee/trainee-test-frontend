import React from "react";
import cl from './LoadingUsers.module.css';

const LoadingUsers = () => {
    return (
        <li className={cl.loadingItem}>
            <div className={cl.loadingImage}></div>
            <div>
                <div className={cl.loadingName}></div>
                <div className={cl.loadingAbout}></div>
            </div>
        </li>
    );
};

export default LoadingUsers;