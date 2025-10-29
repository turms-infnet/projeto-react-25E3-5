import React from "react";
import { Button, Fab, Grid } from "../components";
import useGames from "../hooks/useGames";
import AddIcon from '@mui/icons-material/Add';
import useFilter from "../hooks/useFilter";
import Filter from "../components/customs/Filter";
import CardGame from "../components/customs/CardGame";
import GameCardSkeleton from "../components/customs/GameCardSkeleton";
import EmptyState from "../components/customs/EmptyState";
import { useDialog } from "../context/DialogContext";
import FormGame from "../components/customs/form-game";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

const Home = () => {
    const { games, listGames, loading } = useGames();
    const { filter, doFilter } = useFilter();
    const { showDialog } = useDialog();
    const [data, setData] = React.useState({
        title: '',
        description: '',
        image: '',
        release_date: null
    });

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user : null;
       
    React.useEffect(() => {
        listGames(filter.title.value ? filter : null, 10, 1, false);
    }, [filter]);

    console.log(data)

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
                { 
            user && user.role === 1 ? 
                <Fab color="secondary" aria-label="edit" sx={{
                    position: 'absolute',
                    right: '20px',
                    bottom: '20px',
                    }}
                    onClick={() => {
                        showDialog(
                            'Adicionar Jogo', 
                            'Preencha o formuário para adicionar um jogo', 
                            <FormGame 
                                data={data}
                                setData={setData}
                            />, 
                            [{
                                label: 'Adicionar',
                                onClick: () => {}
                            }])
                    }}
                    >
                    <AddIcon />
                </Fab>  : null
            }
            </>;
}

export default Home;