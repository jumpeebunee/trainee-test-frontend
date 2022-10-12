import React from "react";
import search from '../img/search.svg';
import modal from "../img/modal.svg";

const Searchbar = ({setModal, setSearchQuery, value}) => {

    let t = 0;

    const waiting = (e) => {
        clearTimeout(t);
        t = setTimeout((e) => {
            setSearchQuery(e);
        }, 500, (e));
    };

    return (
        <div className="app-searchbar">
            <div className="app-searchbar__input">
                <span style={{backgroundImage: `url(${search})`}} className="app-searchbar__input-icon"></span>
                <input onChange={(e) => waiting(e.target.value)} className="app-searchbar__input-main" placeholder="Введи имя, тег, почту..." type="text"/>
            </div>
            <button onClick={() => setModal(true)} style={{backgroundImage: `url(${modal})`}} className="app-searchbar__input-icon"></button>
        </div>
    );
};


export default Searchbar;