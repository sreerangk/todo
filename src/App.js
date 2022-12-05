import {useState} from 'react';

import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm';
import ToDo from './components/ToDo.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';

function App() {
//TASK (todo list)state
const [toDo, setToDo] = useState([
  {id : 1, title : "Task 1", status: false},
  {id : 2, title : "Task 2", status: false}
])

//temp state
const [newTask, setNewTask] = useState('');
const [updateData, setUpdateData] = useState('');

//add task
const addTask = () => {
  if(newTask){
    let num = toDo.length + 1;
    let newEntry = { id: num, title: newTask, status:false}
    setToDo([...toDo, newEntry])
    setNewTask('');
  }
}

const deleteTask = (id) => {
  let newTasks = toDo.filter( task => task.id !== id)
  setToDo(newTasks);
}

//mark task as don or completed
const markDone = (id) => {
  const newTask = toDo.map( task => {
    if(task.id === id ){
      return ({ ...task, status: !task.status})
    }
    return task;
  })
  setToDo(newTask);
}


//cancel update
const cancelUpdate = () => {
  setUpdateData('');
}

//changeTask for update
const changeTask = (e) => {
  let newEntry = {
    id: updateData.id,
    title: e.target.value,
    status: updateData.status ? true : false

  }
  setUpdateData(newEntry);
}

//update task

const updateTask = () => {
  let filterRecords = [...toDo].filter( task => task.id !== updateData.id);
  let updatedObject = [...filterRecords, updateData]
  setToDo(updatedObject);
  setUpdateData('');

}



  return (
    <div className="container App">
    <br /><br />
    <h2>TO DO LIST APP</h2>
    
    
    {updateData && updateData ? (
      <UpdateForm 
      updateData={updateData}
      changeTask={changeTask}
      updateTask={updateTask}
      cancelUpdate={cancelUpdate}/>
      ) : (
          
      <AddTaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />
    )}

    {/* {display todos} */}

    {toDo && toDo.length ? '' : 'No Tasks...'}
    <ToDo 
      toDo={toDo}
      markDone={markDone}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
    />

    </div>
  );
}

export default App;
