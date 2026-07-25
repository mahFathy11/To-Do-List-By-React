import React from 'react';
import './App.css';
import TaskPage from './TaskPage';
import TaskProvider from './context/taskContext'



function App (){


  return (
    < >
        <TaskProvider><TaskPage /></TaskProvider>
    </> 
  )
  
};
export default App