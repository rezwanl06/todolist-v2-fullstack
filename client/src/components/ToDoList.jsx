import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ToDoItem from './ToDoItem';
import ToDoForm from './ToDoForm';

const ToDoList = () => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetchTodoEntries();
  }, []);

  const fetchTodoEntries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/');
      setTodoList(response.data);
    } catch (error) {
      console.error('Error fetching todo entries:', error);
    }
  };

  const handleToggle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      fetchTodoEntries();
      console.log('Item toggled:', id);
    } catch (error) {
      console.error('Error toggling item:', error);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      await axios.post('http://localhost:5000/', { entry: newItem });
      console.log('New item added:', newItem);
      fetchTodoEntries(); // Fetch the updated todo entries after adding a new item
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div>
      <h1 id='heading'>ToDo List</h1>
      <div className="box">
        {todoList.map((item) => (
          <ToDoItem
            key={item.id}
            item={item}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
      </div>
      <ToDoForm onNewItemChange={handleAddItem} />
    </div>
  );
};

export default ToDoList;
