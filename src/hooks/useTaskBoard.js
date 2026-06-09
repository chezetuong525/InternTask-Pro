import { useEffect, useMemo, useState } from "react";
// Logic chính của ứng dụng, quản lý trạng thái và các thao tác với task
const STORAGE_KEY = "intern-task-board";
const DEFAULT_PRIORITY = "Medium";
const TOAST_DURATION = 2000;
// Hàm để tải các task đã lưu từ localStorage khi ứng dụng khởi động
const loadSavedTasks = () => {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

const formatDueDate = (value) => value || "No date";
// Hàm để tạo một task mới với các thuộc tính cần thiết
const createTask = (title, priority, dueDate) => ({
  id: Date.now(),
  title: title.trim(),
  priority,
  dueDate: formatDueDate(dueDate),
  completed: false,
});
// Hàm để cập nhật một task trong danh sách dựa trên id và các thay đổi được cung cấp
const updateTask = (tasks, id, changes) =>
  tasks.map((task) => (task.id === id ? { ...task, ...changes } : task));
// Hàm để lọc các task dựa trên giá trị tìm kiếm và bộ lọc trạng thái
const filterTasks = (tasks, searchValue, filter) => {
  const query = searchValue.toLowerCase();

  return tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(query);
    const matchesFilter =
      filter === "All" ||
      (filter === "Pending" && !task.completed) ||
      (filter === "Completed" && task.completed);

    return matchesSearch && matchesFilter;
  });
};
// Custom hook để quản lý trạng thái và logic của TaskBoard
export function useTaskBoard() {
  const [tasks, setTasks] = useState(loadSavedTasks);
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState(DEFAULT_PRIORITY);
  const [dueDate, setDueDate] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState({ message: "", visible: false });
// Lưu các task vào localStorage mỗi khi có sự thay đổi
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);
// Tự động ẩn thông báo sau một khoảng thời gian nhất định
  useEffect(() => {
    if (!toast.visible) return;

    const timer = window.setTimeout(() => {
      setToast({ message: "", visible: false });
    }, TOAST_DURATION);

    return () => window.clearTimeout(timer);
  }, [toast]);
// Tính toán lại danh sách task đã lọc mỗi khi có sự thay đổi về task, giá trị tìm kiếm hoặc bộ lọc
  const filteredTasks = useMemo(
    () => filterTasks(tasks, searchValue, filter),
    [filter, searchValue, tasks]
  );

  const itemsLeft = tasks.filter((task) => !task.completed).length;

  const showToast = (message) => setToast({ message, visible: true });
// Hàm để reset form thêm/sửa task về trạng thái mặc định
  const resetComposer = () => {
    setTaskName("");
    setDueDate("");
    setPriority(DEFAULT_PRIORITY);
    setEditingId(null);
  };
// Hàm để xử lý khi người dùng thêm một task mới hoặc cập nhật một task đã tồn tại
  const handleAddTask = () => {
    if (!taskName.trim()) {
      showToast("Please enter a task title first.");
      return;
    }

    if (editingId) {
      setTasks((prevTasks) =>
        updateTask(prevTasks, editingId, {
          title: taskName.trim(),
          priority,
          dueDate: formatDueDate(dueDate),
        })
      );
      showToast("Task updated successfully.");
      resetComposer();
      return;
    }

    setTasks((prevTasks) => [createTask(taskName, priority, dueDate), ...prevTasks]);
    resetComposer();
    showToast("Task added successfully.");
  };
// Hàm để chuyển đổi trạng thái hoàn thành của một task khi người dùng nhấn vào checkbox
  const toggleTask = (taskId) => {
    const currentTask = tasks.find((task) => task.id === taskId);

    setTasks((prevTasks) =>
      updateTask(prevTasks, taskId, { completed: !currentTask?.completed })
    );

    showToast(currentTask?.completed ? "Task marked as pending." : "Task completed.");
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    showToast("Task deleted.");
  };

  const editTask = (task) => {
    setEditingId(task.id);
    setTaskName(task.title);
    setPriority(task.priority);
    setDueDate(task.dueDate === "No date" ? "" : task.dueDate);
  };

  return {
    tasks,
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
  };
}
