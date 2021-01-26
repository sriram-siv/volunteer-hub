import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './styles/main.scss'
import App from './App'

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'))