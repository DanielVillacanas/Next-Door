export let calcDistance = (coordinates1, coordinates2) => {
  const R = 6371e3;
  const φ1 = (coordinates1[1] * Math.PI) / 180;
  const φ2 = (coordinates2[1] * Math.PI) / 180;
  const Δφ = ((coordinates2[1] - coordinates1[1]) * Math.PI) / 180;
  const Δλ = ((coordinates2[0] - coordinates1[0]) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = (R * c) / 1000;

  return d;
};
