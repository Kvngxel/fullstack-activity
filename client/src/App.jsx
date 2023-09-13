import { useEffect, useRef, useState } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const taskRef = useRef();


  const [todos, setTodos] = useState([]);
  const [taskInputValue, setTaskInputValue] = useState("");
  //first use effect
  
  // useEffect(() => {
  //     const response = fetch("http://localhost:3000/api/todos").then()
  //   },[]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        // Make a fetch GET request to your API endpoint
        const response = await fetch("http://localhost:3000/api/todos");
        

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchTodos();
  }, []);   

  async function handleAddTodoSubmit(event) {
    event.preventDefault();
    try{
        const response = await fetch("http://localhost:3000/api/todos2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task: taskInputValue,
            is_completed: false
          }),
        });
        const data = await response.json()
      // setTodos((oldTodos) => ([...oldTodos, ...data]))
      setTodos((todos) => todos.concat(data));
       } catch (error) {
    
    }
  }

  return (    
    <div>
    <h1 className="text-green-500 font-semibold text-2xl mt-4 mb-3">To-do List</h1>  
      <form onSubmit={handleAddTodoSubmit}>
        <input className="border" type="text" name="task" value={taskInputValue}
        onChange={(event) =>
        {setTaskInputValue(event.target.value)}
          }/>        
          {/* <input type="text" ref={taskRef} name="task" /> */}
        <button type="submit">Add</button>
      </form>      
      <ul>      
        {todos.map((todo, i)=>(
          <li key={i} ><input type="checkbox"/> {todo.task} <button type="button">Delete</button> </li>
        )) }
      </ul>
    </div>
  )
}

export default App

