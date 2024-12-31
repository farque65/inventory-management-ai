import { Search, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
}

export function SearchBar({ onSearch, onFilter }: SearchBarProps) {
  return (
    <div className="flex gap-2 w-full max-w-2xl">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search for anything"
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
      <button
        onClick={onFilter}
        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2"
      >
        <SlidersHorizontal className="w-5 h-5" />
        <span>Filters</span>
      </button>
    </div>
  );
}