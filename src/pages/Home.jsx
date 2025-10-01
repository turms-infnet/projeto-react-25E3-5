import React from "react";
import { Button } from "../components";
import useGames from "../hooks/useGames";
import Authentication from "../services/Authentication";

const Home = () => {
    const { games, listGames } = useGames();
    
    React.useEffect(() => {
        listGames('created_at', 'DESC', 10, 1);
    }, [listGames]);

    return <>
                <Button text="Logout" onClick={() => {
                    Authentication.logout();
                }}>Sair</Button>
                {
                    games.map((game) => (
                        <div key={game.id}>
                            {game.title}
                        </div>
                    ))
                }
            </>;
}

export default Home;