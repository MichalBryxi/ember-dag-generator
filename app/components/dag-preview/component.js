import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  isArrow: Ember.computed.equal('tool.type', 'arrow'),
  isVertex: Ember.computed.equal('tool.type', 'vertex'),
  isEdge: Ember.computed.equal('tool.type', 'edge'),

  color: 'rgba(255, 64, 129, 0.5)',

  point: Ember.computed('coordinates.[]', 'tool.direction.[]', function() {
    return {
      coordinates: this.get('coordinates'),
      direction: this.get('tool.direction')
    };
  })
});
