import React, { useCallback } from "react";

const useGames = () => {
    const [games, setGames] = React.useState([]);
    const [game, setGame] = React.useState({});

    const listGames = useCallback(async (orderBy, direction, limit, page) => {
        setGames([
            { id: 1, title: 'Game 1' },
            { id: 2, title: 'Game 2' },
            { id: 3, title: 'Game 3' }
        ]);
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