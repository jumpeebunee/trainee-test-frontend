import React from "react";
import Searchbar from "./Searchbar";
import SortButtons from "./SortButtons";

const Navigation = ({setModal, departments, selectedFilter, setSelectedFilter, searchQuery, setSearchQuery}) => {
    return (
        <div className="app-navigation">
            <h2 className="app-navigation__heading">Поиск</h2>
            <Searchbar 
                setModal={setModal}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            ></Searchbar>
            <SortButtons 
                style={{marginTop: '8px'}}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                departments={departments}
            ></SortButtons>
        </div>
    );
};

export default Navigation;