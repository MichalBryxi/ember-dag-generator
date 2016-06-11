import Ember from 'ember';
import grid from 'ember-dag-generator/utils/grid';

export default Ember.Component.extend({
  tagName: '',

  positionWithGaps: Ember.computed('coordinates.[]', 'gap', function() {
    let c = grid.adjust(this.get('coordinates'), this.get('gap'));
    let area = [
      c,
      [c[0], c[1]+1],
      [c[0]+1, c[1]+1],
      [c[0]+1, c[1]]
    ];
    let gap = this.get('gap');

    return area;
  })
});
