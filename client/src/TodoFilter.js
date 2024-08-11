import React from 'react';

const TodoFilter=({ filter, setFilter })=> {
  return (
    <select 
      className="form-select mt-2" 
      value={filter} 
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="ALL">ALL</option>
      <option value="COMPLETED">Completed</option>
      <option value="INCOMPLETE">Incomplete</option>
    </select>
  );
}

export default TodoFilter;
