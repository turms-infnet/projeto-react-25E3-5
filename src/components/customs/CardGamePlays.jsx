import React from 'react';
import Typography from '../default/Typography ';
import { Box } from '@mui/material';

const CardGamePlays = ({ gameplay }) => {
    return (
        <Box sx={{
            mb: 4
        }}>
           <a href={gameplay.url} target='_blank' style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={gameplay.image} alt={gameplay.title} style={{ maxWidth: '100%' }} />
            <Typography variant="subtitle1">{gameplay.title}</Typography>
           </a>
        </Box>
    );
}

export default CardGamePlays;
