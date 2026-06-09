import { Search } from "lucide-react";
//tìm kiếm và lọc
export default function TaskFilters({
  searchValue,
  filter,
  itemsLeft,
  onSearchChange,
  onFilterChange,
}) {
  return (
    <section className="mt-5 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex h-9 flex-1 items-center gap-3 rounded-lg bg-[#f1f1f3] px-4 min-w-[220px]">
          <Search size={17} className="text-gray-500" />
          <input
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search tasks..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Pending', 'Completed'].map((item) => (
            <button
              key={item}
              onClick={() => onFilterChange(item)}
              className={`h-9 rounded-lg px-4 text-sm font-semibold transition ${
                filter === item
                  ? 'bg-[#060617] text-white'
                  : 'bg-[#f1f1f3] text-gray-900'
              }`}
            >
              {item}
            </button>
          ))}

          <span className="ml-2 text-xs text-gray-500">{itemsLeft} items left</span>
        </div>
      </div>
    </section>
  );
}
