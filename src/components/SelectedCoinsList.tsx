import React from 'react';
import { Coin } from '../types/Coin';
import { CryptoCard } from './CryptoCard';

interface SelectedCoinsListProps {
  selectedCoins: Coin[];
  toggleSelect: (id: string) => void;
}

const SelectedCoinsList: React.FC<SelectedCoinsListProps> = ({ selectedCoins, toggleSelect }) => {
  return (
    <div>
      {selectedCoins.length > 0 ? (
        <div>
          <h3>Coins selected:</h3>
          {selectedCoins.map((coin) => (
            <CryptoCard
              key={coin.id}
              coin={coin}
              isPrice={true}
              isSelected={true}
              toggleSelect={toggleSelect}
              isHighlighted={true}
            />
          ))}
        </div>
      ) : (
        <h3>Greetings! You have no selected coins.</h3>
      )}
    </div>
  );
};

export default SelectedCoinsList;
