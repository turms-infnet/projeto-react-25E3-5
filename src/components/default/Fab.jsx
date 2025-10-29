import { Fab as MuiFab } from '@mui/material';

const Fab = (props) => {
	return (
		<MuiFab {...props}>{props.children}</MuiFab>
	);
}

export default Fab;
