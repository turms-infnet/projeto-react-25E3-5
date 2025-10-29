import * as React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import Card from '../default/Card';
import CardHeader from '../default/CardHeader';
import CardMedia from '../default/CardMedia';
import CardContent from '../default/CardContent';
import CardActions from '../default/CardActions';
import Button from '../default/Button';

export default function CardGame({ game }) {
  const goToDetails = () => (window.location.href = '/game/' + game.id);

  return (
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
        <Button variant="contained" onClick={goToDetails} fullWidth>
          Ver detalhes
        </Button>
      </CardActions>
    </Card>
  );
}
