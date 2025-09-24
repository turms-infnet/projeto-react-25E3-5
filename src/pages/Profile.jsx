import { Button } from "../components";
import Authentication from "../services/Authentication";

const Profile = () => {
    return <>
                <Button text="Logout" onClick={() => {
                    Authentication.logout();
                }}>Sair</Button>
                <h1>Perfil</h1>
            </>;
}

export default Profile;