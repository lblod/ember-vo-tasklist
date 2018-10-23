import Component from '@ember/component';
import layout from '../../templates/components/task-solution/edit';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  layout,
  classNames: ['task-solution'],
  sortedTaskSolutionChilds: computed('taskSolutionChilds', function(){
    if(!this.taskSolutionChilds)
      return [];
    return this.taskSolutionChilds.toArray().sort((a,b) => a.priority > b.priority);
  }),

  setChilds: task(function *(){
    this.set('taskSolutionChilds', yield this.taskSolution.taskSolutionChilds);
  }),

  async didReceiveAttrs(){
    this._super(...arguments);
    this.setChilds.perform();
  },

  actions:{
    async toggleStatus(){
      this.taskSolution.set('status', !this.taskSolution.status);
      await this.taskSolution.save();
    }
  }
});
