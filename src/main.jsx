import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import iniciaAnalytics from './plugins/iniciaAnalytics.js'

iniciaAnalytics()

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
