import React, {useState, useEffect} from "react";
import { useContext } from "react";
import { getAllUsers } from "../context";
import { useFetching } from "../hooks/useFetching";
import UsersService from "../API/UsersService";
import Navigation from "../components/Navigation";


const MainPage = () => {

    const [totalUsers, setTotalUsers] = useState([]);
    const {users, setlAllUsers} = useContext(getAllUsers);

    const [fetchUsers, isLoading, isError] = useFetching(async () => {
        const response = await UsersService.getAll();
        setTotalUsers(response.items);
    });

    useEffect(() => {
        (users === false) ? fetchUsers() : setlAllUsers(totalUsers);
    },[]);

    return (
        <div className="container">
            <Navigation>

            </Navigation>
        </div>
    );
};

export default MainPage;