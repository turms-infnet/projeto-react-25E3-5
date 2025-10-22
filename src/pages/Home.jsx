import React from "react";
import { Button, Grid } from "../components";
import useGames from "../hooks/useGames";
import Authentication from "../services/Authentication";
import useFilter from "../hooks/useFilter";
import Filter from "../components/customs/Filter";
import CardGame from "../components/customs/CardGame";

const Home = () => {
    const { games, listGames } = useGames();
    const { filter, doFilter } = useFilter();
    
    React.useEffect(() => {
        listGames(filter.title.value ? filter : null, 10, 1, false);
    }, [filter]);

    return <>
                <Button text="Logout" onClick={() => {
                    Authentication.logout();
                }}>Sair</Button>
                <Filter 
                    label="Filtrar por título"
                    filter={filter}
                    doFilter={doFilter}
                />
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    
                    {
                        games.length === 0 ? 
                            <Grid item xs={12}>
                                Nenhum jogo encontrado.
                            </Grid>
                        : 
                            <>
                                {
                                    games.map((game) => (
                                        <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={game.id}>
                                            <CardGame game={game} />
                                        </Grid>
                                    ))  
                                }
                                <Grid item size={{ xs: 12 }}>
                                    <Button variant="text" onClick={async () => {
                                        listGames(filter.title.value ? filter : null, 10, 1, true);
                                    }}>Não encontrei meu jogo</Button>
                                </Grid>
                            </>
                    }
                </Grid>
            </>;
}

export default Home;