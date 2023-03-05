const getCurrency = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  const data = Object.keys(json);
  const filtered = data.filter((value) => value !== 'USDT');
  return filtered;
};

export default getCurrency;
