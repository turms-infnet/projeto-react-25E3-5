import React from "react";
import { Button, CardMedia, DatePicker, Fab, Grid, Stack, TextField } from "../components";
import useGames from "../hooks/useGames";
import AddIcon from '@mui/icons-material/Add';
import useFilter from "../hooks/useFilter";
import Filter from "../components/customs/Filter";
import CardGame from "../components/customs/CardGame";
import GameCardSkeleton from "../components/customs/GameCardSkeleton";
import EmptyState from "../components/customs/EmptyState";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const Home = () => {
    const { games, listGames, loading, saveGame } = useGames();
    const { filter, doFilter } = useFilter();
    const [data, setData] = React.useState({
        title: '',
        description: '',
        image: '',
        release_date: null
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user : null;

    const convertFileToBase64 = (file) => {
        if(!file) {
            setData((values) => ({
                ...values,
                image: ''
            }));
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setData((values) => ({
                ...values,
                image: base64String
            }))
        }
        reader.readAsDataURL(file);
    }

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
            <Dialog
                maxWidth={'lg'}
                fullWidth={true}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Criar/Editar Jogo</DialogTitle>
                <DialogContent>
                    <form>
                        <Stack mt={2}>
                            <TextField
                                id="name"
                                name="title"
                                label="Nome do Jogo"
                                fullWidth
                                value={data.title}
                                onChange={(e) => setData((values) => ({
                                    ...values,
                                    title: e.target.value
                                }))} />
                        </Stack>
                        <Stack mt={2}>
                            <TextField
                                id="description"
                                name="description"
                                label="Descrição"
                                multiline
                                rows={4}
                                fullWidth
                                value={data.description}
                                onChange={(e) => setData((values) => ({
                                    ...values,
                                    description: e.target.value
                                }))} />
                        </Stack>
                        <Stack mt={2}>
                            <TextField
                                id="image"
                                name="image"
                                type="file"
                                fullWidth
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    convertFileToBase64(file)
                                }} />
                            { data.image ? <label for="image">
                                <CardMedia sx={{
                                    height: 'auto',
                                    width: '400px',
                                    borderRadius: '40px',
                                    height: '220px',
                                    backgroundSize: 'contain',
                                    margin: '30px auto'
                                }} image={data.image} />
                            </label>  : null}
                        </Stack>
                        <Stack mt={2}>
                            <DatePicker
                                id="release_date"
                                name="release_date"
                                label="Data de Lançamento"
                                value={data.release_date}
                                fullWidth
                                sx={{
                                    width: '100%',
                                }}
                                onChange={(value) => 
                                    setData((values) => ({
                                        ...values,
                                        release_date: value
                                    }))
                                } />
                        </Stack>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={() => {
                        saveGame(data, filter.title.value ? filter : null, 10, 1, false);
                    }} autoFocus>Salvar</Button>
                </DialogActions>
            </Dialog>
            </>;
}

export default Home;