import ReactDom from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { QueryProvider } from './lib/react-query/QueryProvider';

import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/shared/ErrorBoundary/ErrorBoundary';

import './globals.css';


ReactDom.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ErrorBoundary>
            <QueryProvider>
                <AuthProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </AuthProvider>
            </QueryProvider>
        </ErrorBoundary>
    </BrowserRouter>
)