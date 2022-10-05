import React, {useState, useEffect} from "react";
import { useContext } from "react";
import { getAllUsers } from "../context";
import { useFetching } from "../hooks/useFetching";
import UsersService from "../API/UsersService";
import Navigation from "../components/Navigation";
import UserList from "../components/UsersList";
import LoadingList from "../components/LoadingList";

const MainPage = () => {

    const [totalUsers, setTotalUsers] = useState([]);
    const {users, setlAllUsers} = useContext(getAllUsers);

    const userDep = {
        android: 'Android',
        ios: 'iOS',
        design: 'Дизайн',
        management: 'Менеджмент',
        qa: 'QA',
        back_office: 'Бэк-офис',
        frontend: 'Frontend',
        hr: 'HR',
        pr: 'PR',
        backend: 'Backend',
        support: 'Техподдержка',
        analytics: 'Аналитика',
    };

    const [fetchUsers, isLoading, isError] = useFetching(async () => {
        const response = await UsersService.getAll();
        setTotalUsers(response.items);
    });

    useEffect(() => {
        (users === false) ? fetchUsers() : setlAllUsers(totalUsers);
    }, []);

    return (
        <div className="container">
            <Navigation>
            </Navigation>
            { isLoading ? <LoadingList /> : <UserList users={totalUsers} userDep={userDep}/>}
        </div>
    );
};

export default MainPage;