import { Check, X } from 'lucide-react';
import { ConditionRating, PriceRange } from '../types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export interface Filters {
  priceRange: PriceRange;
  conditions: ConditionRating[];
  minRating: number;
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'ending-soon';
}

const priceRanges: PriceRange[] = [
  { min: 0, max: 100, label: 'Under $100' },
  { min: 100, max: 500, label: '$100 - $500' },
  { min: 500, max: 1000, label: '$500 - $1,000' },
  { min: 1000, max: 5000, label: '$1,000 - $5,000' },
  { min: 5000, max: null, label: 'Over $5,000' },
];

const conditions: ConditionRating[] = ['mint', 'near_mint', 'excellent', 'good', 'fair', 'poor'];

const sortOptions = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'ending-soon', label: 'Ending Soon' },
];

export function FilterModal({ isOpen, onClose, filters, onFilterChange }: FilterModalProps) {
  if (!isOpen) return null;

  const handlePriceRangeChange = (range: PriceRange) => {
    onFilterChange({ ...filters, priceRange: range });
  };

  const handleConditionToggle = (condition: ConditionRating) => {
    const newConditions = filters.conditions.includes(condition)
      ? filters.conditions.filter(c => c !== condition)
      : [...filters.conditions, condition];
    onFilterChange({ ...filters, conditions: newConditions });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ ...filters, minRating: rating });
  };

  const handleSortChange = (sort: Filters['sortBy']) => {
    onFilterChange({ ...filters, sortBy: sort });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Filters</h2>

        <div className="space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Range</h3>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() => handlePriceRangeChange(range)}
                  className={`w-full px-4 py-2 rounded-lg flex items-center justify-between ${
                    filters.priceRange.label === range.label
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span>{range.label}</span>
                  {filters.priceRange.label === range.label && (
                    <Check className="w-5 h-5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Condition</h3>
            <div className="space-y-2">
              {conditions.map((condition) => (
                <button
                  key={condition}
                  onClick={() => handleConditionToggle(condition)}
                  className={`w-full px-4 py-2 rounded-lg flex items-center justify-between ${
                    filters.conditions.includes(condition)
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span>{condition}</span>
                  {filters.conditions.includes(condition) && (
                    <Check className="w-5 h-5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Minimum Rating</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`flex-1 py-2 rounded-lg ${
                    filters.minRating === rating
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {rating}★
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Sort By</h3>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value as Filters['sortBy'])}
                  className={`w-full px-4 py-2 rounded-lg flex items-center justify-between ${
                    filters.sortBy === option.value
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span>{option.label}</span>
                  {filters.sortBy === option.value && (
                    <Check className="w-5 h-5" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}