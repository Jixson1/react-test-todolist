import React, { useState, useRef } from 'react';
import TodoList from './TodoList';

function App() {
  const [tasks, setTasks] = useState([]);
  const taskNameRef = useRef()

  function handleAddTask(e) {
    const name = taskNameRef.current.value
    if (name === '') return
    taskNameRef.current.value = null;
  }

  return (
    <>
      <TodoList tasks={tasks} />
      <input ref={taskNameRef} type="text" />
      <button onClick={handleAddTask}>Add Tasks</button>
      <button>Clear Tasks</button>
      <div>0 Tasks Left</div>
    </>
  );
}

export default App;
