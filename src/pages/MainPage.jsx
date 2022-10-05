import React, {useState, useEffect} from "react";
import { useContext } from "react";
import { getAllUsers } from "../context";
import { useFetching } from "../hooks/useFetching";
import UsersService from "../API/UsersService";
import Navigation from "../components/Navigation";
import UserList from "../components/UsersList";
import LoadingList from "../components/LoadingList";
import Modal from "../components/UI/Modal/Modal";

const MainPage = () => {

    const [totalUsers, setTotalUsers] = useState([]);
    const {users, setlAllUsers} = useContext(getAllUsers);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedSort, setSelectedSort] = useState('firstName');
    const [modal, setModal] = useState(false);

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

    const departments = [
        {title: 'Все', value: 'all', id: 1},
        {title: 'Designers', value: 'design', id: 2},
        {title: 'Analysts', value: 'analytics', id: 3},
        {title: 'Managers', value: 'management', id: 4},
        {title: 'IOS', value: 'ios', id: 5},
        {title: 'Android', value: 'android', id: 6},
    ];

    const [fetchUsers, isLoading, isError] = useFetching(async () => {
        const response = await UsersService.getAll();
        setTotalUsers(response.items);
    });

    useEffect(() => {
        (users === false) ? fetchUsers() : setlAllUsers(totalUsers);
    }, []);

    return (
        <div className="container">
            <Navigation 
                setModal={setModal}
                departments={departments}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
            ></Navigation>
            <Modal
                setVisible={setModal}
                visible={modal}
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
            ></Modal>
            { isLoading ? <LoadingList /> : <UserList users={totalUsers} userDep={userDep}/>}
        </div>
    );
};

export default MainPage;