import Component from '@ember/component';
import layout from '../../templates/components/task-solution/edit';
import { sort } from '@ember/object/computed';

export default Component.extend({
  layout,
  classNames: ['task-solution'],
  sorting: Object.freeze(['task.priority']),
  sortedTaskSolutionChilds: sort('taskSolutionChilds', 'sorting'),

  async didReceiveAttrs(){
    this._super(...arguments);
    this.set('taskSolutionChilds', await this.taskSolution.taskSolutionChilds);
  },

  actions:{
    async toggleStatus(){
      this.taskSolution.set('status', !this.taskSolution.status);
      await this.taskSolution.save();
    }
  }
});
