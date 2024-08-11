import React from 'react';

const TodoSearch =({ searchTerm, setSearchTerm })=> {
  return (
    <input 
      type="text" 
      className="form-control" 
      placeholder="Search note..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default TodoSearch;
