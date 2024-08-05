import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './App'
import SellPage from './SellPageApp'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('root2')).render(
  <React.StrictMode>
    <SellPage />
  </React.StrictMode>
)
