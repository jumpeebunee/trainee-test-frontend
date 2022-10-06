import React from "react";
import Searchbar from "./Searchbar";
import SortButtons from "./SortButtons";

const Navigation = ({setModal, departments, selectedFilter, setSelectedFilter, searchQuery, setSearchQuery, checkNetwork}) => {
    return (
        <div className='app-navigation'>
            <div className={!checkNetwork ? 'app-navigation__head app-navigation__head_error' : 'app-navigation__head'}>
                <div className="container">
                    <h2 className={!checkNetwork ? 'app-navigation__heading_error ' : ''}>Поиск</h2>
                    {!checkNetwork 
                    ? <p className="app-navigation__description">Не могу обновить данные. Проверь соединение с интернетом.</p>
                    : <Searchbar 
                        setModal={setModal}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                      ></Searchbar>
                    }
                </div>
            </div>
            <div className="container">
                <SortButtons 
                    style={{marginTop: '8px'}}
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                    departments={departments}
                ></SortButtons>
            </div>
        </div>
    );
};

export default Navigation;