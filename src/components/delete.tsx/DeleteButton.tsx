import React, { useState, useCallback } from 'react';

interface Props {
  onDelete: () => void;
}

const DeleteButton: React.FC<Props> = ({ onDelete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = useCallback(() => {
    if (showConfirmation) {
      onDelete();
    } else {
      setShowConfirmation(true);
    }
  }, [onDelete, showConfirmation]);

  return (
    <div>
      <button onClick={handleDelete}>
        {showConfirmation? '¿Seguro que deseas eliminar?' : 'Eliminar'}
      </button>
      {showConfirmation && (
        <div>
          <p>Esta acción es irreversible. ¿Estás seguro?</p>
          <button onClick={() => setShowConfirmation(false)}>Cancelar</button>
          <button onClick={onDelete}>Eliminar</button>
        </div>
      )}
    </div>
  );
};

export default DeleteButton;