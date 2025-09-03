import { Avatar as MuiAvatar } from '@mui/material';

const Avatar = (props) => {
	return (
		props.children ? 
			<MuiAvatar {...props}>
				{props.children}
			</MuiAvatar> : <MuiAvatar  {...props}/>
	);
}

export default Avatar;