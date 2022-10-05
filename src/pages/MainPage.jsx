import React, {useState, useEffect} from "react";
import { useContext, useMemo } from "react";
import { getAllUsers } from "../context";
import { useFetching } from "../hooks/useFetching";
import UsersService from "../API/UsersService";
import Navigation from "../components/Navigation";
import UserList from "../components/UsersList";
import LoadingList from "../components/LoadingList";
import Modal from "../components/UI/Modal/Modal";
import ErrorMessage from "../components/UI/ErrorMessage/ErrorMessage";

const MainPage = () => {

    const [totalUsers, setTotalUsers] = useState([]);
    const {users, setlAllUsers} = useContext(getAllUsers);
    const [modal, setModal] = useState(false);
    const [birthdayInYear, setBirthday] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedSort, setSelectedSort] = useState('firstName');
    const [searchQuery, setSearchQuery] = useState('');

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
        setModal(false);
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
            })
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
        }
    }, [selectedSort, sortedAndSearchedUsers]);

    return (
        <div className="container">
            <Navigation 
                setModal={setModal}
                departments={departments}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            ></Navigation>
            <Modal
                visible={modal}
                setVisible={setModal}
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
            ></Modal>
            { isLoading 
                ? <LoadingList/>
                : <UserList 
                    isError={isError}
                    fetchUsers={fetchUsers}
                    users={sortedUsers}
                    selectedSort={selectedSort}
                    userDep={userDep}
                    birthdayInYear={birthdayInYear}
                />
            }
        </div>
    );
};

export default MainPage;