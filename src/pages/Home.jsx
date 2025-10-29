import React from "react";
import { Button, Grid } from "../components";
import useGames from "../hooks/useGames";
import Authentication from "../services/Authentication";
import useFilter from "../hooks/useFilter";
import Filter from "../components/customs/Filter";
import CardGame from "../components/customs/CardGame";
import GameCardSkeleton from "../components/customs/GameCardSkeleton";
import EmptyState from "../components/customs/EmptyState";

const Home = () => {
    const { games, listGames, loading } = useGames();
    const { filter, doFilter } = useFilter();
    
    React.useEffect(() => {
        listGames(filter.title.value ? filter : null, 10, 1, false);
    }, [filter]);

    return <>
                <Filter 
                    label="Filtrar por título"
                    filter={filter}
                    doFilter={doFilter}
                />
                <Grid container spacing={3} sx={{ mt: 2 }}>
                    {loading ? (
                        Array.from({ length: 12 }).map((_, idx) => (
                            <Grid item size={{
                                xs: 12,
                                sm: 6,
                                md: 3
                            }} key={idx}>
                                <GameCardSkeleton />
                            </Grid>
                        ))
                    ) : games.length === 0 ? (
                        <Grid item size={{
                            xs: 12,
                        }}>
                            <EmptyState title="Nenhum jogo encontrado" subtitle="Tente outro termo de busca ou carregue da API." />
                        </Grid>
                    ) : (
                        <>
                            {games.map((game) => (
                                <Grid item 
                                    size={{
                                        xs: 12,
                                        sm: 6,
                                        md: 3
                                    }} key={game.id}>
                                    <CardGame game={game} />
                                </Grid>
                            ))}
                            <Grid item xs={12}>
                                <Button variant="text" onClick={async () => {
                                    listGames(filter.title.value ? filter : null, 10, 1, true);
                                }}>Não encontrei meu jogo</Button>
                            </Grid>
                        </>
                    )}
                </Grid>
            </>;
}

export default Home;