import React from 'react';
import { Box, Typography } from '@mui/material';

const EmptyState = ({ title = 'Nenhum resultado', subtitle = 'Tente ajustar o filtro de busca.' }) => (
  <Box sx={{
    textAlign: 'center',
    py: 8,
    borderRadius: 2,
    border: '1px dashed rgba(255,255,255,.12)',
    background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.00))'
  }}>
    <Box sx={{ fontSize: 48, lineHeight: 1, mb: 1 }}>🎮</Box>
    <Typography variant="h6" gutterBottom>{title}</Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{subtitle}</Typography>
  </Box>
);

export default EmptyState;
