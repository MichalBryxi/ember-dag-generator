import Ember from 'ember';

export default Ember.Component.extend({
  isSelected: Ember.computed('tool.direction', 'tool.type', 'selectedTool.direction', 'selectedTool.type', function() {
    let d1 = this.get('tool.direction');
    let d2 = this.get('selectedTool.direction');
    let t1 = this.get('tool.type');
    let t2 = this.get('selectedTool.type');

    let toolEquals = (t1 === t2);
    let directionEquals = (d1[0] === d2[0] && d1[1] === d2[1]);

    return toolEquals && directionEquals;
  }),

  actions: {
    toolSelected() {
      this.set('selectedTool', this.get('tool'));
    }
  }
});
