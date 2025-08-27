import { 
    Alert as MuiAlert, 
    AlertTitle 
} from '@mui/material';

const Alert = (props) => {
    return <MuiAlert {...props}>
            { props.title ? <AlertTitle>{props.title}</AlertTitle> : null }
            { props.children }
        </MuiAlert>
}

export default Alert;