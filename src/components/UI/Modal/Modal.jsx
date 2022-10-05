import React from "react";
import cl from './Modal.module.css';
import close from '../../../img/close.svg'

const Modal = ({visible, setVisible, selectedSort, setSelectedSort}) => {

    const rootClasses = [cl.modal];

    if (visible) rootClasses.push(cl.active);

    return (
        <div className={rootClasses.join(' ')}>
            <div className={cl.modalContent}>
                <h2 className={cl.modalHeading}>Сортировка</h2>
                <button onClick={() => setVisible(false)} className={cl.closeModal}>
                    <span style={{backgroundImage: `url(${close})`}} className={cl.closeModalIcon}></span>
                </button>
                <label className={cl.sort__label}>
                    <input checked={selectedSort === 'firstName'} onChange={(e) => setSelectedSort(e.target.value)} className={cl.sort__radio} type="radio" name="sort" value="firstName"/>
                    <span className={cl.sort__value}></span>
                    По алфавиту
                </label>
                <label className={cl.sort__label}>
                    <input onChange={(e) => setSelectedSort(e.target.value)} className={cl.sort__radio} type="radio" name="sort" value="birthday"/>
                    <span className={cl.sort__value}></span>
                    По дню рождения
                </label>
            </div>
        </div>
    );
};

export default Modal;