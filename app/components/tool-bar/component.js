import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  tools: [
    { name: '╳', type: 'delete', direction: [] },
    { name: '↖', type: 'arrow', direction: [-1, -1] },
    { name: '↗', type: 'arrow', direction: [1, -1] },
    { name: '↘', type: 'arrow', direction: [1, 1] },
    { name: '↙', type: 'arrow', direction: [-1, 1] },
    { name: '╱', type: 'edge', direction: [-1, 1] },
    { name: '╲', type: 'edge', direction: [1, 1] },
    { name: '⃞', type: 'vertex', direction: [] },
  ]
});
