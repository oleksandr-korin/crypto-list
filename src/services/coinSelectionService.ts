// coinSelectionService.ts

export const loadSelectedCoins = (): string[] => {
  const savedCoins = localStorage.getItem('selectedCoins');
  return savedCoins ? JSON.parse(savedCoins) : [];
};

export const saveSelectedCoins = (selectedCoins: string[]) => {
  localStorage.setItem('selectedCoins', JSON.stringify(selectedCoins));
};

export const updateSelectedCoins = (selectedCoins: string[], coinId: string): string[] => {
  return selectedCoins.includes(coinId) ?
    selectedCoins.filter(id => id !== coinId) :
    [...selectedCoins, coinId];
};
