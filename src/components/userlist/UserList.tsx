import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import UserRow from '../UserRow/UserRow';
import EditUserForm from '../EditForm/EditUserForm';
import User from '../User';
import style from "./UserList.module.css";

Modal.setAppElement('#root'); // Set the root element for accessibility

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [indexToDelete, setIndexToDelete] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=12');
        const data = response.data;
        setUsers(data.results);
        setFilteredUsers(data.results); // Initialize filtered users with the fetched users
        localStorage.setItem('users', JSON.stringify(data.results)); // Save users to local storage
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
      setFilteredUsers(JSON.parse(storedUsers));
    }
  }, []);

  const handleDelete = (index: number) => {
    setIndexToDelete(index);
    const confirmDelete = window.confirm(`¿Estás seguro de eliminar al usuario ${filteredUsers[index].name.first} ${filteredUsers[index].name.last}?`);
    if (confirmDelete) {
      const newUsers = users.filter((_, i) => i !== index);
      setUsers(newUsers);
      setFilteredUsers(newUsers);
      localStorage.setItem('users', JSON.stringify(newUsers)); // Update local storage
    }
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

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleSave = (user: User) => {
    const newUsers = users.map((u, i) => (i === editingIndex ? user : u));
    setUsers(newUsers);
    setFilteredUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers)); // Update local storage
    setEditingIndex(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div >
        <h3>Buscar</h3>
        <div className="search-bar">
          <input
          className={style.buscador}
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
      <table className={style.table}>
        <thead>
          <tr className={style.encabezado}>
            <th>Nombre</th>
            <th>Pais</th>
            <th>Correo</th>
            <th>Perfil</th>
            <th>Eliminar</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody className={style.info}>
          {filteredUsers.map((user, index) => (
            <UserRow key={index}
             user={user}
              onDelete={() => handleDelete(index)} 
              onEdit={()=> handleEdit(index)}
               index={index} />
          ))}
        </tbody>
      </table>
      {editingIndex !== null && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCancel}
          contentLabel="Edit User"
          className={style.ventanamodal}
        >
          <EditUserForm
            user={users[editingIndex]}
            onSave={(user) => handleSave(user)}
            onCancel={handleCancel}
          />
        </Modal>
      )}
    </>
  );
};

export default UserList;