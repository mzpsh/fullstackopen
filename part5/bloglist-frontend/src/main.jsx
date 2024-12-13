import ReactDOM from 'react-dom/client'
import App from './App'

if (import.meta.hot) {
  import.meta.hot.on(
    "vite:beforeUpdate",
    /* eslint-disable-next-line no-console */
    () => console.clear()
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)