import { CardActions as MuiCardActions }  from '@mui/material';

const CardActions = (props) => {
	return <MuiCardActions {...props}>{props.children}</MuiCardActions>;
}

export default CardActions;