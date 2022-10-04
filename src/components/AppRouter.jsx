import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";


const AppRouter = () => {
    return (
        <Routes>
            <Route element={<MainPage/>} path="/"></Route>
        </Routes>
    );
};

export default AppRouter;