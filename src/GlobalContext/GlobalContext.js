import { createContext, useContext, useState } from 'react';

export const Context = createContext();
export function GlobalContext({ children }) {
  const[erorrMessedge, setErorrMessedge] = useState('')
  const [searchResult, setSearchResult] = useState([]);


  return (
    <Context.Provider
      value={{ searchResult, setSearchResult, erorrMessedge, setErorrMessedge, }}
    >
      {children}
    </Context.Provider>
  );
}
export const useStateContext = () => useContext(Context);
