import React, { useState, useEffect } from 'react';
import UserRow from './UserRow';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();
        setUsers(data.results);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (index: number) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Pais</th>
          <th>Correo</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <UserRow key={index} user={user} onDelete={handleDelete} index={index} />
        ))}
      </tbody>
    </table>
  );
};

export default UserList;