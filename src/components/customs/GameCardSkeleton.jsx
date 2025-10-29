import React from 'react';
import { Card, CardContent } from '@mui/material';
import Skeleton from '../default/Skeleton';

const GameCardSkeleton = () => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Skeleton variant="rectangular" height={180} />
    <CardContent sx={{ flexGrow: 1 }}>
      <Skeleton variant="text" height={28} width="80%" />
      <Skeleton variant="text" height={20} width="60%" />
      <Skeleton variant="text" height={20} width="90%" />
    </CardContent>
  </Card>
);

export default GameCardSkeleton;
