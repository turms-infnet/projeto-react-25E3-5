import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box, LinearProgress } from '@mui/material';
import { ToastProvider } from './context/ToastContext';
import { DialogProvider } from './context/DialogContext';
import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.scss';
import Appbar from './components/customs/Appbar';
import theme from './theme';
import { useAuth } from './context/AuthContext';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./pages/Home'));
const ProfilePage = lazy(() => import('./pages/Profile'));
const GamePage = lazy(() => import('./pages/Game'));
const RegisterPage = lazy(() => import('./pages/authentication/Register'));
const LoginPage = lazy(() => import('./pages/authentication/Login'));

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
                                    <Suspense fallback={<LinearProgress />}>
                                        <Routes>
                                            <Route path="/" element={
                                                <PrivateRoute isAuthenticated={isAuthenticated}>
                                                    <HomePage />
                                                </PrivateRoute>
                                            }/>
                                            <Route path="/game/:id" element={
                                                <PrivateRoute isAuthenticated={isAuthenticated}>
                                                    <GamePage />
                                                </PrivateRoute>
                                            }/>
                                            <Route path="/profile" element={
                                                <PrivateRoute isAuthenticated={isAuthenticated}>
                                                    <ProfilePage />
                                                </PrivateRoute>
                                            }/>
                                            <Route path="/login" element={
                                                <PublicRoute isAuthenticated={isAuthenticated}>
                                                    <LoginPage />
                                                </PublicRoute>
                                            }/>
                                            <Route path="/register" element={
                                                <PublicRoute isAuthenticated={isAuthenticated}>
                                                    <RegisterPage />
                                                </PublicRoute>
                                            }/>
                                        </Routes>
                                    </Suspense>
                                </Box>
                            </Container>
                        </BrowserRouter>
                    </ToastProvider>
                </DialogProvider>
            </ThemeProvider>;
}

export default App;