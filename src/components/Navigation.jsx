import React from "react";
import Searchbar from "./Searchbar";
import SortButtons from "./SortButtons";

const Navigation = ({setModal}) => {
    return (
        <div className="app-navigation">
            <h2 className="app-navigation__heading">Поиск</h2>
            <Searchbar setModal={setModal}></Searchbar>
            <SortButtons></SortButtons>
        </div>
    );
};

export default Navigation;