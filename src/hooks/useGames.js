import React, { useCallback } from "react";
import Database from "../services/Database";
import ApiGiantBomb from "../services/ApiGiantBomb";
import Bucket from "../services/Bucket";

const useGames = () => {
    const [games, setGames] = React.useState([]);
    const [game, setGame] = React.useState({});
    const [numberOfTotalResults, setNumberOfTotalResults] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const saveGame = useCallback(async (data, filter, limit, page, api) => {
        setLoading(true);
        try {
            const image = await Bucket.upload('games', Bucket.generateNameFile(data.title), data.image);
            data.image = image;

            const { data: d, error } = await Database.create('game', data);
            console.log(d)
        } finally {
            listGames(filter, limit, page, api);
        }
        setLoading(false);
    });

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
                        let i = 0;
                        for (const game of data) {
                            if (game.image.indexOf('https://') === -1) {
                                const image = await Bucket.load(game.image)
                                data[i].image = image;
                            }
                            i++;
                        }
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
                    if (data[0].image.indexOf('https://') === -1) {
                        const image = await Bucket.load(data[0].image)
                        data[0].image = image;
                    }

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
        listGames, findGame, ratingGame, ratingGamePlay, games, game, numberOfTotalResults, loading, saveGame
    };
}

export default useGames;