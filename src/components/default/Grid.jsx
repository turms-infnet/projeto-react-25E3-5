import { Grid as MuiGrid } from '@mui/material';

const Grid = (props) => {
	return <MuiGrid {...props}>{props.children}</MuiGrid>
}
export default Grid;