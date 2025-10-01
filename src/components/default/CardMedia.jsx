import { CardMedia as MuiCardMedia }  from '@mui/material';

const CardMedia = (props) => {
	return <MuiCardMedia {...props}>{props.children}</MuiCardMedia>;
}

export default CardMedia;
