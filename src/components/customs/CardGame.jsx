import { Box, Chip, Typography } from '@mui/material';
import Card from '../default/Card';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CardMedia from '../default/CardMedia';
import CardContent from '../default/CardContent';
import CardActions from '../default/CardActions';
import Button from '../default/Button';
import Fab from '../default/Fab';
import Stack from '../default/Stack';
import { useNavigate } from 'react-router-dom';

export default function CardGame({ game }) {
  const navigate = useNavigate();
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user : null;

  return <Stack sx={{
            position: 'relative',
          }}>
          { 
            user && user.role === 1 ? 
                <>
                  <Fab size="small" color="secondary" aria-label="edit" sx={{
                    position: 'absolute',
                    left: '-20px',
                    top: '-20px',
                  }}>
                    <EditIcon />
                  </Fab>
                  <Fab size="small" color="error" aria-label="edit" sx={{
                    position: 'absolute',
                    left: '-20px',
                    top: '40px',
                  }}>
                    <DeleteIcon />
                  </Fab>
                </>  : null
          }
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              transition: 'transform .2s ease, box-shadow .2s ease',
              '&:hover': { transform: 'translateY(-4px)' },
            }}
          >
            <Box sx={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
              <CardMedia
                component="img"
                image={game.image}
                alt={game.title}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {game.release_date && (
                <Chip
                  size="small"
                  label={new Date(game.release_date).getFullYear()}
                  color="secondary"
                  sx={{ position: 'absolute', top: 12, left: 12, fontWeight: 700 }}
                />
              )}
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom noWrap>
                {game.title}
              </Typography>
              {game.description && (
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                >
                  {game.description}
                </Typography>
              )}
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2 }}>
              <Button variant="contained" onClick={() => {
                navigate(`/game/${game.id}`);
              }} fullWidth>
                Ver detalhes
              </Button>
            </CardActions>
          </Card>
        </Stack>;
}
