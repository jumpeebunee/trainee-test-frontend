import React from "react";
import cl from "./ErrorMessage.module.css";
import errorLoading from "../../../img/error-loading.png"

const ErrorMessage = ({fetchUsers}) => { 
    return (
        <div className={cl.errorMessageActive}>
            <span className={cl.errorMessageImg} style={{backgroundImage: `url(${errorLoading})`}}></span>
            <h3 className={cl.errorMessageHeading}>Какой-то сверхразум все сломал</h3>
            <p className={cl.errorMessageDescription}>Постараемся быстро починить</p>
            <button className={cl.errorMessageButton} onClick={() => fetchUsers()}>Попробовать снова</button>
        </div>
    );  
};

export default ErrorMessage;