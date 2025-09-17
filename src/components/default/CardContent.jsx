import { CardContent as MuiCardContent }  from '@mui/material';

const CardContent = (props) => {
	return <MuiCardContent {...props}>{props.children}</MuiCardContent>;
}

export default CardContent;