import React, { Component } from 'react';

import { Tasks } from '../api/tasks';

// task component - represents a single todo item in the list
export default class Task extends Component {
  toggleChecked() {
      // set the checked property to the opposite of its current value
      Tasks.update(this.props.task._id, {
        $set: { checked: !this.props.task.checked },
      });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  render() {
    // give tasks a different className when they are checked off
    // this allows us to use CSS to style them
    const taskClassName = this.props.task.checked ? 'checked' : '';
    
    console.log(this.props.task.username);

    return (
      <li className={taskClassName}>
        <button
          className="delete"
          onClick={this.deleteThisTask.bind(this)}
        >&times;</button>

        <input
          type="checkbox"
          readOnly
          checked={!!this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        <span className="text">
          <strong>{this.props.task.username}</strong>: {this.props.task.text}</span>
      </li>
    );
  }
}
