import React from "react";
import LoadingUsers from "../components/UI/LoadingUsers";

const LoadingList = () => {
    return (
        <ul>
            <LoadingUsers/>
            <LoadingUsers/>
            <LoadingUsers/>
            <LoadingUsers/>
            <LoadingUsers/>
            <LoadingUsers/>
            <LoadingUsers/>
        </ul>
    );
};

export default LoadingList;