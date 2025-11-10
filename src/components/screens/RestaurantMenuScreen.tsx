import React, { useState } from 'react';
import { ArrowLeft, Star, ShoppingCart, Search } from 'lucide-react';
import type { Screen, Restaurant, CartItem } from '../../App';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface RestaurantMenuScreenProps {
  restaurant: Restaurant | null;
  cart: CartItem[];
  onNavigate: (screen: Screen) => void;
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

const mockMenuItems = [
  {
    id: 'm1',
    name: 'Margherita Pizza',
    description: 'Classic tomato sauce, mozzarella, and basil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1727198826083-6693684e4fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBpenphfGVufDF8fHx8MTc2MjgwMTM3Nnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'm2',
    name: 'Cheeseburger Deluxe',
    description: 'Juicy beef patty, cheddar, lettuce, tomato',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1607013401178-f9c15ab575bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBtZWFsfGVufDF8fHx8MTc2MjcyNDczMnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'm3',
    name: 'Sushi Platter',
    description: 'Assorted nigiri and maki rolls',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1563612116891-9b03e4bb9318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGZvb2R8ZW58MXx8fHwxNzYyODAxMzc3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'm4',
    name: 'Caesar Salad',
    description: 'Fresh romaine, parmesan, croutons',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1651352650142-385087834d9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGhlYWx0aHklMjBmb29kfGVufDF8fHx8MTc2Mjc2MjU1M3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'm5',
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with ganache',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3NjI3Mzk3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'm6',
    name: 'Iced Coffee',
    description: 'Cold brew with vanilla syrup',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBkcmlua3xlbnwxfHx8fDE3NjI3NTQ4ODR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export default function RestaurantMenuScreen({ 
  restaurant, 
  cart, 
  onNavigate, 
  onAddToCart 
}: RestaurantMenuScreenProps) {
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMenuItems = mockMenuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Restaurant Banner */}
      <div className="relative h-56">
        <ImageWithFallback
          src={restaurant?.image || ''}
          alt={restaurant?.name || 'Restaurant'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Header Buttons */}
        <button
          onClick={() => onNavigate('customer-home')}
          className="absolute top-12 left-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>

        {cartItemCount > 0 && (
          <button
            onClick={() => onNavigate('cart')}
            className="absolute top-12 right-4 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
              {cartItemCount}
            </span>
          </button>
        )}

        {/* Restaurant Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-white mb-2">{restaurant?.name}</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white">{restaurant?.rating}</span>
            </div>
            <span className="text-white/90">{restaurant?.distance} away</span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <h3 className="text-gray-900 mb-4">Menu</h3>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 rounded-xl border-gray-200 bg-white"
          />
        </div>

        <div className="space-y-4">
          {filteredMenuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm flex gap-4 p-4"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <h4 className="text-gray-900 mb-1">{item.name}</h4>
                <p className="text-gray-500 mb-2 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-green-600">${item.price}</span>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}