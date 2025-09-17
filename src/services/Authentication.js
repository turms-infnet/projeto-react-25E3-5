import Storage from "./Storage";
import supabase from "./SupabaseClient";

const Authentication = {
    login: async (email, password) => {
        return await supabase.auth.signInWithPassword({
            email,
            password
        })
    },
    register: async (email, password) => {
        return await supabase.auth.signUp({
            email,
            password
        })
    },
    isAuthenticated: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        return user !== null;
    },
    logout: async () => {
        Storage.clear();
        await supabase.auth.signOut();
        window.location.reload();
    }
}

export default Authentication;