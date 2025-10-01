import supabase from "./SupabaseClient";

const list = async (table, fields, filter, limit, page) => {
    let response = supabase
        .from(table)
        .select(fields);

    if (filter) {
        Object.keys(filter).forEach(key => {
            if (filter[key].exact) {
                response = response.eq(key, filter[key].value);
            } else {
                response = response.ilike(key, `%${filter[key].value}%`);
            }
        });
    }

    if (limit) {
        response = response.limit(limit);
    }

    return await response;
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
        const { data, error } = await list(table, "*", { "id": id }, 1);
        if (error) {
            return null;
        }
        return data[0];
    },
}

export default Database;