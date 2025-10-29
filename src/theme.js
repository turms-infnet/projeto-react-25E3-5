import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#22c55e' }, // emerald
        secondary: { main: '#8b5cf6' }, // violet
        background: {
            default: '#0b1020',
            paper: '#11162a',
        },
    },
    shape: {
        borderRadius: 14,
    },
    typography: {
        fontFamily: [
            'Inter',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: { fontWeight: 800, letterSpacing: '-0.02em' },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        button: { textTransform: 'none', fontWeight: 700 },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: ({ palette }) => ({
                'html, body, #root': { height: '100%' },
                body: {
                    backgroundImage:
                        'radial-gradient(60% 80% at 10% 0%, rgba(34,197,94,.15) 0, rgba(34,197,94,0) 60%),\n             radial-gradient(60% 80% at 90% 20%, rgba(139,92,246,.18) 0, rgba(139,92,246,0) 60%)',
                    backgroundAttachment: 'fixed',
                },
            }),
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backdropFilter: 'saturate(120%) blur(6px)',
                    boxShadow:
                        '0 10px 30px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.02)',
                },
            },
        },
        MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
                root: { borderRadius: 12 },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: { background: 'rgba(17,22,42,0.8)', backdropFilter: 'blur(8px)' },
            },
        },
    },
});

export default theme;
