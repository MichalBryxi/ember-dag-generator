export function adjust(point, gap) {
  return [
    point[0] + point[0] * gap,
    point[1] + point[1] * gap
  ];
}

export function adjustArray(points, gap) {
  return points.map(function(point) {
    return adjust(point, gap);
  });
}

export default {
  adjust: adjust,
  adjustArray: adjustArray
}
