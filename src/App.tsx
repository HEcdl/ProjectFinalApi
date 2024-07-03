import React from 'react';
import "./App.css";
import UserList from './components/userlist/UserList';

const App: React.FC = () => {
  return (
    <div>
      <h1>Usuarios</h1>
      <UserList />
    </div>
  );
};

export default App;
