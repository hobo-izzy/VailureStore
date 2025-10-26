
import React from 'react';
import { VailureLogo } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-zinc-400">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <VailureLogo className="h-8 w-8 text-white" />
              <span className="text-2xl font-black tracking-tighter text-white">VAILURE</span>
            </div>
            <p className="text-sm">Modern edge, unyielding style.</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">SHOP</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Men</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Women</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">SUPPORT</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">NEWSLETTER</h3>
            <p className="text-sm mb-4">Subscribe for the latest arrivals and exclusive offers.</p>
            <form className="flex">
              <input type="email" placeholder="Your Email" className="bg-zinc-800 border border-zinc-700 rounded-l-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-white" />
              <button type="submit" className="bg-white text-black px-4 rounded-r-md font-bold text-sm hover:bg-zinc-300 transition-colors">JOIN</button>
            </form>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} VAILURE. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
