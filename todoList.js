import { useState } from "react";
import "./styles.css";

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const hasTodos = todoList.length > 0;
  const [newTask, setNewTask] = useState("");
  const lastTodoId = todoList[todoList.length - 1]?.id || null;

  const listDeepClone = () => JSON.parse(JSON.stringify(todoList));

  const handleNewTask = () => {
    const newTodoList = listDeepClone();
    const newTaskId = lastTodoId ? lastTodoId + 1 : 1;

    newTodoList.push({ title: newTask, id: newTaskId });

    setTodoList(newTodoList);
    setNewTask("");
  };

  const deleteSelectedTask = (taskId) => {
    const newTodoList = listDeepClone();
    const filteredList = newTodoList.filter((todo) => todo.id !== taskId);
    setTodoList(filteredList);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Add your task"
          value={newTask}
          onChange={(event) => {
            setNewTask(event.target.value);
          }}
        />

        <div>
          <button disabled={!newTask} onClick={handleNewTask}>
            Submit
          </button>
        </div>
      </div>

      {hasTodos ? (
        <ul>
          {todoList.map((todo, index) => (
            <li key={`task-${index}`}>
              <span style={{ marginRight: "10px" }}>{todo.title}</span>
              <button onClick={() => deleteSelectedTask(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks on the list. Congratulations!</p>
      )}
    </div>
  );
}
