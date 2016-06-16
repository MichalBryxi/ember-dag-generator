import Ember from 'ember';
import grid from 'ember-dag-generator/utils/grid';

export default Ember.Component.extend({
  tagName: '',
  margin: 0.2,

  line: Ember.computed('point.[]', 'gap', 'margin', function() {
    let c = grid.adjust(this.get('point.coordinates'), this.get('gap'));
    let d = this.get('point.direction');
    let m = this.get('margin');
    let g = m / Math.sqrt(2);
    let area;

    if(d[1] === 1) {
      area = [
        [c[0], c[1]+g],
        [c[0]+1-g-m, c[1]+1-m],
        [c[0], c[1]+1-m],
        [c[0], c[1]+1],
        [c[0]+1, c[1]+1],
        [c[0]+1, c[1]],
        [c[0]+1-m, c[1]],
        [c[0]+1-m, c[1]+1-g-m],
        [c[0]+g, c[1]]
      ];
    } else {
      area = [
        [c[0]+g, c[1]+1],
        [c[0]+1-m, c[1]+m+g],
        [c[0]+1-m, c[1]+1],
        [c[0]+1, c[1]+1],
        [c[0]+1, c[1]],
        [c[0], c[1]],
        [c[0], c[1]+m],
        [c[0]+1-m-g, c[1]+m],
        [c[0], c[1]+1-g]
      ];
    }

    if(d[0] === -1) {
      area = area.map(function (elm) {
        return [2*c[0] + 1 - elm[0], elm[1]];
      });
    }

    return area;
  })
});
