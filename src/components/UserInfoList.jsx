import React from "react";
import birthdayIcon from '../img/birthday.svg';
import phoneIcon from '../img/phone.svg'

const UserInfoList = ({birthday, age, phone}) => {
    return (
        <ul className="user-page__list">
            <li>
                <div className="user-page__list-info">
                    <span style={{backgroundImage: `url(${birthdayIcon})`}}></span>
                    <div>{birthday}</div>
                </div>
                <div className="user-page__list-age">{age}</div>
            </li>
            <li>
                <div className="user-page__list-info">
                    <span style={{backgroundImage: `url(${phoneIcon})`}}></span>
                    <a href={`tel:${phone}`}>{phone}</a>
                </div>
            </li>
        </ul>
    );
};

export default UserInfoList;