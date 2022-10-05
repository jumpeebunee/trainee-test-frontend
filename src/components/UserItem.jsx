import React from "react";
import { Link } from "react-router-dom";

const UserItem = ({image, id, firstName, lastName, userTag, department}) => {
    return (
        <li className="app-list__item">
            <div>
                <Link className="app-list__link">
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
                </Link>
            </div>
        </li>
    );
};

export default UserItem;