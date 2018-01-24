import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Tasks } from '../api/tasks';

// task component - represents a single todo item in the list
export default class Task extends Component {
  toggleChecked() {
      // set the checked property to the opposite of its current value
      console.log(Meteor.user().username);
      Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked, Meteor.user().username);
  }

  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  togglePrivate() {
    Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private)
  }

  render() {
    // give tasks a different className when they are checked off
    // this allows us to use CSS to style them
    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private,
    });

    let userCheckOff = '';
    if (this.props.task.checked) {
      userCheckOff = `(✔${this.props.task.checkedBy})`;
      console.log(userCheckOff);
    }

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

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)} >
            {this.props.task.private ? 'Private' : 'Public'}
          </button>
        ) : ''}

        <span className="text">
          <strong>{this.props.task.username}</strong>: {this.props.task.text} {userCheckOff}</span>
      </li>
    );
  }
}
