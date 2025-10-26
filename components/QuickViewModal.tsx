import React, { useState } from 'react';
import { Product } from '../types';
import { CloseIcon } from './icons';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);
  
  // This effect handles closing the modal with the Escape key.
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleAddToCartClick = () => {
    if (isAdding) return;
    
    setIsAdding(true);
    onAddToCart(product);
    
    // Provide feedback for 1 second, then close the modal
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000] p-4 animate-fade-in-up"
      onClick={onClose}
      style={{ animationName: 'fadeInUp', animationDuration: '0.3s' }}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="relative bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-zinc-400 hover:text-white z-10"
          aria-label="Close quick view"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        <div className="md:w-1/2 h-64 md:h-auto bg-zinc-800">
            <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover" 
            />
        </div>

        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center overflow-y-auto">
            <h2 className="text-3xl font-black tracking-tighter text-white mb-2">{product.name}</h2>
            <p className="text-2xl text-zinc-400 mb-6">${product.price}</p>
            <p className="text-zinc-300 text-sm mb-8 leading-relaxed">
                Discover the essence of Vailure with the {product.name}. Crafted for the modern individual, this piece combines minimalist design with an edgy aesthetic. A versatile staple for any wardrobe.
            </p>
            <button
                className="w-full bg-white text-black font-bold py-3 px-4 rounded-md text-sm hover:bg-zinc-200 transition-colors mt-auto disabled:bg-zinc-300"
                onClick={handleAddToCartClick}
                disabled={isAdding}
            >
                {isAdding ? 'Added!' : 'Add to Cart'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;