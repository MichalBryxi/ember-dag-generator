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
    if(!isBackwards(lastDirection, direction)) { // Do not go backwards
      let isEdge = seedrandom(0, 100, seed + index + 1) < dice;
      let isArrow = seedrandom(1, 100, seed + index + 10) < arrowProbability;
      let distance;
      let finalType;

      if(isEdge) { // First make sure to do edges
        distance = seedrandom(0, edgeMaxSize, seed + index);
        isArrow = false;
        finalType = 'vertex';
      } else if(isArrow) {
        distance = seedrandom(0, arrowMaxSize, seed + index);
        finalType = 'arrow';
      }

      if(isEdge || isArrow) {
        let finalPoint = movePoint(point, direction, distance + 1);
        if(isInside(finalPoint, max)) {
          if(isEdge) {
            let generated = vertices(finalPoint, seed + 1234, dice - fade, distance, max, fade, direction, arrowProbability - arrowFade, arrowFade, arrowMaxSize);
            newPoints.pushObjects(generated);
          }

          let newPoint = point;
          for(var i = 0; i <= distance; i++) {
            newPoint = movePoint(point, direction, i);
            newPoints.push({coordinates: newPoint, type: 'edge', direction: direction});
          }

          newPoints.push({coordinates: finalPoint, type: finalType, direction: direction});
        }
      }
    }
  });

  return newPoints;
}

function isBackwards(last, current) {
  return last[0] === -current[0] && last[1] === -current[1];
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
