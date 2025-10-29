import React, { useCallback } from "react";
import Database from "../services/Database";
import ApiGiantBomb from "../services/ApiGiantBomb";

const useGames = () => {
    const [games, setGames] = React.useState([]);
    const [game, setGame] = React.useState({});
    const [numberOfTotalResults, setNumberOfTotalResults] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const listGames = useCallback(async (filter, limit, page, api) => {
        setLoading(true);
        try {
            if (api) {
                const games = await ApiGiantBomb.search(filter ? filter.title.value : '', limit, page);
                setGames(games.data);
                setNumberOfTotalResults(games.number_of_total_results);
            } else {
                const { data, error } = await Database.list('game', '*', filter, limit, page);
                if (!error) {
                    if (data.length > 0) {
                        setGames(data);
                    } else {
                        setGames([]);
                    }
                }
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const findGame = useCallback(async (id) => {
        setLoading(true);
        try {
            const { data, error } = await Database.find('game', id);
            if (!error) {
                if (data.length > 0) {
                    const gamePlay = await Database.list('game_play', '*', {
                        "xid_game": {
                            exact: true,
                            value: data[0].id
                        }
                    }, 100, 1);

                    setGame({ ...data[0], gameplays: gamePlay.data });
                } else {
                    setGame({});
                }
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const ratingGame = useCallback(async (id, rating) => {

    }, [listGames, findGame]);

    const ratingGamePlay = useCallback(async (id, rating) => {
    }, [listGames, findGame]);

    return {
        listGames, findGame, ratingGame, ratingGamePlay, games, game, numberOfTotalResults, loading
    };
}

export default useGames;