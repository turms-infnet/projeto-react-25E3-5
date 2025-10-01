import React, { useCallback } from 'react';
import { Alert, Snackbar } from "../components";

const ToastContext = React.createContext();

export function useToast() {
    return React.useContext(ToastContext);
}

export function ToastProvider({ children }) {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [severity, setSeverity] = React.useState('');

    const showToast = useCallback((msg, sev = "info") => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    }, []);

    return <ToastContext.Provider value={{ showToast }}>
        {children}
        <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
            <Alert severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    </ToastContext.Provider>
}

