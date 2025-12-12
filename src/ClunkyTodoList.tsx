import { ChangeEvent, useEffect, useMemo, useState } from "react";

export function ClunkyTodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Write code", completed: true },
    { id: 3, text: "Eat lunch", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [tasksToRender, setTasksToRender] = useState<any[]>([]);
  const [multiWordOnly, setMultiWordOnly] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleRemoveTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleRemoveCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([{ id: Date.now(), text: newTask, completed: false }, ...tasks]);
      setNewTask("");
    }
  };

  const handleToggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  useEffect(() => {
    let filteredTasks = tasks;

    if (filter === "completed") {
      filteredTasks = filteredTasks.filter((task) => task.completed);
    } else if (filter === "active") {
      filteredTasks = filteredTasks.filter((task) => !task.completed);
    }

    if (multiWordOnly) {
      filteredTasks = filteredTasks.filter(
        (task) => task.text.trim().split(/\s+/).length >= 2
      );
    }

    setTasksToRender(filteredTasks);
  }, [tasks, filter, multiWordOnly]);

  const totalCount = useMemo(() => {
    return tasks.length;
  }, [tasks]);

  return (
    <div>
      <h1>To-Do List</h1>
      <h2>Items: {totalCount}</h2>

      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Add new task"
      />

      <button onClick={handleAddTask}>Add</button>

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <label>
        <input
          type="checkbox"
          checked={multiWordOnly}
          onChange={(e) => setMultiWordOnly(e.target.checked)}
        />
        Show only 2+ words
      </label>

      <button onClick={handleRemoveCompleted}>Remove Completed</button>

      <ul>
        {tasksToRender.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleRemoveTask(task.id);
              }}
            >
              [x]
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
