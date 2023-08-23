import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalContext } from 'GlobalContext/GlobalContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/goit-react-hw-05-movies">
    <GlobalContext>
      <App />
    </GlobalContext>
  </BrowserRouter>
);
