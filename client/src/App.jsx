import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [todos, setTodos] = useState([]);

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
        // Handle the data by updating the state
        console.log(data)
        setTodos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchTodos();
  }, []);   

  async function addTodo() {
    try{
        const response = await fetch("http://localhost:3000/api/todos2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task: "task",
            is_completed: false
          }),
        });
    
    // get response in json
        const data = await response.json();
    
    // setting data 
       } catch (error) {
    
    }
  }
   

  return (    
    <div>
    <h1 className="text-green-500 font-semibold text-2xl mt-4 mb-3">To-do List</h1>  
      <input type="text" name="task"/><button type="button" onClick={addTodo}>Add</button>
      <ul>      
        {todos.map((todo)=>(
          <li key={todo.id} ><input type="checkbox"/> {todo.task} <button type="button">Delete</button> </li>
        )) }
      </ul>
    </div>
  )
}

export default App

