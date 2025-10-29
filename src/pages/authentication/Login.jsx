import React from "react";
import { Grid, Stack, Avatar, TextField, Button, Snackbar } from "../../components";
import logo from '../../assets/images/logo-black.png';
import { Typography } from "@mui/material";
import Authentication from "../../services/Authentication";
import Storage from "../../services/Storage";
import { modeloData } from "./modelo";

import styles from './styles';
import { useToast } from "../../context/ToastContext";
import Database from "../../services/Database";

const Login = () => {
    const { showToast } = useToast();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(modeloData);
    const [loading, setLoading] = React.useState(false);
    

const handleLogin = async () => {
        setLoading(true);
        setError(modeloData);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            setError((prev) => ({
                ...prev,
                email: { message: 'E-mail é obrigatório', show: true }
            }));
            return;
        }
        if (!emailRegex.test(email)) {
            setError((prev) => ({
                ...prev,
                email: { message: 'E-mail inválido', show: true }
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
            const {data, error} = await Authentication.login(email, password);
            if (error) {
                throw error;
            }
            showToast('Login realizado com sucesso!', 'success');

            const {data: role } = await Database.findBy('user_role', {
                "xid_user": {
                    exact: true,
                    value: data.user.id
                },
            });

            console.log(data)
            
            Storage.setItem('user', {
                user: {
                    ...data.user,
                    role: role[0].role,
                },
                session: data.session
            });
            window.location = '/';
        } catch (error) {
            if (error.message === "Invalid login credentials") {
                showToast('E-mail ou senha inválidos', 'error');
            } else {
                showToast('Falha no login: ' + error.message, 'error');
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
                <a href="/register">Criar conta</a>
            </Stack>
        </Grid>
    </Grid>;
}

export default Login;