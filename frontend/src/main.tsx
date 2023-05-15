import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { UserProvider } from './context/user';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <UserProvider>
    <App />
  </UserProvider>
)