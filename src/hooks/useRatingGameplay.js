import React, { useCallback } from "react";
import Database from "../services/Database";

const useRatingGameplay = () => {
    const [loadingRatingGameplay, setLoadingRatingGameplay] = React.useState(false);
    const [ratingGameplayValue, setRatingGameplayValue] = React.useState(0.0);

    const ratingGameplay = useCallback(async (id, rating, userId, gameplayId) => {
        setLoadingRatingGameplay(true);
        try {
            let data = {
                xid_user: userId,
                xid_game_play: gameplayId,
                value: rating
            }
            if (id) {
                data.id = id;
            }
            return await Database.upsert('rating_game_play', data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingRatingGameplay(false);
        }
    }, []);

    const getRatingGameplay = useCallback(async (userId, gameplayId) => {
        setLoadingRatingGameplay(true);
        try {
            const { data, error } = await Database.findBy('rating_game_play', {
                xid_user: {
                    exact: true,
                    value: userId
                },
                xid_game_play: {
                    exact: true,
                    value: gameplayId
                }
            });
            if (!error) {
                if (data.length > 0) {
                    return data[0];
                }
            }
        } finally {
            setLoadingRatingGameplay(false);
        }
    }, []);

    const getRatingGameplayGeneral = useCallback(async (gameId) => {
        try {
            setLoadingRatingGameplay(true);
            const { data, error } = await Database.list('rating_game_play', 'average_value:value.avg()', {
                xid_game_play: {
                    exact: true,
                    value: gameId
                }
            }, 1, null, null);
            setRatingGameplayValue(data[0]?.average_value || 0.0);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingRatingGameplay(false);
        }

        return 0;
    }, []);

    return {
        ratingGameplay, getRatingGameplay, getRatingGameplayGeneral, ratingGameplayValue, loadingRatingGameplay
    };
}

export default useRatingGameplay;