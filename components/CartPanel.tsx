import React, { useEffect } from 'react';
import { CartItem } from '../types';
import { CloseIcon, TrashIcon } from './icons';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[998] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900 border-l border-zinc-700 shadow-2xl z-[999] flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
      >
        <header className="p-4 flex justify-between items-center border-b border-zinc-700 flex-shrink-0">
          <h2 id="cart-heading" className="font-bold text-lg text-white">Your Cart</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <CloseIcon className="h-6 w-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-400 animate-fade-in">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map(item => (
                <li key={item.id} className="flex items-center space-x-4 animate-fade-in-up">
                  <div className="w-20 h-20 bg-zinc-800 rounded-md overflow-hidden flex-shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-sm">{item.name}</h3>
                    <p className="text-zinc-400 text-sm">${item.price}</p>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center border border-zinc-700 rounded-md">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-zinc-300 hover:bg-zinc-700 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            const numValue = parseInt(value, 10);
                             // Allow values between 0-99. Empty string is treated as 0.
                            if (value === '' || (numValue >= 0 && numValue < 100)) {
                              const newQuantity = value === '' ? 0 : numValue;
                              onUpdateQuantity(item.id, newQuantity);
                            }
                          }}
                          className="w-10 bg-zinc-800 text-white text-center text-sm focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white/50 p-1 border-x border-zinc-700"
                          aria-label={`Quantity for ${item.name}`}
                        />
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-zinc-300 hover:bg-zinc-700 transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => onRemoveItem(item.id)} className="text-zinc-500 hover:text-red-500 transition-colors">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
            <footer className="p-4 border-t border-zinc-700 flex-shrink-0">
                <div className="flex justify-between items-center mb-4 text-zinc-300">
                    <span>Subtotal</span>
                    <span className="font-bold text-white text-lg">${subtotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-white text-black font-bold py-3 px-4 rounded-md text-sm hover:bg-zinc-200 transition-colors">
                    Checkout
                </button>
            </footer>
        )}
      </div>
    </>
  );
};

export default CartPanel;