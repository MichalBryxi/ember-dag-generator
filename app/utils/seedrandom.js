import Ember from 'ember';

var currentSeed = 0;

export function seedrandom(min, max, seed) {
  if(Ember.typeOf(seed) !== 'undefined') {
    currentSeed = seed;
  }

  var x = Math.sin(currentSeed) * 10000;
  currentSeed++;
  return min + Math.floor((x - Math.floor(x)) * max);
}
