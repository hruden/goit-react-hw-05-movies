import { createContext, useContext, useState } from 'react';

export const Context = createContext();
export function GlobalContext({ children }) {
  const [status, setStatus] = useState('idel');
  const [searchResult, setSearchResult] = useState([]);

  return (
    <Context.Provider
      value={{ status, setStatus, searchResult, setSearchResult }}
    >
      {children}
    </Context.Provider>
  );
}
export const useStateContext = () => useContext(Context);
