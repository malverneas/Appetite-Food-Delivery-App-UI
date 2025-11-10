import React, { useState } from 'react';
import { Search, MapPin, SlidersHorizontal, Star } from 'lucide-react';
import { Input } from '../ui/input';
import BottomNav from '../common/BottomNav';
import type { Screen, Restaurant } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CustomerHomeScreenProps {
  onNavigate: (screen: Screen) => void;
  onRestaurantSelect: (restaurant: Restaurant) => void;
}

const categories = ['Fast Food', 'Drinks', 'Desserts', 'Healthy', 'Asian', 'Italian'];

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pizza Palace',
    image: 'https://images.unsplash.com/photo-1727198826083-6693684e4fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBpenphfGVufDF8fHx8MTc2MjgwMTM3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    distance: '0.8 km',
    category: 'Fast Food'
  },
  {
    id: '2',
    name: 'Burger House',
    image: 'https://images.unsplash.com/photo-1607013401178-f9c15ab575bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBtZWFsfGVufDF8fHx8MTc2MjcyNDczMnww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    distance: '1.2 km',
    category: 'Fast Food'
  },
  {
    id: '3',
    name: 'Sushi Station',
    image: 'https://images.unsplash.com/photo-1563612116891-9b03e4bb9318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGZvb2R8ZW58MXx8fHwxNzYyODAxMzc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    distance: '2.1 km',
    category: 'Asian'
  },
  {
    id: '4',
    name: 'Pasta Paradise',
    image: 'https://images.unsplash.com/photo-1749169337822-d875fd6f4c9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGl0YWxpYW4lMjBmb29kfGVufDF8fHx8MTc2MjcyMTUxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    distance: '1.5 km',
    category: 'Italian'
  }
];

export default function CustomerHomeScreen({ onNavigate, onRestaurantSelect }: CustomerHomeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('Fast Food');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-green-600" />
          <div className="flex-1">
            <p className="text-gray-500">Delivering to</p>
            <p className="text-gray-900">22 Borrowdale Road, Harare</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search restaurants or meals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 rounded-xl border-gray-200 bg-gray-50"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-green-600 rounded-lg">
            <SlidersHorizontal className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 py-4 bg-white">
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Restaurants */}
      <div className="flex-1 overflow-y-auto px-6 py-4 pb-24">
        <div className="space-y-4">
          {mockRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-gray-900 mb-1">{restaurant.name}</h3>
                    <p className="text-gray-500">{restaurant.category}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-green-600 fill-green-600" />
                    <span className="text-green-600">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">{restaurant.distance} away</span>
                  <button
                    onClick={() => onRestaurantSelect(restaurant)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    View Menu
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="home" onNavigate={onNavigate} />
    </div>
  );
}
