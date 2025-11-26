import supabase from "./SupabaseClient";

const list = async (table, fields, filter, limit, page, orderBy) => {
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

    if (orderBy) {
        response = response.order(orderBy.field, { ascending: orderBy.ascending });
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
    upsert: async (table, data) => {
        return await supabase
            .from(table)
            .upsert(data)
            .select();
    },
    list: list,
    find: async (table, id) => {
        return await list(table, "*", {
            "id": {
                exact: true,
                value: id
            },
        }, 1);
    },
    findBy: async (table, filter) => {
        return await list(table, "*", filter, 1);
    },
}

export default Database;