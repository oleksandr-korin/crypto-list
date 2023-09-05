import React, { useEffect, useState } from 'react';
import { fetchCoinList, fetchCoinPrice } from '../services/cryptoApi';
import { CryptoCard } from './CryptoCard';
import { Coin } from '../types/Coin';
import SelectedCoinsList from './SelectedCoinsList';
import SearchComponent from './SearchComponent';
import { Divider } from '@mui/material';
import { loadSelectedCoins, saveSelectedCoins, updateSelectedCoins } from '../services/coinSelectionService';

const updateCoinPrices = (newPrices: { [id: string]: number }, existingCoins: Coin[]): Coin[] => {
  return existingCoins.map(coin => {
    if (newPrices[coin.id]) {
      return { ...coin, price: getPriceNumber(newPrices[coin.id]) };
    }
    return coin;
  });
};

function getPriceNumber(priceObject: any) {
  return priceObject.market_data.current_price.usd;
}

const CryptoListContainer: React.FC = () => {
  const VISIBLE_COINS_COUNT = 30;
  const [coinList, setCoinList] = useState<Coin[] | null>(null);
  const [selectedCoins, setSelectedCoins] = useState<string[]>(loadSelectedCoins());
  const [searchTerm, setSearchTerm] = useState<string>('');

  const selectedCoinObjects = coinList ? coinList.filter(coin => selectedCoins.includes(coin.id)) : [];
  const filteredCoinList = coinList ? coinList.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase())) : [];
  const visibleCoinList = filteredCoinList.filter(coin => !selectedCoins.includes(coin.id)).slice(0, VISIBLE_COINS_COUNT);

  useSaveSelectedCoins(selectedCoins);
  useFetchCoinList(setCoinList);
  useFetchCoinPrices(selectedCoinObjects, setCoinList);

/**
 * Save selected coins into persistent storage.
 * This hook listens to changes in the 'selectedCoins' array and saves the new state into persistent storage.
 *
 * @param {string[]} selectedCoins  List of selected coin IDs.
 * @return {void}
 */
  function useSaveSelectedCoins(selectedCoins: string[]) {
    useEffect(() => {
      saveSelectedCoins(selectedCoins);
    }, [selectedCoins]);
  }

  /**
   * Fetch the list of available coins and update the state.
   * This hook runs once when the component using it is mounted to fetch the list of coins.
   * @param {function} setCoinList State setter function for the list of coins.
   *
   * @return {void}
   */
  function useFetchCoinList(setCoinList: React.Dispatch<React.SetStateAction<Coin[] | null>>) {
    useEffect(() => {
      const fetchList = async () => {
        const list = await fetchCoinList();
        setCoinList(list);
      };
      fetchList();
    }, [setCoinList]);
  }

  /**
   * Fetch current prices for selected coins.
   * This hook listens to changes in the 'selectedCoinObjects' array and fetches the new prices, updating the state.
   *
   * @param {Coin[]} selectedCoinObjects List of selected coin objects.
   * @param {function} setCoinList State setter function for the list of coins.
   *
   * @return {void}
   */
  function useFetchCoinPrices(selectedCoinObjects: Coin[], setCoinList: React.Dispatch<React.SetStateAction<Coin[] | null>>) {
    useEffect(() => {
      const fetchPrices = async () => {
        const newPrices: { [key: string]: any } = {};
        for (const coin of selectedCoinObjects) {
          newPrices[coin.id] = await fetchCoinPrice(coin.id);
        }
        setCoinList(prevCoinList => prevCoinList ? updateCoinPrices(newPrices, prevCoinList) : null);
      };

      if (selectedCoinObjects.length > 0) {
        fetchPrices();
      }
    }, [selectedCoinObjects, setCoinList]);
  }

  /**
   * Toggle selection for a specific coin by its ID.
   * This function updates the state for selected coins either by adding or removing a coin ID.
   *
   * @param {string} id  The ID of the coin to be toggled.
   * @return {void}
   */
  function toggleSelect(id: string) {
    setSelectedCoins(prevState => updateSelectedCoins(prevState, id));
  }

  return (
    <div>
      <div style={{ padding: '30px', width: '100%' }}>
        <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <SelectedCoinsList selectedCoins={selectedCoinObjects} toggleSelect={toggleSelect} />
      <Divider />
      <h3>Please select your favorite coins below</h3>
      {visibleCoinList.length > 0 ? (
        visibleCoinList.map((coin: Coin) => (
          <CryptoCard
            key={coin.id}
            coin={coin}
            isPrice={false}
            isSelected={selectedCoins.includes(coin.id)}
            toggleSelect={toggleSelect}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CryptoListContainer;
