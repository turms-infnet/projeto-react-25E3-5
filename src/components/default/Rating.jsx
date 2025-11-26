import { Typography, Stack } from "../";
import {Rating as MuiRating, Paper} from '@mui/material';

const Rating = (props) => {
	return <Stack direction="row" spacing={2}>
				<Paper elevation={0} sx={{
					backgroundColor: 'transparent',
				}}>
					<Typography component="legend">{props.label}: </Typography>
				</Paper>
				<Paper elevation={0} sx={{
					backgroundColor: 'transparent',
					minWidth: '30px',
				}}>
					{Number(props.value).toFixed(1)}
				</Paper>
				<Paper elevation={0} sx={{
					backgroundColor: 'transparent',
				}}>
					<MuiRating
						{...props}
					/>
				</Paper>
			</Stack>
}

export default Rating;
