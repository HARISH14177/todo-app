import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import TodoSearch from './TodoSearch';
import TodoFilter from './TodoFilter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import { Modal, Button, Form } from 'react-bootstrap';


const App=()=> {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Read recommended book again', completed: true },
    { id: 2, text: 'Vacation planning', completed: false },
    { id: 3, text: 'Cook dinner', completed: false },
    { id: 4, text: 'Sign up for training', completed: false },
  ]);
const API_URL = 'https://mern-stack-backend-qbnc.onrender.com/todos';

useEffect(() => {
    const fetchTodos = async () => {
        try {
            const response = await fetch('https://mern-stack-backend-qbnc.onrender.com/todos');
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    fetchTodos();
}, []);

  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
      setShowModal(false);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL') return true;
    if (filter === 'COMPLETED') return todo.completed;
    if (filter === 'INCOMPLETE') return !todo.completed;
    return true;
  }).filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">TODO LIST</h1>
      <div className="mb-4">
        <TodoSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TodoFilter filter={filter} setFilter={setFilter} />
      </div>
      <TodoList todos={filteredTodos} toggleTodo={handleToggleTodo} deleteTodo={handleDeleteTodo} />

      {/* Floating Add Button */}
      <button className="add-button btn btn-primary" onClick={() => setShowModal(true)}>
        +
      </button>

      {/* Modal for Adding New Todo */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control 
            type="text" 
            placeholder="Enter new todo" 
            value={newTodo} 
            onChange={(e) => setNewTodo(e.target.value)} 
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddTodo}>
            Add Todo
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
