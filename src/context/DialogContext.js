import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useCallback } from 'react';
import { Button } from '../components';

const DialogContext = React.createContext();

export function useDialog() {
    return React.useContext(DialogContext);
}

export function DialogProvider({ children }) {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState(null);
    const [content, setContent] = React.useState(null);
    const [buttons, setButtons] = React.useState([]);

    const handleClose = () => {
        setOpen(false);
    };

    const showDialog = useCallback((title, text, contentFn, buttons) => {
        setTitle(title || '');
        setText(text || null);
        setContent(contentFn);
        setButtons(buttons || []);
        setOpen(true);
    }, []);

    return <DialogContext.Provider value={{ showDialog }}>
        {children}
        <Dialog fullWidth={true} open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {
                    text ? <DialogContentText>{text}</DialogContentText> : null
                }
                {
                    typeof content === 'function' ? content() : content
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                {
                    buttons.length > 0 ? buttons.map((btn, idx) => {
                        return <Button key={idx} onClick={btn.onClick}>{btn.label}</Button>
                    }) : null
                }
            </DialogActions>
        </Dialog>
    </DialogContext.Provider>
}
