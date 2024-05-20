import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from "./store/store.js"
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { ModalProvider } from 'styled-react-modal'


import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>,
)
