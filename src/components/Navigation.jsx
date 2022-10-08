import React from "react";
import Searchbar from "./Searchbar";
import SortButtons from "./SortButtons";

const Navigation = ({setModal, departments, selectedFilter, setSelectedFilter, searchQuery, setSearchQuery, checkNetwork, networkLoading}) => {

    let errorText = 'Не могу обновить данные. Проверь соединение с интернетом.';
    let errClasses = 'app-navigation__head app-navigation__head_error'
    
    if (networkLoading) {
        errorText = 'Секундочку, гружусь...';
        errClasses = 'app-navigation__head app-navigation__head_error app-navigation__head_loading'
    };

    return (
        <div className='app-navigation'>
            <div className={!checkNetwork || networkLoading ? errClasses : 'app-navigation__head'}>
                <div className="container">
                    <h2 className={!checkNetwork || networkLoading ? 'app-navigation__heading_error ' : ''}>Поиск</h2>
                    {!checkNetwork || networkLoading 
                    ? <p className="app-navigation__description">{errorText}</p>
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