import React, { useState } from 'react';
import User from "../User";
import style from "./EditUserForm.module.css";
interface EditUserFormProps {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onSave, onCancel }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [country, setCountry] = useState(user.location.country);

  const handleSave = () => {
    const updatedUser = {...user, name, email, location: { country } };
    onSave(updatedUser);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <form>
      <label>
        Name:
        <input
        className={style.inputs}
          type="text"
          value={name.first}
          onChange={(e) => setName({...name, first: e.target.value })}
        />
        <input
         className={style.inputs}
          type="text"
          value={name.last}
          onChange={(e) => setName({...name, last: e.target.value })}
        />
      </label>
      <br />
      <label>
        Email:
        <input
        className={style.inputs}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Country:
        <input
        className={style.inputs}
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </label>
      <br />
    
        <button className={style.botonsave} onClick={handleSave}>Save</button>
      <button className={style.botoncancel} onClick={handleCancel}>Cancel</button>
      
    </form>
  );
};

export default EditUserForm;