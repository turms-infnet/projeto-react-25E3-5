import React from 'react';
import Typography from '../default/Typography ';
import { ImageListItem, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import Fab from '../default/Fab';

const CardGamePlays = ({ gameplay, user, setSelectedGameplay, handleClickOpenInformation, handleClickOpenConfirm, handleClickOpeEdit }) => {
    return (
        <ImageListItem key={gameplay.image}>
            { 
                user && user.role === 1 ? 
                    <>
                    <Fab 
                        onClick={() => {
                            handleClickOpeEdit(gameplay);
                        }}
                        size="small" 
                        color="secondary" 
                        aria-label="edit" 
                        sx={{
                            position: 'absolute',
                            width: '35px',
                            height: '35px', 
                            left: '5px',
                            top: '5px',
                        }}>
                        <EditIcon sx={{ width: '20px', height: '20px' }}/>
                    </Fab>
                    <Fab 
                        onClick={() => {
                            setSelectedGameplay(gameplay);
                            handleClickOpenConfirm();
                        }}
                        size="small" 
                        color="error" 
                        aria-label="edit" 
                        sx={{
                            position: 'absolute',
                            width: '35px',
                            height: '35px', 
                            left: '5px',
                            top: '55px',
                        }}>
                        <DeleteIcon sx={{ width: '20px', height: '20px' }}/>
                    </Fab>
                    <Fab 
                        onClick={() => {
                            setSelectedGameplay(gameplay);
                            handleClickOpenInformation(gameplay);
                        }}
                        size="small" 
                        color="primary" 
                        aria-label="edit" 
                        sx={{
                            position: 'absolute',
                            width: '35px',
                            height: '35px', 
                            left: '5px',
                            top: '105px',
                        }}>
                        <InfoIcon sx={{ width: '20px', height: '20px' }}/>
                    </Fab>
                    </>  : null
            }
            <a href={gameplay.url} target="_blank" rel="noopener noreferrer">
                <img
                    src={gameplay.image}
                    alt={gameplay.title}
                    loading="lazy"
                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                />
            </a>
            <Tooltip title={gameplay.title}>
                <Typography variant="subtitle1" gutterBottom>{gameplay?.title.substring(0, 20)}...</Typography>
            </Tooltip>
        </ImageListItem>
    );
}

export default CardGamePlays;
