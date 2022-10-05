import React from "react";
import cl from "./ErrorFind.module.css";
import errorFind from "../../../img/error-find.png"

const ErrorFind = () => {
    return (
        <div className={cl.errorMessageActive}>
            <span className={cl.errorMessageImg} style={{backgroundImage: `url(${errorFind})`}}></span>
            <h3 className={cl.errorMessageHeading}>Мы никого не нашли</h3>
            <p className={cl.errorMessageDescription}>Попробуй скорректировать запрос</p>
        </div>
    );  
};

export default ErrorFind;