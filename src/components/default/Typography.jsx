import { Typography as MuiTypography } from '@mui/material';

const Typography = (props) => {
	return <MuiTypography {...props}>{props.children}</MuiTypography>
}
export default Typography;