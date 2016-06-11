export function seedrandom(min, max, seed) {
  var x = Math.sin(seed++) * 10000;
  return min + Math.floor((x - Math.floor(x)) * max);
}
