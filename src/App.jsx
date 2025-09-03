import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';

const theme = createTheme({
    palette: {
        primary: {
            main: '#28d219ff',
        }
    }
});

const App = () => {
    return <ThemeProvider theme={theme}>
        <Register />
    </ThemeProvider>;
}

export default App;