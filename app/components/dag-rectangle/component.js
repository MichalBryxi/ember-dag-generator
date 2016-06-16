import Ember from 'ember';
import grid from 'ember-dag-generator/utils/grid';

export default Ember.Component.extend({
  tagName: 'g',
  margin: 0,

  positionWithMargins: Ember.computed('coordinates.[]', 'gap', function() {
    let c = grid.adjust(this.get('coordinates'), this.get('gap'));
    let p = this.get('margin');
    let area = [
      [c[0]+p, c[1]+p],
      [c[0]+p, c[1]+1-p],
      [c[0]+1-p, c[1]+1-p],
      [c[0]+1-p, c[1]+p]
    ];

    return area;
  })
});
