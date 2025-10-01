import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './pages/authentication/Login';
import Home from './pages/Home';
import Register from './pages/authentication/Register';
import Profile from './pages/Profile';
import Game from './pages/Game';
import { ToastProvider } from './hooks/ToastContext';
import Authentication from './services/Authentication';
import React from 'react';
import './styles.scss';

const theme = createTheme({
    palette: {
        primary: {
            main: '#28d219ff',
        }
    }
});

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);
    const [currentRoute, setCurrentRoute] = React.useState(window.location.pathname);

    const checkAuth = async () => {
        const auth = await Authentication.isAuthenticated();
        setIsAuthenticated(auth);
    }

    React.useEffect(() => {
        checkAuth();
        setCurrentRoute(window.location.pathname)
    }, []);

    const getPrivateRoute = () => {
        switch (currentRoute) {
            case '/':
            return <Home />;
            case '/profile':
            return <Profile />;
            case '/login':
            return window.location.href = '/';
            case '/register':
            return window.location.href = '/login';
            default:
                if (currentRoute.startsWith('/game')) {
                    return <Game currentRoute={currentRoute} />;
                }
                return window.location.href = '/';
        }
    }
    const getPublicRoute = () => {
        switch (currentRoute) {
            case '/login':
                return <Login />;
            case '/register':
                return <Register />;
            default:
                return window.location.href = '/login';
        }
    }

    return <ThemeProvider theme={theme}>
                <ToastProvider>
                    <div className="appBody">
                        {
                            isAuthenticated === null ? <h1>Carregando...</h1> : (
                                isAuthenticated ? getPrivateRoute() : getPublicRoute()
                            )
                        }
                    </div>
                </ToastProvider>
            </ThemeProvider>;
}

export default App;