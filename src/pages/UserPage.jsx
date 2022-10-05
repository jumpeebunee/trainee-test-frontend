import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllUsers } from "../context";
import UserProfile from "../components/UserProfile";
import UserInfoList from "../components/UserInfoList"
import departments from "../data/departments"
import back from '../img/back.svg';

const UserPage = () => {

    const { userId } = useParams();
    const {users, setlAllUsers} = useContext(getAllUsers);
    const [user, setUser] = useState([]);
    const [userInfo, setUserInfo] = useState({age: '', phone: '', birthday: ''});

    const mouthOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const yearsDeclaration = ['год', 'года', 'лет'];
    const yearCases = [2, 0, 1, 1, 1, 2];  

    const phoneFormat = (phone) => {
        let result = '';
        if (phone) {
            for (let i = 0; i < phone.length; i++) {
                if (i === 2) result += ' (';
                if (i === 5) result += ') ';
                if (i === 8 || i === 10) result += ' ';
                result += phone[i];
            };
        };
        return result;
    };

    const getUserInfo = () => {
        const date = new Date(user.birthday);
        let userAge = new Date().getFullYear() - date.getFullYear();
        let caseAge = (userAge % 100 > 4 && userAge % 100 < 20) ? 2 : yearCases[(userAge % 10 < 5) ? userAge % 10 : 5];
        let phoneNumber = phoneFormat(user.phone);

        setUserInfo (
            {
                ...userInfo,
                birthday: date.toLocaleDateString('ru-RU', mouthOptions).slice(0, -2),
                age: userAge.toString() + ` ${yearsDeclaration[caseAge]}`,
                phone: phoneNumber,
            }
        );
    };

    useEffect(() => {
        let currentUser = null;
        if (users) {
            currentUser = users.find(user => user.id === userId);
            setUser(currentUser);
            getUserInfo();
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
                    <UserInfoList 
                        age={userInfo.age}
                        birthday={userInfo.birthday}
                        phone={userInfo.phone}
                    ></UserInfoList>
                </div>
            </div>
        </div>
    );
};

export default UserPage;