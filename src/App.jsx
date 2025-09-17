import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './pages/authentication/Login';
import Home from './pages/Home';
import Authentication from './services/Authentication';
import React from 'react';

const theme = createTheme({
    palette: {
        primary: {
            main: '#28d219ff',
        }
    }
});

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);

    const checkAuth = async () => {
        const auth = await Authentication.isAuthenticated();
        setIsAuthenticated(auth);
    }

    React.useEffect(() => {
        checkAuth();
    }, []);

    return <ThemeProvider theme={theme}>
        {
            isAuthenticated === null ? <h1>Carregando...</h1> : (
                isAuthenticated ? <Home /> : <Login />
            )
        }
    </ThemeProvider>;
}

export default App;