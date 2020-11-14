import React from 'react';

const SearchTab = ({ search, change, click, submit }) => {
  return (
    <form className="search" onSubmit={submit}>
      <input type="text" placeholder='Podaj miasto...' value={search} onChange={change} />
      <button onClick={click}><i className="fas fa-search"></i></button>
    </form>
  );
}

export default SearchTab;