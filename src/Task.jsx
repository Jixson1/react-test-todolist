import React from 'react'
import TodoList from './TodoList';

export default function Task({ task }) {
  return (
    <div>
        <label>
            <input type="checkbox" checked={task.complete} />
            {task.name}
        </label>
    </div>
  );
}
