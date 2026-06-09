import { Calendar, Check, Edit2, GripVertical, Trash2 } from "lucide-react";
//từng task
const priorityStyles = {
  High: "bg-red-500 text-white",
  Medium: "bg-amber-400 text-white",
  Low: "bg-blue-500 text-white",
};

const priorityTextStyles = {
  High: "text-red-500",
  Medium: "text-red-500",
  Low: "text-gray-500",
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <div className="flex flex-wrap items-center rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm gap-3">
      <GripVertical size={18} className="text-gray-400" />

      <button
        onClick={() => onToggle(task.id)}
        className="flex h-[18px] w-[18px] items-center justify-center border border-gray-500 bg-white"
        aria-label="Toggle task completion"
      >
        {task.completed && <Check size={15} strokeWidth={3} />}
      </button>

      <p
        className={`flex-1 text-sm ${
          task.completed
            ? "text-gray-500 line-through decoration-gray-500"
            : "text-gray-800"
        }`}
      >
        {task.title}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>

        <div className={`flex items-center gap-1 text-xs ${priorityTextStyles[task.priority]}`}>
          <Calendar size={14} />
          <span>{task.dueDate}</span>
        </div>

        <button
          onClick={() => onEdit(task)}
          className="text-gray-500 hover:text-gray-800"
          aria-label="Edit task"
        >
          <Edit2 size={15} />
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-500 hover:text-red-500"
          aria-label="Delete task"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
