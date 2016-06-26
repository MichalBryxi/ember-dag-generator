import Ember from 'ember';

let DIRECTIONS = {
  '4': [-1,  1],
  '3': [-1, -1],
  '2': [ 1, -1],
  '1': [ 1,  1]
};

let TYPES = {
  'e': 'edge',
  'a': 'arrow',
  'v': 'vertex'
};

function encodeDict(word, dict) {
  let returnKey;

  // Blergh, very stupid. But works.
  for(var key in dict) {
    let val = dict[key];
    if(Ember.typeOf(val) === 'string') {
      if(val === word) {
        returnKey = key;
        break;
      }
    } else {
      if(val[0] === word[0] && val[1] === word[1]) {
        returnKey = key;
        break;
      }
    }
  }

  return returnKey;
}

function decodeDict(word, dict) {
  return dict[word];
}

function encode(data) {
  return data.map(function(cell) {
    let type = encodeDict(cell.type, TYPES);
    let coordinates = '' + cell.coordinates[0] + cell.coordinates[1];
    let direction = encodeDict(cell.direction, DIRECTIONS);

    let word = type + coordinates + direction;

    return word;
  }).join('');
}

function decode(url) {
  let chunks = url.match(new RegExp('.{1,4}', 'g'));

  if(Ember.typeOf(chunks) !== 'array') {
    return [];
  }

  return chunks.map(function(word) {
    let cell = {};
    cell.type = decodeDict(word.charAt(0), TYPES);
    cell.coordinates = [
      parseInt(word.charAt(1)),
      parseInt(word.charAt(2))
    ];
    cell.direction = decodeDict(word.charAt(3), DIRECTIONS);

    return cell;
  });
}

export default {
  encode,
  decode
};
