import React from 'react';

const SearchTab = ({ search, error, change, click, submit }) => {
  return (
    <form className="search" onSubmit={submit}>
      <h3>Jakiego miasta szukasz ?</h3>
      <input type="text" placeholder="Podaj miasto..." value={search} onChange={change} />
      <button className="confirm" onClick={click}>Szukaj</button>
      {error && <p className="errorMsg">Wyszukiwanie nie powiodło się. Spróbuj jeszcze raz.</p>}
    </form>
  );
}

export default SearchTab;