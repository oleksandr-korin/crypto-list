import { configApi } from './configApi';

export const fetchCoinPrice = async (coinId: string) => {
  const url = configApi.coinDetails.replace('{coinId}', coinId);
  return await fetchData(url);
};

export const fetchCoinList = async () => {
  const localStorageData = localStorage.getItem('coinList');
  if (localStorageData) {
    return JSON.parse(localStorageData);
  }

  const data = await fetchData(configApi.coinsList);
  if (data) {
    localStorage.setItem('coinList', JSON.stringify(data));
  }
  return data;
};

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch data');
    }
  } catch (error) {
    console.error('There was an error fetching the data', error);
  }
};
