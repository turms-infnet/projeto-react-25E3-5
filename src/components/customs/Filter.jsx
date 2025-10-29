import { IconButton, Paper } from "@mui/material";
import Stack from "../default/Stack";
import TextField from "./TextField";
import SearchIcon from '@mui/icons-material/Search';

const Filter = (props) => {
    return (
        <Paper elevation={0} sx={{ p: 1.5, borderRadius: 3, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)' }}>
            <Stack direction="row" sx={{ position: 'relative' }}>
                <TextField 
                    label={props.label}
                    variant="outlined"
                    value={props.filter.title.value || ""}
                    onChange={(e) => props.doFilter(e.target.value)}
                    fullWidth
                />
                <SearchIcon sx={{ 
                    fontSize: '2.8em',
                    p: '10px',
                    position: 'absolute',
                    right: '.5em',
                    top: '50%',
                    marginTop: '-22px',
                }}/>
            </Stack>
        </Paper>
    )
}

export default Filter;