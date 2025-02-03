import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    getTodos();
  }, []);

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    addTask();
  };

  const addTask = async () => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: input })
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async id => {
    console.log("update task", id);
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT"
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async id => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>To Do List</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          New Task:
          <input onChange={e => handleChange(e)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>
        <ul>
          {tasks.map(task => (
            <div key={task.id}>
              <li
                className={task.complete && "completed"}
                onClick={() => updateTask(task.id)}
              >
                {task.text}
              </li>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
