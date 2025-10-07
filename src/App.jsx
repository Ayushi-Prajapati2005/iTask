import { useState, useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Navbar from './components/Navbar'
import {v4 as uuidv4} from 'uuid';

function App() {
  const [todo, settodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoStr=localStorage.getItem("todos");
    if(todoStr){
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const toggleShowFinished = (e) => {
    setShowFinished(!showFinished);
  }

  const handleEdit = (e,id) => {
    let t = todos.filter(i=>i.id===id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id
    });
   setTodos(newTodos);
   saveToLS();
  }
    const handleDelete = (e,id) => {
      let newTodos=todos.filter(item=>{
        return item.id !== id
      });
      setTodos(newTodos);
      saveToLS();
    }
    const handleAdd = () => {
      setTodos([...todos, {id:uuidv4(),todo,isCompleted:false}])
      settodo("")
      saveToLS()
    }
    const handleChange = (e) => {
      settodo(e.target.value)
    }
    const handleCheckbox = (e) => {
      let id= e.target.name;
      let index=todos.findIndex(item=>{
        return item.id===id;
      })
      let newTodos=[...todos];
      newTodos[index].isCompleted =  !newTodos[index].isCompleted;
      setTodos(newTodos);
      saveToLS();
    }

  return (
    <>
     <Navbar />
        <div className="container mx-auto my-4 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
          <h1 className='font-bold text-xl text-center'>iTask-Manage your todos at one place</h1>
          <div className="addTodo my-5 flex flex-col gap-3 ">
            <h2 className="text-lg font-bold">Add a Todo</h2>
            <input onChange={handleChange} value={todo} type="text" className='border border-gray-600 p-1 rounded-md w-full bg-white' />
            <button onClick={handleAdd} disabled={todo.length<=3} className='bg-fuchsia-900 
            disabled:bg-fuchsia-900 hover:bg-fuchsia-700 p-3 py-1 text-white rounded-md  font-bold cursor-pointer'>Save</button>

          </div>
          <input className='my-4' type="checkbox" name="" id="" checked={showFinished} onChange={toggleShowFinished} /> show finished todos
            <h2 className='text-lg font-bold'>Your Todos</h2>
            <div className="todos">
              {todos.length===0 && <div className='text-gray-500 my-4'>No Todos Added Yet</div>}
              {todos.map(item=>{
             return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex  justify-between my-3">
              <div className='flex gap-5'>
                <input type="checkbox" name={item.id} onChange={handleCheckbox} checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through text-gray-500" : ""} >{item.todo}</div>
              </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => {handleEdit(e,item.id)}} className='bg-fuchsia-900 hover:bg-fuchsia-700 p-3 py-1 text-white rounded-md mx-1 font-bold cursor-pointer'><FaEdit /></button>
                  <button onClick={(e) => {handleDelete(e,item.id)}} className='bg-fuchsia-900 hover:bg-fuchsia-700 p-3 py-1 text-white rounded-md mx-1 font-bold cursor-pointer'><AiFillDelete /></button>
                </div>
              </div>
            })}
          </div>
        </div>
    </>
  )
}

export default App
