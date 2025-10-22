import React from "react";
import { Button, CardGamePlays, Grid, Typography } from "../components";
import useGames from "../hooks/useGames";
import Authentication from "../services/Authentication";

const Game = (props) => {
    const id = props.currentRoute.replace('/game/', '');
    const { game, findGame } = useGames();

    React.useEffect(() => {
        findGame(id);
    }, [id, findGame]);

    console.log(game)

    return <>
                <Button text="Logout" onClick={() => {
                    Authentication.logout();
                }}>Sair</Button>
                {game && (
                    <Grid container>
                        <Grid item size={{ xs: 12, md: 9.5 }}>
                            <img src={game.image} alt={game.title} style={{ maxWidth: '100%' }} />
                            <Typography variant="h5">{game.title}</Typography>
                            <Typography variant="body1">{game.description}</Typography>
                        </Grid>
                        <Grid item size={{ xs: 12, md: 2.5 }} sx={{
                            pl:1,
                            pr: 1
                        }}>
                            <Typography variant="h6">Gameplays</Typography>
                            {
                                game.gameplays ? game.gameplays.map((gameplay) => (
                                    <CardGamePlays key={gameplay.id} gameplay={gameplay} />
                                )) : null
                            }
                        </Grid>
                    </Grid>
                )}
            </>;
}

export default Game;