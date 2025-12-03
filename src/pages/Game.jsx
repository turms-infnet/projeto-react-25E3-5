import React from "react";
import { CardGamePlays, Grid, Typography, Fab, Rating, Stack, TextField, Button, CardMedia, ConfirmDialog } from "../components";
import AddIcon from '@mui/icons-material/Add';
import useGames from "../hooks/useGames";
import useGamePlays from "../hooks/useGamePlays";
import { Box, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, ImageList, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { convertFileToBase64 } from "../utils/Image";
import useRating from "../hooks/useRating";

const Game = () => {
    const { id } = useParams();
    const { game, findGame, loading } = useGames();
    const { saveGameplay, updateGameplay, deleteGameplay, listGamePlay, gameplays, loadingGameplay } = useGamePlays();
    const { ratingGame, getRatingGame, getRatingGameGeneral, ratingGameValue } = useRating();
    const { showToast } = useToast();

    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [userRatingId, setUserRatingId] = React.useState(null);
    const [userRating, setUserRating] = React.useState(0);
    const [data, setData] = React.useState({
        id: null,
        title: '',
        url: '',
        image: ''
    });

    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [selectedGameplay, setSelectedGameplay] = React.useState(null);

    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleClose = () => {
        setOpen(false);

        setData((v) => ({
            ...v,
            id: null,
            title: '',
            url: '',
            image: '',
        }));
    };

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user : null;

    React.useEffect(() => {
        findGame(id);
        loadRating();
        loadGameplays();
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

    const loadGameplays = async () => {
        await listGamePlay({ xid_game: { value: id, exact: true } }, 30, page, { field: 'title', order: 'asc' });
    }

    const handleClickOpeEdit = (game) => {
        setData((v) => ({
            ...v,
            id: game.id,
            title: game.title,
            url: game.url,
            image: game.image,
            xid_game: id,
        }));

        handleClickOpen();
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
                    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                    {
                        gameplays && gameplays?.length ? gameplays.map((gp) => (
                            <CardGamePlays 
                                setSelectedGameplay={setSelectedGameplay}
                                handleClickOpenConfirm={handleClickOpenConfirm}
                                handleClickOpeEdit={handleClickOpeEdit}
                                gameplay={gp} 
                                user={user} />
                        )) : (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Nenhuma gameplay cadastrada.</Typography>
                        )
                    }
                    </ImageList>
                </Grid>
            </Grid>
            <ConfirmDialog 
                open={openConfirm}
                setOpen={setOpenConfirm}
                title="Deletar"
                message="Tem certeza que deseja deletar esse gameplay?"
                onConfirm={async () =>{
                    await deleteGameplay(selectedGameplay.id);
                    setOpenConfirm(false);
                    setSelectedGameplay(null);
                    await loadGameplays();
                    showToast('Gameplay deletada com sucesso.', 'success');
                }}
                onCancel={() => {
                    setOpenConfirm(false);
                    setSelectedGameplay(null);
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
                                label="Nome do Gameplay"
                                fullWidth
                                value={data.title}
                                onChange={(e) => setData((values) => ({
                                    ...values,
                                    title: e.target.value
                                }))} />
                        </Stack>
                        <Stack mt={2}>
                            <TextField
                                id="url"
                                name="url"
                                label="URL"
                                fullWidth
                                value={data.url}
                                onChange={(e) => setData((values) => ({
                                    ...values,
                                    url: e.target.value
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
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={async () => {
                        if (data.id == null) {
                            await saveGameplay({
                                title: data.title,
                                url: data.url,
                                image: data.image
                            }, id);
                        } else {
                            await updateGameplay(data.id, data);
                        }

                        await loadGameplays();
                        handleClose();
                        showToast('Gameplay salva com sucesso.', 'success');
                    }} autoFocus>Salvar</Button>
                </DialogActions>
            </Dialog>
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