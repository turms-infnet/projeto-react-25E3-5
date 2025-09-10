import React from "react";
import { Grid, Stack, Avatar, TextField, Button, Snackbar } from "../../components";
import logo from '../../assets/images/logo-black.png';
import { Typography } from "@mui/material";
import Authentication from "../../services/Authentication";
import Storage from "../../services/Storage";
import { modeloData } from "./modelo";

import styles from './styles';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(modeloData);
    const [message, setMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);

const handleLogin = async () => {
        setLoading(true);
        setError(modeloData);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError((prev) => ({
                ...prev,
                email: { message: 'E-mail inválido', show: true }
            }));
            return;
        }
        if (email === '') {
            setError((prev) => ({
                ...prev,
                email: { message: 'E-mail é obrigatório', show: true }
            }));
            return;
        }
        if (password === '') {
            setError((prev) => ({
                ...prev,
                password: { message: 'Senha é obrigatória', show: true }
            }));
            return;
        }
        try {
            const {data, error } = await Authentication.login(email, password);
            if (error) {
                throw error;
            }
            setMessage('Login realizado com sucesso!');
            Storage.setItem('user', data);
        } catch (error) {
            if (error.message === "Invalid login credentials") {
                setMessage('E-mail ou senha inválidos');
            } else {
                setMessage('Falha no login: ' + error.message);
            }
            console.error("Falha no login", error);
        }
        setLoading(false);
    };

    return <Grid container spacing={2}>
        <Grid item size={{xs: 12, sm: 12, md: 4, lg: 4.5}}></Grid>
        <Grid item size={{xs: 12, sm: 12, md: 4, lg: 3}} sx={{...styles.grid, ...styles.gridOutter}}>
            <Stack spacing={2} sx={styles.stack}>
                <Avatar src={logo} sx={styles.avatar}/>
            </Stack>
            <Stack spacing={2} sx={styles.stack}>
                <Typography variant="h5" component="div" align="center">
                    Seja bem-vindo!
                </Typography>
            </Stack>
            <Stack spacing={2} sx={styles.stack}>
                <TextField 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error.email.show}
                    helperText={error.email.show ? error.email.message : ''}
                    label="E-mail" variant="outlined" fullWidth />
            </Stack>
            <Stack spacing={2} sx={styles.stack}>
                <TextField 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={error.password.show}
                    helperText={error.password.show ? error.password.message : ''}
                    label="Senha" type="password" variant="outlined" fullWidth />
            </Stack>
            <Stack spacing={2} sx={styles.stack}>
                <a href="">Esqueci minha senha</a>
            </Stack>
            <Stack spacing={2} sx={styles.stack}>
                <Button 
                    loading={loading}
                    variant="contained" color="primary" fullWidth onClick={handleLogin}>Entrar</Button>
            </Stack>
            <Stack spacing={2} sx={styles.stack}>
                <a href="">Criar conta</a>
            </Stack>
            <Snackbar 
                open={message !== ""}
                autoHideDuration={6000}
                onClose={() => setMessage('')}
                message={message}
            />
        </Grid>
    </Grid>;
}

export default Login;