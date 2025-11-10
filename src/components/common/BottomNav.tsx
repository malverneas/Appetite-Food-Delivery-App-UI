import React from 'react';
import { Home, Clock, User } from 'lucide-react';
import type { Screen } from '../../App';

interface BottomNavProps {
  activeTab: 'home' | 'orders' | 'profile';
  onNavigate: (screen: Screen) => void;
}

export default function BottomNav({ activeTab, onNavigate }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 pb-8 shadow-lg">
      <div className="flex items-center justify-around">
        <button
          onClick={() => onNavigate('customer-home')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === 'home' ? 'text-green-600' : 'text-gray-400'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </button>

        <button
          onClick={() => onNavigate('orders')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === 'orders' ? 'text-green-600' : 'text-gray-400'
          }`}
        >
          <Clock className="w-6 h-6" />
          <span className="text-xs">Orders</span>
        </button>

        <button
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === 'profile' ? 'text-green-600' : 'text-gray-400'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
}