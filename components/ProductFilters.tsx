import React from 'react';

interface ProductFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="flex items-center space-x-2 md:space-x-4 flex-wrap justify-center">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 my-1 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-white ${
              activeCategory === category
                ? 'bg-white text-black shadow-lg'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
        {activeCategory !== 'All' && (
          <button
            onClick={() => onCategoryChange('All')}
            className="ml-2 md:ml-4 text-sm text-zinc-400 hover:text-white transition-colors flex items-center p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-white"
            aria-label="Clear filter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;