import Ember from 'ember';
import grid from 'ember-dag-generator/utils/grid';

export default Ember.Component.extend({
  tagName: '',

  line: Ember.computed('point.coordinates.[]', 'gap', 'margin', function() {
    let c = grid.adjust(this.get('point.coordinates'), this.get('gap'));
    let d = this.get('point.direction');
    let m = this.get('margin') / Math.sqrt(2);
    let g = this.get('gap');

    let area;

    if(d[0] === 1) {
      if(d[1] === -1) {
        area = [
          [c[0],       c[1]+1-m],
          [c[0]+1+g,   c[1]-g-m],
          [c[0]+1+g+m, c[1]-g],
          [c[0]+m,     c[1]+1]
        ];
      } else {
        area = [
          [c[0]+m,     c[1]],
          [c[0]+1+g+m, c[1]+1+g],
          [c[0]+1+g,   c[1]+1+g+m],
          [c[0],       c[1]+m]
        ];
      }
    } else {
      if(d[1] === -1) {
        area = [
          [c[0]+1,   c[1]+1-m],
          [c[0]+1-m, c[1]+1],
          [c[0]-g-m, c[1]-g],
          [c[0]-g,   c[1]-g-m]
        ];
      } else {
        area = [
          [c[0]+1-m, c[1]],
          [c[0]-g-m, c[1]+1+g],
          [c[0]-g,   c[1]+1+g+m],
          [c[0]+1,   c[1]+m]
        ];
      }
    }

    return area;
  })
});
