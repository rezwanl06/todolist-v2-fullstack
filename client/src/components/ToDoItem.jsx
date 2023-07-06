import React from 'react';
import axios from 'axios';

const ToDoItem = ({ item, onToggle }) => {
  const handleToggle = async () => {
    try {
      await axios.delete(`http://localhost:5000/delete/${item.id}/`);
      onToggle(); // Notify the parent component of the toggle event
      console.log('Item toggled:', item.id);
    } catch (error) {
      console.error('Error toggling item:', error);
    }
  };

  return (
    <div className="item">
      <input type="checkbox" checked={item.completed} onChange={handleToggle} />
      <p>{item.entry}</p>
    </div>
  );
};

export default ToDoItem;
