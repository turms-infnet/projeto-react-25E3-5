import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box, DialogContent } from '@mui/material';
import Login from './pages/authentication/Login';
import Home from './pages/Home';
import Register from './pages/authentication/Register';
import Profile from './pages/Profile';
import Game from './pages/Game';
import { ToastProvider } from './context/ToastContext';
import { DialogProvider } from './context/DialogContext';
import { Navigate, BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './styles.scss';
import Appbar from './components/customs/Appbar';
import theme from './theme';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({children, isAuthenticated}) => {
    return isAuthenticated ? children : <Navigate to="/login"/>;
}

const PublicRoute = ({children, isAuthenticated}) => {
    return !isAuthenticated ? children : <Navigate to="/"/>;
}

const App = () => {
    const { isAuthenticated, logout } = useAuth();

    return <ThemeProvider theme={theme}>
                <CssBaseline />
                <DialogProvider>
                    <ToastProvider>
                        <BrowserRouter>
                            {isAuthenticated && <Appbar />}
                            <Container maxWidth="lg">
                                <Box className="appBody" sx={{ py: 4 }}>
                                    <Routes>
                                        <Route path="/" element={
                                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                                <Home />
                                            </PrivateRoute>
                                        }/>
                                        <Route path="/game/:id" element={
                                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                                <Game />
                                            </PrivateRoute>
                                        }/>
                                        <Route path="/profile" element={
                                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                                <Profile />
                                            </PrivateRoute>
                                        }/>
                                        <Route path="/login" element={
                                            <PublicRoute isAuthenticated={isAuthenticated}>
                                                <Login />
                                            </PublicRoute>
                                        }/>
                                        <Route path="/register" element={
                                            <PublicRoute isAuthenticated={isAuthenticated}>
                                                <Register />
                                            </PublicRoute>
                                        }/>
                                    </Routes>
                                </Box>
                            </Container>
                        </BrowserRouter>
                    </ToastProvider>
                </DialogProvider>
            </ThemeProvider>;
}

export default App;