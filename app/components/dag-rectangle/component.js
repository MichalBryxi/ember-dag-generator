import Ember from 'ember';
import grid from 'ember-dag-generator/utils/grid';

export default Ember.Component.extend({
  tagName: '',
  padding: 0,

  positionWithGaps: Ember.computed('coordinates.[]', 'gap', function() {
    let c = grid.adjust(this.get('coordinates'), this.get('gap'));
    let p = this.get('padding');
    let area = [
      [c[0]+p, c[1]+p],
      [c[0]+p, c[1]+1-p],
      [c[0]+1-p, c[1]+1-p],
      [c[0]+1-p, c[1]+p]
    ];

    return area;
  })
});
