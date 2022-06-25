import React from 'react'
import TodoList from './TodoList';

export default function Task({ task, toggleTask }) {
  function handleTaskClick() {
    toggleTask(task.id);
  }

  return (
    <div>
        <label>
            <input type="checkbox" checked={task.complete} 
            onChange={handleTaskClick} />
            {task.name}
        </label>
    </div>
  );
}
