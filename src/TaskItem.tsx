interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export function TaskItem({ task, onToggle, onRemove }: TaskItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
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
          onRemove(task.id);
        }}
      >
        [x]
      </a>
    </li>
  );
}
