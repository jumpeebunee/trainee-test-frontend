import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import UserPage from "../pages/UserPage";


const AppRouter = () => {
    return (
        <Routes>
            <Route element={<MainPage/>} path="/"></Route>
            <Route element={<UserPage/>} path="/user/:userId"></Route>
        </Routes>
    );
};

export default AppRouter;