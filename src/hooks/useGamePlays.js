import React, { useCallback } from "react";
import Database from "../services/Database";
import Bucket from "../services/Bucket";

const useGamePlays = () => {
    const [loadingGameplay, setLoadingGameplay] = React.useState(false);
    const [gameplays, setGameplays] = React.useState([]);

    const saveGameplay = useCallback(async (gameplay, gameId) => {
        setLoadingGameplay(true);
        try {
            let data = {
                xid_game: gameId,
                ...gameplay
            }

            const image = await Bucket.upload('games', Bucket.generateNameFile(`${data.title}_${gameId}`), data.image);
            data.image = image;

            return await Database.create('game_play', data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingGameplay(false);
        }
    }, []);

    const updateGameplay = useCallback(async (id, gameplay, gameId) => {
        setLoadingGameplay(true);
        try {
            let data = {
                id: id,
                xid_game: gameId,
                ...gameplay
            }

            return await Database.update('game_play', data, id);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingGameplay(false);
        }
    }, []);

    const getGameplay = useCallback(async (id) => {
        setLoadingGameplay(true);
        try {
            const { data, error } = await Database.find('game_play', id);
            if (!error) {
                if (data.length > 0) {
                    return data[0];
                }
            }
        } finally {
            setLoadingGameplay(false);
        }
    }, []);

    const listGamePlay = useCallback(async (filter, limit, page, orderBy) => {
        setLoadingGameplay(true);
        try {
            if (!orderBy) {
                orderBy = {
                    field: 'title',
                    ascending: true
                }
            }

            const { data, error } = await Database.list('game_play', '*', filter, limit, page, orderBy);
            if (!error) {
                if (data.length > 0) {
                    let i = 0;
                    for (const game of data) {
                        if (game.image.indexOf('https://') === -1) {
                            const image = await Bucket.load(game.image)
                            data[i].image = image;
                        }
                        i++;
                    }
                    setGameplays(data);
                } else {
                    setGameplays([]);
                }
            }
        } finally {
            setLoadingGameplay(false);
        }
    }, []);

    const deleteGameplay = useCallback(async (id) => {
        setLoadingGameplay(true);
        try {
            return await Database.delete('game_play', id);
        } catch (e) {
            console.error(e);
        }
        finally {
            setLoadingGameplay(false);
        }
    }, []);

    return {
        saveGameplay, updateGameplay, getGameplay, listGamePlay, gameplays, loadingGameplay, deleteGameplay
    };
}

export default useGamePlays;