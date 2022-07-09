import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid'; // gen random keys for tasks

const LOCAL_STORAGE_KEY = 'todoApp.tasks'

function App() {
  const [tasks, setTasks] = useState([]);
  const taskNameRef = useRef()

  // grabbing stored tasks from local storage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // only set stored tasks if there are tasks in local storage
    if (storedTasks) setTasks(storedTasks);
  }, []);

  // saving tasks to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks]); // called when tasks changes

  function toggleTask(id) {
    // in React, never directly modify state variables, make a copy
    const newTasks = [...tasks];
    const task = newTasks.find(task => task.id === id);
    task.complete = !task.complete;
    setTasks(newTasks);
  }

  // when Add Tasks button is pressed
  function handleAddTask() {
    const name = taskNameRef.current.value
    if (name === '') return
    setTasks(prevTasks => {
      return [...prevTasks, { id: uuidv4(), name: name, complete: false }]
    })
    taskNameRef.current.value = null;
  }

  // clears tasks that are marked as complete
  function handleClearTasks() {
    const newTasks = tasks.filter(task => !task.complete);
    setTasks(newTasks);
  }

  function handleKeyPress(e) {
    const key = e.key;
    if (key === "Enter") {
      handleAddTask();
    }
  }

  // component function returns HTML
  return (
    <>
      <input ref={taskNameRef} type="text" onKeyDown={(e) => handleKeyPress(e)}/>
      <div>
        <button onClick={handleAddTask} style={{backgroundColor: 'green', color: 'white'}}>Add Tasks</button>
        <button onClick={handleClearTasks} style={{backgroundColor: 'darkred', color: 'white'}}>Clear Completed</button>
      </div>
      <div>{tasks.filter(task => !task.complete).length} Tasks Left</div>
      <TodoList tasks={tasks} toggleTask={toggleTask} />
    </>
  );
}

export default App;
