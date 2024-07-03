import React from 'react';
import User from '../User';
import style from "./UserRow.module.css";


interface Props {
  user: User;
  onDelete: (index: number) => void;
  index: number;
}

const UserRow: React.FC<Props> = ({ user, onDelete, index }) => {
  return (
    <tr className={style.datos}>
      <td>
        {user.name.first} {user.name.last}
      </td>
      <td>{user.location.country}</td>
       
      <td>{user.email}</td>
     <td>
        <img src={user.picture.large} width="75" height="75" />
      </td>
      <td>
        <button className={style.boteliminar} onClick={() => onDelete(index)}>Eliminar</button>
      </td>
    </tr>
  );
};

export default UserRow;