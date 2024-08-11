import React from 'react';

const TodoItem=({ todo, toggleTodo, deleteTodo }) =>{
  return (
    <div className="todo-item d-flex align-items-center justify-content-between mb-2">
      <div>
        <input 
          type="checkbox" 
          checked={todo.completed} 
          onChange={() => toggleTodo(todo.id)} 
        />
        <span className={todo.completed ? 'completed' : ''} style={{ marginLeft: '10px' }}>
          {todo.text}
        </span>
      </div>
      <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
}

export default TodoItem;
