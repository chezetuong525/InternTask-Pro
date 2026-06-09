import { Calendar, Plus } from "lucide-react";
//form thêm/sửa task
export default function TaskComposer({
  taskName,
  priority,
  dueDate,
  isEditing,
  onTaskNameChange,
  onPriorityChange,
  onDueDateChange,
  onAddTask,
  onCancelEdit,
}) {
  return (
    <section className="mt-8 rounded-lg border border-gray-200 bg-white px-5 py-5 shadow-sm">
      <input
        value={taskName}
        onChange={(event) => onTaskNameChange(event.target.value)}
        placeholder="Add a new task..."
        className="h-[42px] w-full rounded-lg bg-[#f1f1f3] px-4 text-sm text-gray-700 outline-none placeholder:text-gray-400"
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <select
            value={priority}
            onChange={(event) => onPriorityChange(event.target.value)}
            className="h-9 rounded-lg bg-[#f1f1f3] px-4 text-sm text-gray-800 outline-none"
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <label className="flex h-9 items-center gap-2 rounded-lg bg-[#f1f1f3] px-3 text-sm font-medium text-gray-800">
            <Calendar size={16} />
            <span>Due Date</span>
            <input
              type="date"
              value={dueDate}
              onChange={(event) => onDueDateChange(event.target.value)}
              className="rounded-lg border border-transparent bg-transparent text-sm text-gray-700 outline-none"
              aria-label="Choose due date"
            />
          </label>
        </div>

        <div className="flex items-center gap-2">
          {isEditing && (
            <button
              onClick={onCancelEdit}
              className="h-9 rounded-lg bg-[#f1f1f3] px-4 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
            >
              Cancel
            </button>
          )}

          <button
            onClick={onAddTask}
            className="flex h-9 items-center gap-2 rounded-lg bg-[#060617] px-6 text-sm font-semibold text-white transition hover:bg-black"
          >
            <Plus size={17} />
            {isEditing ? "Save Task" : "Add Task"}
          </button>
        </div>
      </div>
    </section>
  );
}
