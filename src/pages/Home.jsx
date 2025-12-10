import React from "react";
import { Button, CardMedia, ConfirmDialog, DatePicker, Fab, Grid, Stack, TextField } from "../components";
import useGames from "../hooks/useGames";
import AddIcon from '@mui/icons-material/Add';
import useFilter from "../hooks/useFilter";
import { useToast } from "../context/ToastContext";
import Filter from "../components/customs/Filter";
import CardGame from "../components/customs/CardGame";
import GameCardSkeleton from "../components/customs/GameCardSkeleton";
import EmptyState from "../components/customs/EmptyState";
import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select } from "@mui/material";
import { convertFileToBase64 } from "../utils/Image";

import dayjs from "dayjs";

const Home = () => {
    const { games, listGames, loading, saveGame, deleteGame, updateGame } = useGames();
    const { showToast } = useToast();
    const { filter, doFilter } = useFilter();
    const [data, setData] = React.useState({
        id: null,
        title: '',
        description: '',
        image: '',
        release_date: null
    });
    const [orderBy, setOrderBy] = React.useState({
        field: 'title',
        ascending: true
    });

    const [open, setOpen] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [selectedGame, setSelectedGame] = React.useState(null);
    const [selectedOrderBy, setSelectedOrderBy] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleClose = () => {
        setOpen(false);

        setData((v) => ({
            ...v,
            id: null,
            title: '',
            description: '',
            image: '',
            release_date: null
        }));
    };

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user : null;

    

    const loadGames = () => {
        if (filter.title.value) {
            listGames(filter, 10, 1, false, orderBy);
        } else{
            listGames({
                        "is_active": {
                            value: true,
                            exact: true
                        }
                      }, 10, 1, false, orderBy);
        }
    }

    React.useEffect(() => {
        loadGames();
    }, [filter]);

    React.useEffect(() => {
        switch (selectedOrderBy) {
            case 1:
                setOrderBy({
                    field: 'title',
                    ascending: true
                });
                break;
            case 2:
                setOrderBy({
                    field: 'title',
                    ascending: false
                });
                break;
            case 3:
                setOrderBy({
                    field: 'release_date',
                    ascending: true
                });
                break;
            case 4:
                setOrderBy({
                    field: 'release_date',
                    ascending: false
                });
                break;
            default:
                break;
        }
    }, [selectedOrderBy]);

    React.useEffect(() => {
        loadGames();
    }, [orderBy]);

    const handleClickOpeEdit = (game) => {
        setData((v) => ({
            ...v,
            id: game.id,
            title: game.title,
            description: game.description,
            image: game.image,
            release_date: dayjs(game.release_date)
        }));

        handleClickOpen();
    }

    return <>
                <Grid container spacing={3} sx={{ mt: 2 }}>
                    <Grid item size={{
                        xs: 12,
                        sm: 9,
                    }}>
                        <Filter 
                            label="Filtrar por título"
                            filter={filter}
                            doFilter={doFilter}
                        />
                    </Grid>
                    <Grid item size={{
                        xs: 12,
                        sm: 3
                    }}>
                       <Select
                            sx={{
                                width: '100%',
                                padding: '12px'
                            }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedOrderBy}
                            fullWidth={true}
                            label="Ordernar"
                            onChange={(event) => {
                                setSelectedOrderBy(event.target.value);
                            }}
                        >
                            <MenuItem value={0}>Selecione uma opção</MenuItem>
                            <MenuItem value={1}>Título A-Z</MenuItem>
                            <MenuItem value={2}>Título Z-A</MenuItem>
                            <MenuItem value={3}>Data de lançamento Antigo - Recente</MenuItem>
                            <MenuItem value={4}>Data de lançamento Recente - Antigo</MenuItem>
                        </Select> 
                    </Grid>
                </Grid>
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
                                    <CardGame 
                                        setSelectedGame={setSelectedGame}
                                        handleClickOpenConfirm={handleClickOpenConfirm}
                                        handleClickOpeEdit={handleClickOpeEdit}
                                        game={game} />
                                </Grid>
                            ))}
                        </>
                    )}
                </Grid>
                { 
            user && user.role === 1 ? 
                <Fab color="secondary" aria-label="edit" sx={{
                    position: 'fixed',
                    right: '20px',
                    bottom: '20px',
                    }}
                    onClick={handleClickOpen}
                    >
                    <AddIcon />
                </Fab>  : null
            }
            <ConfirmDialog 
                open={openConfirm}
                setOpen={setOpenConfirm}
                title="Deletar"
                message="Tem certeza que deseja deletar esse jogo?"
                onConfirm={async () =>{
                    await deleteGame(selectedGame.id);
                    setOpenConfirm(false);
                    setSelectedGame(null);
                    await loadGames();
                    showToast('Jogo deletado com sucesso.', 'success');
                }}
                onCancel={() => {
                    setOpenConfirm(false);
                    setSelectedGame(null);
                    showToast('Ação cancelada.', 'info');
                }}
            />
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
                                    convertFileToBase64(file, setData)
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
                    <Button onClick={async () => {
                        if (data.id == null) {
                            await saveGame({
                                title: data.title,
                                description: data.description,
                                image: data.image,
                                release_date: data.release_date
                            });
                        } else {
                            await updateGame(data.id, data);
                        }

                        await loadGames();
                        handleClose();
                        showToast('Jogo salvo com sucesso.', 'success');
                    }} autoFocus>Salvar</Button>
                </DialogActions>
            </Dialog>
            </>;
}

export default Home;