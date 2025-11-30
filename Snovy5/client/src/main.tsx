import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SearchProvider } from './context/SearchContext.tsx';

createRoot(document.getElementById("root")!).render(
    <SearchProvider>
        <App />
    </SearchProvider>
);
