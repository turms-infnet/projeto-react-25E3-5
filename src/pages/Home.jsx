import { Button } from "../components";
import Authentication from "../services/Authentication";

const Home = () => {
    return <>
                <Button text="Logout" onClick={() => {
                    Authentication.logout();
                }}>Sair</Button>
            </>;
}

export default Home;