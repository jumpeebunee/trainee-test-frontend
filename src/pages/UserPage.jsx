import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllUsers } from "../context";
import UserProfile from "../components/UserProfile";
import departments from "../data/departments"
import back from '../img/back.svg';
import birthday from '../img/birthday.svg';
import phone from '../img/phone.svg'

const UserPage = () => {

    const { userId } = useParams();
    const {users, setlAllUsers} = useContext(getAllUsers);
    const [user, setUser] = useState([]);
    const [userInfo, setUserInfo] = useState({age: '', phone: '', birthday: ''});

    const declaration = ['год', 'года', 'лет'];
    const cases = [2, 0, 1, 1, 1, 2];  

    const getUserBirthday = () => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const date = new Date(user.birthday);
        let age = new Date().getFullYear() - date.getFullYear();
        let caseAge = (age % 100 > 4 && age % 100 < 20) ? 2 : cases[(age%10<5)?age%10:5];

        setUserInfo(
            {
                ...userInfo,
                birthday: date.toLocaleDateString('ru-RU', options).slice(0, -2),
                age: age.toString() + ` ${declaration[caseAge]}`
            });
    };

    useEffect(() => {
        let currentUser = null;
        if (users) {
            currentUser = users.find(user => user.id === userId);
            setUser(currentUser);
            getUserBirthday();
        };
    }, [users, user])

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
                                <span style={{backgroundImage: `url(${birthday})`}}></span>
                                <div>{userInfo.birthday}</div>
                            </div>
                            <div className="user-page__list-age">{userInfo.age}</div>
                        </li>
                        <li>
                            <div className="user-page__list-info">
                                <span style={{backgroundImage: `url(${phone})`}}></span>
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