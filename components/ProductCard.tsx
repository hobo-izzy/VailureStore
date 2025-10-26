import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  return (
    <div className="group">
      <div className="relative bg-zinc-800 rounded-lg overflow-hidden mb-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end p-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <div className="w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out space-y-2">
              <button
                  onClick={() => onQuickView(product)}
                  className="w-full bg-zinc-700/80 backdrop-blur-sm text-white font-bold py-3 px-4 rounded-md text-sm hover:bg-zinc-600/80 transition-colors"
              >
                  Quick View
              </button>
              <button
                  className="w-full bg-white text-black font-bold py-3 px-4 rounded-md text-sm hover:bg-zinc-200 transition-colors"
                  onClick={(e) => {
                  e.stopPropagation();
                  // In a real app, you'd dispatch an action to add to cart
                  console.log(`Added ${product.name} to cart`);
                  }}
              >
                  Add to Cart
              </button>
          </div>
        </div>
      </div>
      <h3 className="font-bold text-lg text-white">{product.name}</h3>
      <p className="text-zinc-400">${product.price}</p>
    </div>
  );
};

export default ProductCard;