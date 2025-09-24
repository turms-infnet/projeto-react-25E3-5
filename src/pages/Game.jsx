import { Button } from "../components";
import Authentication from "../services/Authentication";

const Game = (props) => {
    const id = props.currentRoute.replace('/game/', '');

    return <>
                <Button text="Logout" onClick={() => {
                    Authentication.logout();
                }}>Sair</Button>
                <h1>Game Page {id}</h1>
            </>;
}

export default Game;