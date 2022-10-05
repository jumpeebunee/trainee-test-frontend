import React from "react";

const SortButtons = ({departments, selectedFilter, setSelectedFilter, ...props}) => {
    return (
        <ul {...props} className="app-navigation__list">
            {departments.map(dep => 
                <li key={dep.id}>
                    <button className={selectedFilter === dep.value ? 'active' : ''} onClick={(e) => setSelectedFilter(e.target.value)} value={dep.value}>{dep.title}</button>
                </li>
            )}
        </ul>
    );
};

export default SortButtons;