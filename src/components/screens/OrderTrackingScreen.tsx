import React, { useState } from 'react';
import { ArrowLeft, Phone, MessageCircle, CheckCircle, MapPin, Navigation } from 'lucide-react';
import { Button } from '../ui/button';
import type { Screen } from '../../App';
import BottomNav from '../common/BottomNav';

interface OrderTrackingScreenProps {
  onNavigate: (screen: Screen) => void;
  onOpenChat: (biker: { name: string; image: string }) => void;
}

export default function OrderTrackingScreen({ onNavigate, onOpenChat }: OrderTrackingScreenProps) {
  const [status, setStatus] = useState<'not-collected' | 'on-the-way' | 'arriving'>('not-collected');

  const biker = {
    name: 'James Moyo',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    bike: 'REG 7845 AP',
    rating: 4.9,
    distance: '2.5 km',
    eta: '12 min'
  };

  const statusText = {
    'not-collected': 'Food not collected yet',
    'on-the-way': 'On the way',
    'arriving': 'Arriving soon'
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-6 shadow-sm flex items-center gap-4 relative z-10">
        <button
          onClick={() => onNavigate('customer-home')}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
        <h2 className="text-gray-900">Track Order</h2>
      </div>

      {/* Map Preview */}
      <div className="relative h-80 bg-gradient-to-br from-green-100 to-blue-100">
        {/* Placeholder Map Background */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 400 300">
            <line x1="0" y1="100" x2="400" y2="100" stroke="#ccc" strokeWidth="1" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="#ccc" strokeWidth="1" />
            <line x1="100" y1="0" x2="100" y2="300" stroke="#ccc" strokeWidth="1" />
            <line x1="200" y1="0" x2="200" y2="300" stroke="#ccc" strokeWidth="1" />
            <line x1="300" y1="0" x2="300" y2="300" stroke="#ccc" strokeWidth="1" />
          </svg>
        </div>

        {/* Restaurant Pin */}
        <div className="absolute top-20 left-16 flex flex-col items-center">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div className="mt-2 bg-white px-3 py-1 rounded-full shadow-md">
            <span className="text-xs text-gray-700">Restaurant</span>
          </div>
        </div>

        {/* Route Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 80 100 Q 200 150, 320 220"
            stroke="#28A745"
            strokeWidth="3"
            strokeDasharray="10,5"
            fill="none"
          />
        </svg>

        {/* Biker Icon */}
        <div className="absolute top-44 right-20 flex flex-col items-center">
          <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-green-200">
            <Navigation className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Customer Pin */}
        <div className="absolute bottom-12 right-16 flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div className="mt-2 bg-white px-3 py-1 rounded-full shadow-md">
            <span className="text-xs text-gray-700">You</span>
          </div>
        </div>
      </div>

      {/* Bottom Modal */}
      <div className="flex-1 bg-white rounded-t-3xl -mt-6 shadow-2xl px-6 py-6 relative z-20">
        {/* Status Indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className={`px-6 py-2 rounded-full ${
            status === 'not-collected' ? 'bg-yellow-100 text-yellow-700' :
            status === 'on-the-way' ? 'bg-green-100 text-green-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {statusText[status]}
          </div>
        </div>

        {/* Biker Info */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={biker.avatar}
              alt={biker.name}
              className="w-16 h-16 rounded-full bg-white"
            />
            <div className="flex-1">
              <h4 className="text-gray-900 mb-1">{biker.name}</h4>
              <p className="text-gray-500">{biker.bike}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">ETA</p>
              <p className="text-green-600">{biker.eta}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => onOpenChat({ name: biker.name, image: biker.avatar })}
              className="flex-1 bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 rounded-xl h-12"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat
            </Button>
            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl h-12">
              <Phone className="w-5 h-5 mr-2" />
              Call
            </Button>
          </div>
        </div>

        {/* Order Details */}
        <div className="mb-6">
          <h4 className="text-gray-900 mb-3">Order Details</h4>
          <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-500">Pickup</p>
                <p className="text-gray-900">Pizza Palace</p>
              </div>
            </div>
            <div className="h-px bg-gray-200 my-2"></div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-500">Drop-off</p>
                <p className="text-gray-900">22 Borrowdale Road, Harare</p>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <Button 
          onClick={() => {
            onNavigate('customer-home');
          }}
          className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-xl mb-20"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          I've received my order
        </Button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="orders" onNavigate={onNavigate} />
    </div>
  );
}
