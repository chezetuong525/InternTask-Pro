// Thông báo khi thêm/sửa/xóa task
export default function Toast({ message, visible }) {
  if (!visible || !message) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[320px] rounded-2xl border border-gray-200 bg-white p-3 shadow-2xl shadow-gray-900/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">Task update</p>
          <p className="mt-1 text-sm text-gray-600">{message}</p>
        </div>
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-gray-200">
        <div className="h-full w-full origin-left rounded-full bg-emerald-500 animate-toast-bar" />
      </div>
    </div>
  );
}
