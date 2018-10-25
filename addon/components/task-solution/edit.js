import Component from '@ember/component';
import layout from '../../templates/components/task-solution/edit';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';
import mapAsync from '../../utils/map-async';

export default Component.extend({
  layout,
  classNames: ['task-solution'],

  setChilds: task(function *(){
    let taskSolChilds = yield this.taskSolution.taskSolutionChilds;
    //load tasks
    yield mapAsync(taskSolChilds, (c) => c.task);
    this.set('sortedTaskSolutionChilds', taskSolChilds.toArray().sort((a,b) => a.get('task.priority') - b.get('task.priority')));
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
