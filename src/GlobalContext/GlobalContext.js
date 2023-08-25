import { createContext, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const Context = createContext();
export function GlobalContext({ children }) {
  const[erorrMessedge, setErorrMessedge] = useState('')
  const [searchResult, setSearchResult] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams()


  return (
    <Context.Provider
      value={{ searchResult, setSearchResult, erorrMessedge, setErorrMessedge, searchParams, setSearchParams, }}
    >
      {children}
    </Context.Provider>
  );
}
export const useStateContext = () => useContext(Context);
