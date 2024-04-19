import ReactDom from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { QueryProvider } from './lib/react-query/QueryProvider';

import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import WrappedErrorBoundary from './components/shared/ErrorBoundary/ErrorBoundary';

import './globals.css';


ReactDom.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <WrappedErrorBoundary>
            <QueryProvider>
                <AuthProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </AuthProvider>
            </QueryProvider>
        </WrappedErrorBoundary>
    </BrowserRouter>
)