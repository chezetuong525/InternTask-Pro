import TaskComposer from "./TaskComposer";
import TaskFilters from "./TaskFilters";
import TaskList from "./TaskList";
import Toast from "./Toast";
import { useTaskBoard } from "../hooks/useTaskBoard";
//bảng chính của ứng dụng, kết hợp tất cả component lại với nhau
export default function TaskBoard() {
  const {
    taskName,
    priority,
    dueDate,
    searchValue,
    filter,
    editingId,
    filteredTasks,
    itemsLeft,
    toast,
    setTaskName,
    setPriority,
    setDueDate,
    setSearchValue,
    setFilter,
    handleAddTask,
    toggleTask,
    deleteTask,
    editTask,
    resetComposer,
  } = useTaskBoard();

  return (
    <>
      <TaskComposer
        taskName={taskName}
        priority={priority}
        dueDate={dueDate}
        isEditing={Boolean(editingId)}
        onTaskNameChange={setTaskName}
        onPriorityChange={setPriority}
        onDueDateChange={setDueDate}
        onAddTask={handleAddTask}
        onCancelEdit={resetComposer}
      />

      <TaskFilters
        searchValue={searchValue}
        filter={filter}
        itemsLeft={itemsLeft}
        onSearchChange={setSearchValue}
        onFilterChange={setFilter}
      />

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />

      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}
