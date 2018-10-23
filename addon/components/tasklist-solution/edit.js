import Component from '@ember/component';
import layout from '../../templates/components/tasklist-solution/edit';
import { inject as service } from '@ember/service';
import findAsync from '../../utils/find-async';
import flattenAsync from '../../utils/flatten-async';
import mapAsync from '../../utils/map-async';
import { sort } from '@ember/object/computed';
import { task } from 'ember-concurrency';

export default Component.extend({
  layout,
  classNames: ['tasklist-solution'],
  store: service(),
  sorting: Object.freeze(['task.priority']),
  sortedTaskSolutions: sort('taskSolutions', 'sorting'),

  async generateTaskSolutionTree(taskSolutions, task, taskSolutionParent = null){
    let taskSolution = await this.findOrCreateTaskSolution(task, taskSolutions);
    if(taskSolutionParent){
      taskSolution.set('taskSolutionParent', taskSolutionParent);
      await taskSolution.save();
    }

    let taskChilds = await task.taskChilds;
    await mapAsync(taskChilds, async child => this.generateTaskSolutionTree(taskSolutions, child, taskSolution));
    return taskSolutionParent || taskSolution;
  },

  async findOrCreateTaskSolution(task, taskSolutions){
    let taskSolution = await findAsync(taskSolutions, async sol => (await sol.task).get('id') == task.id);

    if(!taskSolution){
        taskSolution = this.store.createRecord('task-solution', { task });
        await taskSolution.save();
    }
    return taskSolution;
  },

  setTaskSolutions: task(function *(){
    let tasklist = yield this.tasklistSolution.tasklist;
    let topLevelTasks = yield tasklist.tasks; //TODO: it seems we cannot fetch nested stuff async??
    let taskSolutions = yield flattenAsync((yield this.tasklistSolution.get('taskSolutions')).toArray() || [],
                                                async node => (await node.get('taskSolutionChilds')).toArray());

    let updatedTaskSolutions = yield mapAsync(topLevelTasks, async task => this.generateTaskSolutionTree(taskSolutions, task));

    this.tasklistSolution.taskSolutions.setObjects(updatedTaskSolutions);
    yield this.tasklistSolution.save();
    this.set('taskSolutions', this.tasklistSolution.taskSolutions);
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    this.setTaskSolutions.perform();
    //TODO: remove unused task-solution
  }
});
