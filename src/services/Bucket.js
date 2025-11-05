import supabase from "./SupabaseClient";
import { decode } from 'base64-arraybuffer'

const Bucket = {
    generateNameFile: (name) => {
        return name.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // remove marcas diacríticas
            .replace(/[^a-zA-Z0-9-_\.]/g, '') // remove tudo que não for letra, número, hífen, underline ou ponto
            .replace(/\s+/g, '-') // substitui espaços por hífen
            .toLowerCase(); // deixa tudo minúsculo
    },
    upload: async (path, name, file) => {
        const finalPathAndFile = `${path}/${name}`

        const base64 = file.split('base64,')[1]
        const { data, error } = await supabase.storage.from('images').upload(finalPathAndFile, decode(base64), {
            contentType: 'image/png'
        });

        return data.path;
    },
    load: async (fullPath) => {
        const { data } = await supabase.storage.from('images').getPublicUrl(fullPath);
        return data.publicUrl;
    }
}

export default Bucket;