import DatePicker from "../default/DatePicker";
import Stack from "../default/Stack";
import TextField from "./TextField";

const FormGame = ({ data, setData }) => {
    const onChange = (e) => {
        setData((values) => ({
            ...values,
            title: e.target
        }));
    }

    return (
        <form>
            <Stack mt={2}>
                <TextField
                    id="name"
                    name="title"
                    label="Nome do Jogo"
                    fullWidth
                    value={data.title}
                    onChange={onChange}/>
            </Stack>
            <Stack mt={2}>
                <TextField
                    id="description"
                    name="description"
                    label="Descrição"
                    multiline
                    rows={4}
                    fullWidth
                    value={data.description}
                    onChange={(e) => setData((values) => ({
                        ...values,
                        description: e.target.value
                    }))} />
            </Stack>
            <Stack mt={2}>
                <TextField
                id="image"
                name="image"
                type="file"
                fullWidth
                value={data.image}
                onChange={(e) => setData((values) => ({
                        ...values,
                        image: e.target.files[0]
                    }))} />
            </Stack>
            <Stack mt={2}>
                <DatePicker
                    id="release_date"
                    name="release_date"
                    label="Data de Lançamento"
                    value={data.release_date}
                    fullWidth
                    sx={{
                        width: '100%',
                    }}
                    onChange={(e) => setData((values) => ({
                        ...values,
                        release_date: e.target.files[0]
                    }))} />
            </Stack>
        </form>
    );
}   

export default FormGame;