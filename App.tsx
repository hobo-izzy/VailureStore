import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import ProductFilters from './components/ProductFilters';
import AIAssistant from './components/AIAssistant';
import QuickViewModal from './components/QuickViewModal';
import CartPanel from './components/CartPanel';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const allCategories = ['All', ...new Set(PRODUCTS.map(p => p.category))];

  useEffect(() => {
    let tempProducts = PRODUCTS;

    // Filter by category
    if (activeCategory !== 'All') {
      tempProducts = tempProducts.filter(product => product.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const lowercasedQuery = searchQuery.toLowerCase();
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(lowercasedQuery) ||
        product.category.toLowerCase().includes(lowercasedQuery)
      );
    }

    setFilteredProducts(tempProducts);
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleOpenQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseQuickView = () => {
    setSelectedProduct(null);
  };
  
  const handleAddToCart = (productToAdd: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  const handleToggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    // Clear search query when closing the search bar
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };


  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <Header 
        cartItemCount={cartItemCount} 
        onCartClick={handleToggleCart}
        isSearchOpen={isSearchOpen}
        onToggleSearch={handleToggleSearch}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <main className="pt-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black tracking-tighter mb-2">COLLECTION</h1>
            <p className="text-zinc-400">Discover the new arrivals from VAILURE.</p>
          </div>
          <ProductFilters
            categories={allCategories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={handleOpenQuickView}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct} 
          onClose={handleCloseQuickView}
          onAddToCart={handleAddToCart}
        />
      )}
      <CartPanel 
        isOpen={isCartOpen}
        onClose={handleToggleCart}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
      />
      <AIAssistant />
    </div>
  );
};

export default App;