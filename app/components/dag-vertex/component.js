import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  strokeGeometry: Ember.computed('coordinates.[]', function() {
    let coordinates = this.get('coordinates');
    let scale = 1;
    let x = coordinates[0] * scale;
    let y = coordinates[1] * scale;

    return [[x,y], [x+scale, y], [x+scale, y+scale], [x, y+scale]];
  }),

  innerGeometry: Ember.computed('coordinates.[]', function() {
    let coordinates = this.get('coordinates');
    let scale = 1;
    let shift = scale / 4;
    let x = coordinates[0] * scale;
    let y = coordinates[1] * scale;

    return [[x+shift,y+shift], [x+scale-shift, y+shift], [x+scale-shift, y+scale-shift], [x+shift, y+scale-shift]];
  })
});
