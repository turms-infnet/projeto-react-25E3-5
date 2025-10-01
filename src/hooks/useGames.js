import React, { useCallback } from "react";
import Database from "../services/Database";

const useGames = () => {
    const [games, setGames] = React.useState([]);
    const [game, setGame] = React.useState({});

    const listGames = useCallback(async (filter, limit, page) => {
        const { data, error } = await Database.list('game', '*', filter, limit, page);
        if (!error) {
            setGames(data);
        }
    }, []);

    const findGame = useCallback(async (id) => {
        setGame({});
    }, []);

    const ratingGame = useCallback(async (id, rating) => {

    }, [listGames, findGame]);

    const ratingGamePlay = useCallback(async (id, rating) => {
    }, [listGames, findGame]);

    return {
        listGames, findGame, ratingGame, ratingGamePlay, games, game
    };
}

export default useGames;