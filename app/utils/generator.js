import { seedrandom } from 'ember-dag-generator/utils/seedrandom';

export function vertices(point, seed, dice, edgeMaxSize, max, fade, lastDirection, arrowProbability, arrowFade, arrowMaxSize) {
  let newPoints = [];

  let directions = [
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 1]
  ];

  directions.forEach(function(direction, index) {
    if(!(lastDirection[0] === -direction[0] && lastDirection[1] === -direction[1])) { // Do not go backwards
      let isEdge = seedrandom(0, 100, seed + index + 1) < dice;
      let isArrow = seedrandom(1, 100, seed + index + 10) < arrowProbability;
      let distance;

      if(isEdge) { // First make sure to do edges
        distance = seedrandom(1, edgeMaxSize, seed + index);
        isArrow = false;
      } else if(isArrow) {
        distance = seedrandom(1, arrowMaxSize, seed + index);
      }

      if(isEdge || isArrow) {
        let newPoint = movePoint(point, direction, distance);
        if(isInside(newPoint, max)) {
          if(isEdge) {
            let generated = vertices(newPoint, seed + 1234, dice - fade, distance, max, fade, direction, arrowProbability - arrowFade, arrowFade, arrowMaxSize);
            newPoints.pushObjects(generated);
          }

          newPoints.push({from: point, to: newPoint, isArrow: isArrow});
        }
      }
    }
  });

  return newPoints;
}

function movePoint(originalPoint, direction, distance) {
  return [originalPoint[0] + direction[0] * distance, originalPoint[1] + direction[1] * distance];
}

function isInside(point, max) {
  return (point[0] >= 0 && point[1] >= 0 && point[0] < max[0] && point[1] < max[1]);
}

export default {
  vertices: vertices
};
