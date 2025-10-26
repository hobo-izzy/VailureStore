import React from 'react';
import { VailureLogo, SearchIcon, CartIcon, CloseIcon } from './icons';

interface HeaderProps {
  cartItemCount: number;
  onCartClick?: () => void;
  isSearchOpen: boolean;
  onToggleSearch: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  cartItemCount, 
  onCartClick,
  isSearchOpen,
  onToggleSearch,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex justify-between items-center h-20">
          <div className={`transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex items-center space-x-8">
              <a href="#" className="flex items-center space-x-2">
                <VailureLogo className="h-8 w-8 text-white" />
                <span className="text-2xl font-black tracking-tighter text-white">VAILURE</span>
              </a>
            </div>
          </div>
          
          <div className={`flex-1 flex justify-center items-center transition-all duration-300 ${isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {isSearchOpen && (
                 <div className="w-full max-w-lg">
                    <input
                        type="text"
                        placeholder="Search products by name or category..."
                        className="w-full bg-zinc-800 rounded-md px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        autoFocus
                    />
                 </div>
            )}
          </div>
          
          <div className={`md:flex items-center space-x-6 text-sm font-medium text-zinc-300 transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none hidden' : 'opacity-100'}`}>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-zinc-300">
              <a href="#" className="hover:text-white transition-colors">MEN</a>
              <a href="#" className="hover:text-white transition-colors">WOMEN</a>
              <a href="#" className="hover:text-white transition-colors">SALE</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={onToggleSearch} className="text-zinc-300 hover:text-white transition-colors">
              {isSearchOpen ? <CloseIcon className="h-6 w-6" /> : <SearchIcon className="h-6 w-6" />}
            </button>
            <button 
              onClick={onCartClick}
              className="relative text-zinc-300 hover:text-white transition-colors"
              aria-label={`View cart with ${cartItemCount} items`}
            >
              <CartIcon className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;