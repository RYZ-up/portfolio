// Fallback values for the weather and activity cards.
export const weather = {
  temp: '22.6°C',
  condition: 'Overcast'
};

export const fitness = {
  steps: 50,
  // Ring colors are computed in ActivityCard from the current weekday
  // + hour, not stored here — only the fill percent is static data.
  rings: [{ percent: 18 }, { percent: 42 }, { percent: 92 }]
};
