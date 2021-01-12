import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import { BrowserRouter as Router } from
  'react-router-dom'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RoomProvider } from './context';
import {UserProvider} from './contextU'


ReactDOM.render(
  <UserProvider>
  <RoomProvider>
    <Router>
      <App />
    </Router>
  </RoomProvider>
  </UserProvider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();