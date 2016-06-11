import Ember from 'ember';
import grid from 'ember-dag-generator/utils/grid';

export default Ember.Component.extend({
  tagName: '',
  padding: 0.2,

  line: Ember.computed('coordinates.[]', 'gap', 'padding', function() {
    let c = grid.adjustArray(this.get('coordinates'), this.get('gap'));
    let s = c[0];
    let f = c[1];
    let p = this.get('padding');
    let w = Math.sqrt(2*p*p);
    let area;


    if(s[1] < f[1]) {
      area = [
        [f[0], f[1]+p],
        [f[0]+1-p-w, f[1]+1-w],
        [f[0], f[1]+1-w],
        [f[0], f[1]+1],
        [f[0]+1, f[1]+1],
        [f[0]+1, f[1]],
        [f[0]+1-w, f[1]],
        [f[0]+1-w, f[1]+1-p-w],
        [f[0]+p, f[1]]
      ];
    } else {
      area = [
        [f[0]+p, f[1]+1],
        [f[0]+1-w, f[1]+w+p],
        [f[0]+1-w, f[1]+1],
        [f[0]+1, f[1]+1],
        [f[0]+1, f[1]],
        [f[0], f[1]],
        [f[0], f[1]+w],
        [f[0]+1-w-p, f[1]+w],
        [f[0], f[1]+1-p]
      ];
    }

    if(s[0] > f[0]) {
      area = area.map(function (elm) {
        return [2*f[0] + 1 - elm[0], elm[1]];
      });
    }

    return area;
  })
});
