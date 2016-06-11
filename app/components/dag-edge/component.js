import Ember from 'ember';
import grid from 'ember-dag-generator/utils/grid';

export default Ember.Component.extend({
  tagName: '',
  padding: 0.2,

  line: Ember.computed('coordinates.[]', 'gap', 'padding', function() {
    let c = grid.adjustArray(this.get('coordinates'), this.get('gap'));
    let s = c[0];
    let f = c[1];

    if(s[0] > f[0]) {
      let tmp = f;
      f = s;
      s = tmp;
    }
    let p = this.get('padding');
    let area;

    if(s[1] > f[1]) {
      area = [
        [s[0]+1-p, s[1]],
        [s[0]+1,   s[1]+p],
        [f[0]+p,   f[1]+1],
        [f[0],     f[1]+1-p]
      ];
    } else {
      area = [
        [s[0]+1-p, s[1]+1],
        [s[0]+1,   s[1]+1-p],
        [f[0]+p,   f[1]],
        [f[0],     f[1]+p]
      ];
    }

    return area;
  })
});
