import React, { useState, useEffect } from 'react';
import UserRow from './UserRow';
import User from './User';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=25');
        const data = await response.json();
        setUsers(data.results);
        setFilteredUsers(data.results); // Initialize filtered users with the fetched users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (index: number) => {
    setUsers(users.filter((_, i) => i !== index));
    setFilteredUsers(filteredUsers.filter((_, i) => i !== index));
  };

  const handleSearch = (searchTerm: string) => {
    const filteredUsers = users.filter((user) => {
      const name = `${user.name.first} ${user.name.last}`;
      const country = user.location.country;
      const email = user.email;
      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredUsers(filteredUsers);
  };

  return (
    <>
      <div>
        <h3>Buscar</h3>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name, country, or email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Pais</th>
            <th>Correo</th>
            <th>Perfil</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <UserRow key={index} user={user} onDelete={handleDelete} index={index} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;