import React, {useState, useEffect} from "react";
import { useContext, useMemo } from "react";
import { getAllUsers } from "../context";
import { useFetching } from "../hooks/useFetching";
import departments from "../data/departments";
import departmentsType from "../data/departmentsType";
import UsersService from "../API/UsersService";
import Navigation from "../components/Navigation";
import UserList from "../components/UsersList";
import LoadingList from "../components/LoadingList";
import Modal from "../components/UI/Modal/Modal";

const MainPage = () => {

    const [totalUsers, setTotalUsers] = useState([]);
    const {users, setlAllUsers} = useContext(getAllUsers);
    const [modal, setModal] = useState(false);
    const [birthdayInYear, setBirthday] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState(localStorage.getItem('filter') ? localStorage.getItem('filter') : 'all');
    const [selectedSort, setSelectedSort] = useState(localStorage.getItem('sort') ? localStorage.getItem('sort') : 'firstName');
    const [searchQuery, setSearchQuery] = useState(localStorage.getItem('query') ? localStorage.getItem('query') : '');
    const [checkNetwork, setCheckNetwork] = useState(window.navigator.onLine);
    const [networkLoading, setNetworkLoading] = useState(false);

    const [fetchUsers, isLoading, isError] = useFetching(async () => {
        const response = await UsersService.getAll();
        setTotalUsers(response.items);
    });

    const updateNetwork = () => {
        setCheckNetwork(window.navigator.onLine);
        if (window.navigator.onLine) {
            setNetworkLoading(true);
            setTimeout(() => {
                setNetworkLoading(false);
                fetchUsers();
            }, 3000);
        };
    };

    useEffect(() => {
        window.addEventListener("offline", updateNetwork);
        window.addEventListener("online", updateNetwork);
        return () => {
            window.removeEventListener("offline", updateNetwork);
            window.removeEventListener("online", updateNetwork);
        };
    });

    useEffect(() => {
        (users === false) ? fetchUsers() : setTotalUsers(users);
    }, []);

    const filteredUsers = useMemo(() => {
        if (selectedFilter === 'all') return totalUsers;
        return [...totalUsers].filter(prop => prop.department === selectedFilter);
    }, [selectedFilter, totalUsers]);

    const sortedAndSearchedUsers= useMemo(() => {
        return filteredUsers.filter(user =>  {
            let firstName = user.firstName.toLowerCase().includes(searchQuery.toLowerCase());
            let lastName = user.lastName.toLowerCase().includes(searchQuery.toLowerCase());
            let userTag = user.userTag.toLowerCase().includes(searchQuery.toLowerCase());
            return (firstName) ? firstName : (lastName) ? lastName : userTag;
        });
    }, [searchQuery, filteredUsers]);

    const sortedUsers = useMemo(() => {
        setModal(false);

        function getDate(a,b) {
            let dateA = new Date(a['birthday']);
            let dateB = new Date(b['birthday']); 
            a = new Date(2022, dateA.getMonth(), dateA.getDate());
            b = new Date(2022, dateB.getMonth(), dateB.getDate());
            return {
                a,
                b,
            };
        };

        if (selectedSort === 'firstName') {
            return [...sortedAndSearchedUsers].sort((a,b) => a[selectedSort].localeCompare(b[selectedSort]));
        } else if (selectedSort === 'birthday') {
            let inThis = [];
            let inNext = [];
            sortedAndSearchedUsers.map(item => {
                let date = new Date(item['birthday'])
                date = new Date(2022, date.getMonth(), date.getDate());
                if (Math.sign(date[Symbol.toPrimitive]('number') - Date.now()) === 1) inThis.push(item);
                if (Math.sign(date[Symbol.toPrimitive]('number') - Date.now()) === -1) inNext.push(item);
            });
            inThis.sort((a,b) => {
                let dates = getDate(a,b);
                a = dates.a;
                b = dates.b;
                return a[Symbol.toPrimitive]('number') - b[Symbol.toPrimitive]('number');
            });
            inNext.sort((a,b) => {
                let dates = getDate(a,b);
                a = dates.a;
                b = dates.b;
                return a[Symbol.toPrimitive]('number') - b[Symbol.toPrimitive]('number');
            });
            setBirthday(inThis.length);
            return [...inThis, ...inNext];
        };
        
    }, [selectedSort, sortedAndSearchedUsers]);

    return (
        <div className="containerApp">
            <Navigation 
                setModal={setModal}
                departments={departmentsType}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                checkNetwork={checkNetwork}
                networkLoading={networkLoading}
            ></Navigation>
            <Modal
                visible={modal}
                setVisible={setModal}
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
            ></Modal>
            <div className="container">
                { isLoading 
                    ? <LoadingList/>
                    : <UserList 
                        isError={isError}
                        fetchUsers={fetchUsers}
                        users={sortedUsers}
                        selectedSort={selectedSort}
                        userDep={departments}
                        birthdayInYear={birthdayInYear}
                    />
                }
            </div>
        </div>
    );
};

export default MainPage;