import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

if (import.meta.hot) {
  import.meta.hot.on(
    'vite:beforeUpdate',
    () => console.clear()
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)