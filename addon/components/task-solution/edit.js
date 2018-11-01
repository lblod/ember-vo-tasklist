import Component from '@ember/component';
import layout from '../../templates/components/task-solution/edit';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';
import mapAsync from '../../utils/map-async';
import findAsync from '../../utils/find-async';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  classNames: ['task-solution'],
  store: service(),
  taskStatus: false,

  setChilds: task(function *(){
    let childs = (yield this.task.taskChilds).toArray();
    childs = childs.sort((a,b)=> a.priority - b.priority);
    this.set('sortedChilds', childs);
  }),

  setStatus: task( function *(){
    let taskSolution = yield findAsync((yield this.tasklistSolution.taskSolutions).toArray(),
                                       async sol => (await sol.task).get('id') == this.task.id);

    if(taskSolution){
      this.set('taskStatus', taskSolution.status);
    }
  }),

  didReceiveAttrs(){
    this._super(...arguments);
    if(this.task){
      this.setStatus.perform();
      this.setChilds.perform();
    }
  },

  async updateTaskSolutions(task, status){
    let taskSolution = await findAsync((await this.tasklistSolution.taskSolutions).toArray(),
                                       async sol => (await sol.task).get('id') == task.id);

    if(!taskSolution){
      taskSolution = this.store.createRecord('task-solution', { task, status });
      this.tasklistSolution.taskSolutions.pushObject(taskSolution);
      return;
    }

    taskSolution.set('status', status);
  },

  actions:{
    async toggleStatus(){
      await this.updateTaskSolutions(this.task, !this.taskStatus);
    }
  }
});
