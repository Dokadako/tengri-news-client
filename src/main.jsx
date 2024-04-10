import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export const BACKEND_API = "https://tengri-news-server-fb457f2a9e75.herokuapp.com/api"

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
            <App/>
    </React.StrictMode>,
)
