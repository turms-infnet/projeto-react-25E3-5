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
    }
}

export default Authentication;