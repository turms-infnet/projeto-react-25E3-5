import { IconButton } from "@mui/material";
import Stack from "../default/Stack";
import TextField from "./TextField";
import SearchIcon from '@mui/icons-material/Search';

const Filter = (props) => {
    return <Stack
                direction="row"
                sx={{
                    position: 'relative',
                }}
            >
                <TextField 
                    label={props.label}
                    variant="outlined"
                    value={props.filter.title.value || ""}
                    onChange={(e) => props.doFilter(e.target.value)}
                    fullWidth
                />
                <SearchIcon sx={{ 
                    p: '10px',
                    position: 'absolute',
                    right: '.5em',
                    top: '50%',
                    marginTop: '-22px',
                }}/>
            </Stack>
}

export default Filter;