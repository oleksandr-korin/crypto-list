import React from 'react';
import { Coin } from '../types/Coin';
import { Card, CardContent, Typography, Grid, Checkbox } from '@mui/material';

interface CryptoCardProps {
  coin: Coin;
  isSelected: boolean;
  isHighlighted?: boolean;
  isPrice: boolean;
  toggleSelect: (id: string) => void;
}

export const CryptoCard: React.FC<CryptoCardProps> = ({ coin, isSelected, toggleSelect, isHighlighted, isPrice }) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    toggleSelect(coin.id);
  };

  return (
    <Card
      variant="outlined"
      style={{
        margin: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: isHighlighted ? '#f5f5f5' : '#fff'
      }}
      onClick={() => toggleSelect(coin.id)}
    >
      <CardContent style={{cursor: 'pointer'}}>
        <Grid container alignItems="center">
          <Grid item xs={1}>
            <Checkbox style={{pointerEvents: 'none'}}
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5" component="h2">
              {coin.name}
            </Typography>
            <Typography color="textSecondary">
              {coin.symbol.toUpperCase()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {isPrice ? (
              <Typography variant="body2" component="p" align="right" style={{ fontWeight: 'bold' }}>
                {coin.price ? '$' + coin.price : 'Fetching...'}
              </Typography>
            ) : null}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
