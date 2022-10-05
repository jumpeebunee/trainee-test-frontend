import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllUsers } from "../context";
import UserProfile from "../components/UserProfile";
import departments from "../data/departments"
import back from '../img/back.svg';

const UserPage = () => {

    const { userId } = useParams();
    const {users, setlAllUsers} = useContext(getAllUsers);
    const [user, setUser] = useState([]);

    useEffect(() => {
        let currentUser = null;
        if (users) {
            currentUser = users.find(user => user.id === userId);
            setUser(currentUser);
        };
    })

    if (!users) {
        return (
            <div className="user-loading">Загрузка пользователя...</div>
        );
    };

    return (
        <div className="user-page">
            <div className="user-page__header">
                <div className="user-page__header-container container">
                    <div className="user-page__header-link">
                        <Link to="/"><button className="user-page__back" style={{backgroundImage: `url(${back})`}}></button></Link>
                    </div>
                    <UserProfile 
                        username={user.firstName + ' ' + user.lastName}
                        tag={user.userTag === 'string' ? '' : user.userTag}
                        department={departments[user.department]}
                        image={user.avatarUrl + `&t=${user.id}`}
                    ></UserProfile>
                </div>
            </div>
            <div className="user-page__info">
                <div className="container">
                    <ul className="user-page__list">
                        <li>
                            <div className="user-page__list-info">
                                <span></span>
                                <div>5 июня 1996</div>
                            </div>
                            <div className="user-page__list-age">24 года</div>
                        </li>
                        <li>
                            <div className="user-page__list-info">
                                <span></span>
                                <div>+7 (999) 900 90 90</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserPage;