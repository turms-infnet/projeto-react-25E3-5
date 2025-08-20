import { supabase } from "./services/SupabaseClient";

const App = () => {
    console.log(supabase)
    
    return <h1>Olá mundo com deploy atualizado com deploy automático</h1>
}

export default App;