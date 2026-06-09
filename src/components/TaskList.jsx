import TaskItem from "./TaskItem";
//danh sách task
export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  return (
    <section className="mt-5 space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </section>
  );
}
