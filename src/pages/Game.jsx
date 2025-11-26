import React from "react";
import { CardGamePlays, Grid, Typography, Fab, Rating, Stack } from "../components";
import AddIcon from '@mui/icons-material/Add';
import useGames from "../hooks/useGames";
import { Box, Chip, Divider, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import useRating from "../hooks/useRating";

const Game = () => {
    const { id } = useParams();
    const { game, findGame, loading } = useGames();
    const { ratingGame, getRatingGame, getRatingGameGeneral, ratingGameValue } = useRating();
    const { showToast } = useToast();

    const [open, setOpen] = React.useState(false);
    const [userRatingId, setUserRatingId] = React.useState(null);
    const [userRating, setUserRating] = React.useState(0);

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user : null;

    React.useEffect(() => {
        findGame(id);
        loadRating();
        getRatingGameGeneral(id);
    }, [id, findGame]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const loadRating = async () => {
        const data = await getRatingGame(user.id, id);
        if (data) {
            setUserRatingId(data.id);
            setUserRating(data.value);
        }
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    {loading ? (
                        <Box sx={{ aspectRatio: '16/9', width: '100%', bgcolor: 'action.hover', borderRadius: 2 }} />
                    ) : (
                        <>
                            <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2, mb: 2 }}>
                                <img src={game.image} alt={game.title} style={{ width: '100%', display: 'block' }} />
                                <Chip label={game.release_date ? new Date(game.release_date).toLocaleDateString() : ''} sx={{ position: 'absolute', top: 12, left: 12 }} />
                            </Box>
                            <Typography variant="h4" gutterBottom>{game.title}</Typography>
                            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                <Paper elevation={0} sx={{
                                    backgroundColor: 'transparent',
                                }}>
                                    <Rating 
                                        min={0} 
                                        max={5}
                                        precision={0.1}
                                        value={userRating} 
                                        onChange={async (event, newValue) => {
                                            try {
                                                let valueFinal = 0;
                                                if (newValue !== null) {
                                                    valueFinal = newValue;
                                                }

                                                setUserRating(valueFinal);
                                                const { data, error } = await ratingGame(userRatingId, valueFinal, user.id, game.id);
                                                if (error) {
                                                    showToast(error.message, 'error');
                                                } else {
                                                    setUserRatingId(data[0].id);
                                                    showToast('Avaliação enviada com sucesso!', 'success');
                                                }
                                            } catch (error) {
                                                showToast('Erro ao enviar avaliação.', 'error');
                                            }
                                        }} label="Sua avaliação"/>
                                </Paper>
                                <Paper elevation={0} sx={{
                                    backgroundColor: 'transparent',
                                }}>
                                    <Typography variant="h6" gutterBottom>Avaliação geral: {Number(ratingGameValue).toFixed(1)}</Typography>
                                </Paper>
                            </Stack>

                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>{game.description}</Typography>
                        </>
                    )}
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>Gameplays</Typography>
                    <Divider sx={{ mb: 2, opacity: .2 }} />
                    {
                        game?.gameplays?.length ? game.gameplays.map((gp) => (
                            <Box key={gp.id} sx={{ mb: 1.5 }}>
                                <CardGamePlays gameplay={gp} />
                            </Box>
                        )) : (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Nenhuma gameplay cadastrada.</Typography>
                        )
                    }
                </Grid>
            </Grid>
            {
                user && user.role === 1 ? 
                <Fab color="secondary" aria-label="edit" sx={{
                    position: 'absolute',
                    right: '20px',
                    bottom: '20px',
                    }}
                    onClick={handleClickOpen}
                    >
                    <AddIcon />
                </Fab>  : null
            }
        </>
    );
}

export default Game;