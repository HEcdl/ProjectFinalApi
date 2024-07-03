import React from 'react';
import User from './User';

interface Props {
  user: User;
  onDelete: (index: number) => void;
  index: number;
}

const UserRow: React.FC<Props> = ({ user, onDelete, index }) => {
  return (
    <tr>
      <td>
        {user.name.first} {user.name.last}
      </td>
      <td>{user.location.country}</td>
       
      <td>{user.email}</td>
     <td>
        <img src={user.picture.large} width="50" height="50" />
      </td>
      <td>
        <button onClick={() => onDelete(index)}>Eliminar</button>
      </td>
    </tr>
  );
};

export default UserRow;