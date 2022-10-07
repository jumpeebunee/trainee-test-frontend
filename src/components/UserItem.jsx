import React from "react";
import { Link } from "react-router-dom";

const UserItem = ({selectedSort, user, birthdayInYear, image, index, id, firstName, lastName, userTag, department}) => {

    const dateOptions = {month: 'short', day: 'numeric'};

    return (
        <li className="app-list__item">
            <div>
                <Link to={'user/' + id} className="app-list__link">
                    <div className="app-list__content">
                        <img src={image + `&t=${id}`} className="app-list__img"/>
                        <div>
                            <div className="app-list__content-user">
                                <strong>{firstName + ' ' + lastName}</strong>
                                <span>{userTag}</span>
                            </div>
                            <div className="app-list__user-department">{department}</div>
                        </div>
                    </div>
                    <div className={selectedSort === 'birthday' ? 'app-list__birthday_active' : 'app-list__birthday'}>
                        {
                            new Date(user.birthday).toLocaleDateString('ru-RU', dateOptions).slice(0, -1)
                        }
                    </div>
                </Link>
                <div className={(index === birthdayInYear && selectedSort === 'birthday') ? 'app-list__birth-next' : 'app-list__birth-prev'}>
                    <div className='app-list__birth-line'></div>
                    <div className='app-list__birth-year'>{new Date().getFullYear() + 1}</div>
                    <div className='app-list__birth-line'></div>
                </div>
            </div>
        </li>
    );
};

export default UserItem;