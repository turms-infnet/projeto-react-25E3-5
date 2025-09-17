import React from "react";
import { Grid, Stack, Avatar, TextField, Button, Snackbar } from "../../components";
import logo from '../../assets/images/logo-black.png';
import { Typography } from "@mui/material";
import Authentication from "../../services/Authentication";
import { modeloData } from "./modelo";

import styles from './styles';

const Register = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState(modeloData);
    const [message, setMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleRegister = async () => {
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
        if (password.size < 8) {
            setError((prev) => ({
                ...prev,
                password: { message: 'Senha deve ter pelo menos 8 caracteres', show: true }
            }));
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
        if (!passwordRegex.test(password)) {
            setError((prev) => ({
                ...prev,
                password: { message: 'A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial', show: true }
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
        if (confirmPassword === '') {
            setError((prev) => ({
                ...prev,
                confirmPassword: { message: 'Confirmação de senha é obrigatória', show: true }
            }));
            return;
        }
        if (password !== confirmPassword) {
            setError((prev) => ({
                ...prev,
                confirmPassword: { message: 'As senhas não coincidem', show: true }
            }));
            return;
        }
        try {
            const {data, error } = await Authentication.register(email, password);
            if (error) {
                throw error;
            }
            setMessage('Registro realizado com sucesso!');
            console.log(data);
            console.log(JSON.stringify(data));
        } catch (error) {
            setMessage('Falha no registro: ' + error.message);
            console.error("Falha no registro", error);
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
                    Crie sua conta!
                </Typography>
            </Stack>
            <Stack spacing={2} sx={styles.stack}>
                <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="E-mail" 
                    variant="outlined" 
                    error={error.email.show}
                    helperText={error.email.show ? error.email.message : ''}
                    fullWidth />
            </Stack>
            <Stack spacing={2} sx={styles.stack}>
                <TextField 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Senha" 
                    type="password" 
                    error={error.password.show}
                    helperText={error.password.show ? error.password.message : ''}
                    variant="outlined" fullWidth />
            </Stack>
            <Stack spacing={2} sx={styles.stack}>
                <TextField 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label="Confirmar senha" 
                    type="password" 
                    error={error.confirmPassword.show}
                    helperText={error.confirmPassword.show ? error.confirmPassword.message : ''}
                    variant="outlined" 
                    fullWidth />
            </Stack>
            <Stack spacing={2} sx={styles.stack}>
                <Button 
                    loading={loading}
                    variant="contained" color="primary" fullWidth onClick={handleRegister}>Cadastrar</Button>
            </Stack>
            <Stack spacing={2} sx={styles.stack}>
                <a href="">Entrar</a>
            </Stack>
            <Snackbar 
                open={message !== ""}
                autoHideDuration={10000}
                onClose={() => setMessage('')}
                message={message}
            />
        </Grid>
    </Grid>;
}

export default Register;