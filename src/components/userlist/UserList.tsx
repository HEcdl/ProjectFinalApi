// File Path: src\components\userlist\UserList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import UserRow from '../UserRow/UserRow';
import EditUserForm from '../EditForm/EditUserForm';
import User from '../User';
import style from "./UserList.module.css";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

Modal.setAppElement('#root'); // Set the root element for accessibility

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [indexToDelete, setIndexToDelete] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompactView, setIsCompactView] = useState(true); // Estado para controlar la vista de la tabla
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Estado para controlar el modal de confirmación
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // Estado para controlar el modal de filtros
  const [filterName, setFilterName] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [filterEmail, setFilterEmail] = useState('');

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
    const userToEdit = filteredUsers[index];
    const actualIndex = users.findIndex(user => user.email === userToEdit.email);
    setEditingIndex(actualIndex);
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

  const openConfirmModal = (index: number) => {
    setIndexToDelete(index);
    setIsConfirmModalOpen(true);
  };

  const handleDelete = () => {
    if (indexToDelete !== null) {
      const newUsers = users.filter((_, i) => i !== indexToDelete);
      setUsers(newUsers);
      setFilteredUsers(newUsers);
      localStorage.setItem('users', JSON.stringify(newUsers)); // Update local storage
      setIndexToDelete(null);
      setIsConfirmModalOpen(false);
    }
  };
const handleFilter = () => {
    const filteredUsers = users.filter((user) => {
      const name = `${user.name.first} ${user.name.last}`;
      const country = user.location.country;
      const email = user.email;
      return (
        name.toLowerCase().includes(filterName.toLowerCase()) &&
        country.toLowerCase().includes(filterCountry.toLowerCase()) &&
        email.toLowerCase().includes(filterEmail.toLowerCase())
      );
    });
    setFilteredUsers(filteredUsers);
    setIsFilterModalOpen(false); // Cerrar el modal después de aplicar los filtros
  };
  const toggleView = () => {
    setIsCompactView(!isCompactView);
  };

  return (
    <>
      <div className={style.contbuscar}>
        <SearchTwoToneIcon className={style.iconbuscar}/>
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
      <label>
        <input
          type="checkbox"
          checked={!isCompactView}
          onChange={toggleView}
        />
        {isCompactView ? 'Show Expanded View' : 'Show Compact View'}
      </label>
      <button onClick={() => setIsFilterModalOpen(true)}>Open Filter Modal</button>
      <Modal
        isOpen={isFilterModalOpen}
        onRequestClose={() => setIsFilterModalOpen(false)}
        contentLabel="Filter Users"
      >
        <h2>Filter Users</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleFilter(); }}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
            />
          </div>
          <button type="submit">Apply Filters</button>
          <button type="button" onClick={() => setIsFilterModalOpen(false)}>Close</button>
        </form>
      </Modal>


      <table className={style.table}>
        <thead>
          <tr className={style.encabezado}>
            <th>Nombre</th>
            {isCompactView ? null : (
              <>
                <th>Pais</th>
                <th>Correo</th>
              </>
            )}
            <th>Perfil</th>
            {isCompactView ? null : (
              <>
                <th>Eliminar</th>
                <th>Editar</th>
              </>
            )}
          </tr>
        </thead>
        <tbody className={style.info}>
          {filteredUsers.map((user, index) => (
            <UserRow
              key={index}
              user={user}
              onDelete={() => openConfirmModal(index)}
              onEdit={() => handleEdit(index)}
              index={index}
              isCompactView={isCompactView}
            />
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
      {isConfirmModalOpen && (
        <Modal
          isOpen={isConfirmModalOpen}
          onRequestClose={() => setIsConfirmModalOpen(false)}
          contentLabel="Confirm Delete"
          className={style.ventanamodal}
        >
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this user?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setIsConfirmModalOpen(false)}>No</button>
        </Modal>
      )}
    </>
  );
};

export default UserList;