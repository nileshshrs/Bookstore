import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import "../css/todolist.scss"

const TodoList = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  const saveTodosToLocalStorage = (updatedTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      const newTodo = { id: todos.length + 1, text: value };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setValue("");
      saveTodosToLocalStorage(updatedTodos);
    }
  };

  const handleRemoveTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const handleEditTodo = (id, newText) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  return (
    <div className='todolist card'>
      <h2>Task To Dos <span>({todos.length})</span></h2>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          className='todo-input'
          placeholder='Tasks to do ...!'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type='submit' className='todo-btn'>Add Task</button>
      </form>

      {todos.length === 0 ? (
        <p>Nothing to do. Add tasks to get started!</p>
      ) : (
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id}>
              {editingTodo === todo.id ? (
                <>
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => handleEditTodo(todo.id, e.target.value)}
                  />
                  <button onClick={() => setEditingTodo(null)} className='done'>Done</button>
                </>
              ) : (
                <>
                  {todo.text}
                  <button onClick={() => setEditingTodo(todo.id)} className='edit'><FaEdit /></button>
                  <button onClick={() => handleRemoveTodo(todo.id)} className='delete'><MdDeleteForever /></button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
