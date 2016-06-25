import { seedrandom } from 'ember-dag-generator/utils/seedrandom';

export function vertices(point, dice, edgeMaxSize, max, fade, lastDirection, arrowProbability, arrowFade, arrowMaxSize) {
  let newPoints = [];

  let directions = [
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 1]
  ];

  directions.forEach(function(direction) {
    if(!isBackwards(lastDirection, direction)) { // Do not go backwards
      let isEdge = seedrandom(0, 100) < dice;
      let isArrow = seedrandom(1, 100) < arrowProbability;
      let distance;
      let finalType;

      if(isEdge) { // First make sure to do edges
        distance = seedrandom(0, edgeMaxSize);
        isArrow = false;
        finalType = 'vertex';
      } else if(isArrow) {
        distance = seedrandom(0, arrowMaxSize);
        finalType = 'arrow';
      }

      if(isEdge || isArrow) {
        let finalPoint = movePoint(point, direction, distance + 1);
        if(isInside(finalPoint, max)) {
          if(isEdge) {
            let generated = vertices(finalPoint, dice - fade, distance, max, fade, direction, arrowProbability - arrowFade, arrowFade, arrowMaxSize);
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
