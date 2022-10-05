import './styles/style.css';
import AppRouter from "./components/AppRouter";
import { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import { getAllUsers } from './context';
import { useFetching } from './hooks/useFetching';
import UsersService from "./API/UsersService";

function App() {

  const [users, setUsers] = useState(false);

  const [fetchUsers] = useFetching(async () => {
    const response = await UsersService.getAll();
    setUsers(response.items);
  });

  useEffect(() => {
    fetchUsers();
  },[]);

  return (
    <div className='app-wrapper'>
      <div className='app'>
        <getAllUsers.Provider value={{users, setUsers}}>
            <BrowserRouter>
              <AppRouter/>
            </BrowserRouter>
          </getAllUsers.Provider>
      </div>
    </div>
  );
}

export default App;
