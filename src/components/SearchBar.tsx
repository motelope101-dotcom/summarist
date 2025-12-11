import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-2 bg-neutral-900 rounded px-3 py-2">
      <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400 flex-shrink-0" />
      <input
        type="text"
        placeholder="Search books..."
        className="bg-transparent text-white placeholder-neutral-500 flex-1 outline-none"
      />
    </div>
  );
}