import * as React from 'react';
import TaskForm from './TaskForm';

export interface ITaskProps {
}

export default function Task (props: ITaskProps) {
  return (
    <div>
      <h1>Task</h1>
      <TaskForm />
    </div>
  );
}
