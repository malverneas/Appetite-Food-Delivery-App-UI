import React from 'react';
import { MapPin, Clock, DollarSign, Check, X } from 'lucide-react';
import { Button } from '../ui/button';
import type { Screen } from '../../App';

interface BikerHomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const mockRequests = [
  {
    id: 'r1',
    restaurant: 'Pizza Palace',
    restaurantAddress: '15 Sam Nujoma St',
    customerAddress: '22 Borrowdale Road, Harare',
    distance: '3.2 km',
    time: '15 min',
    payment: 12.50
  },
  {
    id: 'r2',
    restaurant: 'Burger House',
    restaurantAddress: '8 Nelson Mandela Ave',
    customerAddress: '45 Highlands, Harare',
    distance: '4.5 km',
    time: '20 min',
    payment: 15.00
  },
  {
    id: 'r3',
    restaurant: 'Sushi Station',
    restaurantAddress: '22 Julius Nyerere Way',
    customerAddress: '12 Avondale, Harare',
    distance: '2.8 km',
    time: '12 min',
    payment: 10.00
  }
];

export default function BikerHomeScreen({ onNavigate }: BikerHomeScreenProps) {
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 px-6 pt-14 pb-8 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white mb-1">Biker Mode</h2>
            <p className="text-green-100">Available delivery requests</p>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Biker"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
            <p className="text-white mb-1">Today</p>
            <p className="text-white">12</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
            <p className="text-white mb-1">Rating</p>
            <p className="text-white">4.9 ⭐</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
            <p className="text-white mb-1">Earned</p>
            <p className="text-white">$85</p>
          </div>
        </div>
      </div>

      {/* Requests */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <h3 className="text-gray-900 mb-4">New Requests</h3>
        <div className="space-y-4">
          {mockRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >
              {/* Pickup */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-500">Pickup</p>
                  <p className="text-gray-900">{request.restaurant}</p>
                  <p className="text-gray-500">{request.restaurantAddress}</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center mb-4">
                <div className="h-12 border-l-2 border-dashed border-gray-300"></div>
              </div>

              {/* Drop-off */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-500">Drop-off</p>
                  <p className="text-gray-900">{request.customerAddress}</p>
                </div>
              </div>

              {/* Info */}
              <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{request.distance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{request.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">${request.payment}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <X className="w-5 h-5 mr-2" />
                  Decline
                </Button>
                <Button
                  onClick={() => onNavigate('active-delivery')}
                  className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Accept
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
