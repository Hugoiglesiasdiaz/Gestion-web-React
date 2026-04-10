import type { FC, ChangeEvent } from 'react';
import { Loader2 } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searching: boolean;
  resultsCount: number;
  searchError: string | null;
}

export const SearchBar: FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  searching,
  resultsCount,
  searchError,
}) => {
  return (
    <div className="w-full relative group my-6">
      <div className="relative w-full">
        <label htmlFor="search-input" className="sr-only">
          Search products
        </label>
        <input
          id="search-input"
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search for a smartphone..."
          aria-label="Search for a smartphone"
          className="w-full bg-transparent border-t-0 border-x-0 border-b border-gray-200 py-6 text-2xl md:text-4xl font-thin placeholder:text-gray-300 focus:ring-0 focus:border-black outline-none rounded-none px-0"
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          {searching && (
            <Loader2 className="w-6 h-6 animate-spin text-gray-200" />
          )}
        </div>
      </div>

      {/* Results counter */}
      <div className="flex mt-4" aria-live="polite">
        <span className="text-xs text-black font-light uppercase tracking-widest">
          {resultsCount} RESULTS
        </span>
        {searchError && (
          <span
            className="text-red-500 text-xs animate-pulse ml-4"
            role="alert"
          >
            {searchError}
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
