import { Pagination as MuiPagination } from '@mui/material';
import { useEffect } from 'react';
import useGames from '../../hooks/useGames';

const Pagination = (props) => {
    const { countTotalGames, numberOfTotalResults } = useGames();
	const count = numberOfTotalResults / props.limit;

	useEffect(() => {
		countTotalGames();
	}, [numberOfTotalResults]);


	return <MuiPagination {...props} count={count}/>
}
export default Pagination;
