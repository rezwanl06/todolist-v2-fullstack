import React, { useState } from 'react';

const ToDoForm = ({ onNewItemChange }) => {
  const [newItem, setNewItem] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call the callback function passed from the parent component
    onNewItemChange(newItem);

    // Reset the newItem state to an empty string
    setNewItem('');
  };

  return (
    <form className="item" onSubmit={handleSubmit}>
      <input
        type="text"
        name="newItem"
        placeholder="Add new item"
        autoComplete="off"
        value={newItem}
        onChange={(event) => setNewItem(event.target.value)}
      />
      <button type="submit" name="button">+</button>
    </form>
  );
};

export default ToDoForm;
