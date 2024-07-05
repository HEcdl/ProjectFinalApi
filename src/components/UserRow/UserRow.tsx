import React from 'react';
import User from '../User';
import style from "./UserRow.module.css";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

interface Props {
  user: User;
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  index: number;
  isCompactView: boolean;
}


const UserRow: React.FC<Props> = ({ user, onDelete, onEdit, index, isCompactView}) => {

  return (
    <tr className={style.datos}>
      <td>
        {user.name.first} {user.name.last}
      </td>
       {!isCompactView && (
        <>
      <td>{user.location.country}</td>
       
      <td>{user.email}</td>
      </>
       )}
     <td>
        <img src={user.picture.large} width="75" height="75" />
      </td>
       {!isCompactView && (
      <>
      <td>
        <button className={style.boteliminar} onClick={() => onDelete(index)}><DeleteForeverTwoToneIcon/></button>
        
      </td>
      <td>
        <button className={style.boteditar} onClick={() => onEdit(index)}><EditTwoToneIcon/></button>
      </td>
      </>
       )}

    </tr>
  );
};

export default UserRow;