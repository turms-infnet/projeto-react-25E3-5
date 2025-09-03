import { Grid, Stack, Avatar, TextField, Button } from "../../components";
import logo from '../../assets/images/logo-black.png';
import { Typography } from "@mui/material";

import styles from './styles';

const Login = () => {
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
                <TextField label="E-mail" variant="outlined" fullWidth />
            </Stack>
            <Stack spacing={2} sx={styles.stack}>
                <TextField label="Senha" type="password" variant="outlined" fullWidth />
            </Stack>
            <Stack spacing={2} sx={styles.stack}>
                <a href="">Esqueci minha senha</a>
            </Stack>
            <Stack spacing={2} sx={styles.stack}>
                <Button variant="contained" color="primary" fullWidth>Entrar</Button>
            </Stack>
            <Stack spacing={2} sx={styles.stack}>
                <a href="">Criar conta</a>
            </Stack>
        </Grid>
    </Grid>;
}

export default Login;