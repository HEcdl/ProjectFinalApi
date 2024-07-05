import React, { useState } from 'react';
import User from "../User";

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
          type="text"
          value={name.first}
          onChange={(e) => setName({...name, first: e.target.value })}
        />
        <input
          type="text"
          value={name.last}
          onChange={(e) => setName({...name, last: e.target.value })}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Country:
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default EditUserForm;