import React, { useCallback } from "react";
import Database from "../services/Database";

const useRating = () => {
    const [loading, setLoading] = React.useState(false);
    const [ratingGameValue, setRatingGameValue] = React.useState(0.0);

    const ratingGame = useCallback(async (id, rating, userId, gameId) => {
        setLoading(true);
        try {
            let data = {
                xid_user: userId,
                xid_game: gameId,
                value: rating
            }
            if (id) {
                data.id = id;
            }

            return await Database.upsert('rating_game', data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    const getRatingGame = useCallback(async (userId, gameId) => {
        setLoading(true);
        try {
            const { data, error } = await Database.findBy('rating_game', {
                xid_user: {
                    exact: true,
                    value: userId
                },
                xid_game: {
                    exact: true,
                    value: gameId
                }
            });
            if (!error) {
                if (data.length > 0) {
                    return data[0];
                }
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const getRatingGameGeneral = useCallback(async (gameId) => {
        try {
            setLoading(true);
            const { data, error } = await Database.list('rating_game', 'average_value:value.avg()', {
                xid_game: {
                    exact: true,
                    value: gameId
                }
            }, 1, null, null);
            setRatingGameValue(data[0]?.average_value || 0.0);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }

        return 0;
    }, []);

    return {
        ratingGame, getRatingGame, getRatingGameGeneral, ratingGameValue
    };
}

export default useRating;