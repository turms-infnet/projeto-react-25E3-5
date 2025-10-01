import { CardHeader as MuiCardHeader }  from '@mui/material';

const CardHeader = (props) => {
	return <MuiCardHeader {...props}>{props.children}</MuiCardHeader>;
}

export default CardHeader;
