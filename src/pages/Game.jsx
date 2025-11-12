import React from "react";
import { CardGamePlays, Grid, Typography } from "../components";
import useGames from "../hooks/useGames";
import { Box, Chip, Divider } from "@mui/material";
import { useParams } from "react-router-dom";

const Game = () => {
    const { id } = useParams();

    const { game, findGame, loading } = useGames();

    React.useEffect(() => {
        findGame(id);
    }, [id, findGame]);

    console.log(game)

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
        </>
    );
}

export default Game;