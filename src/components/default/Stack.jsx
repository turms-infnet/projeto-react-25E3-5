import { Stack as MuiStack } from '@mui/material';

const Stack = (props) => {
	return <MuiStack {...props}>{props.children}</MuiStack>
}
export default Stack;
