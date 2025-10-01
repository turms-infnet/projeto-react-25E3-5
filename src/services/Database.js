import supabase from "./SupabaseClient";

const list = async (table, filter, limit) => {
    const response = await supabase
        .from(table)
        .select("*");

    if (filter) {
        Object.keys(filter).forEach(key => {
            response.eq(key, filter[key]);
        });
    }

    return response.range(0, limit ? limit - 1 : 0);
}

const Database = {
    create: async (table, data) => {
        return await supabase
            .from(table)
            .insert([data])
            .select()
    },
    update: async (table, data, id) => {
        return await supabase
            .from(table)
            .update(data)
            .eq('id', id)
            .select()
    },
    delete: async (table, id) => {
        return await supabase
            .from(table)
            .delete()
            .eq('id', id);
    },
    list: list,
    find: async (table, id) => {
        const { data, error } = await list(table, { "id": id }, 1);
        if (error) {
            return null;
        }
        return data[0];
    },
}

export default Database;