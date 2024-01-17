import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
// for context api data share between components
import { UserContext } from './components/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
// for context
const checkCustomer=localStorage.getItem('customer_login');
root.render(
  // <React.StrictMode>
    <Router>
      <UserContext.Provider value={checkCustomer}>
      <App />
      </UserContext.Provider>
    </Router>
  // </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
