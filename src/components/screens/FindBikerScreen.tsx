import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import type { Screen } from '../../App';

interface FindBikerScreenProps {
  onNavigate: (screen: Screen) => void;
}

const mockBikers = [
  {
    id: 'b1',
    name: 'James Moyo',
    rating: 4.9,
    eta: '10-15 min',
    fee: 2.99,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James'
  },
  {
    id: 'b2',
    name: 'Sarah Ndlovu',
    rating: 4.8,
    eta: '12-18 min',
    fee: 2.49,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    id: 'b3',
    name: 'David Chikwanha',
    rating: 5.0,
    eta: '15-20 min',
    fee: 3.49,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
  }
];

export default function FindBikerScreen({ onNavigate }: FindBikerScreenProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-6 shadow-sm flex items-center gap-4">
        <button
          onClick={() => onNavigate('cart')}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
        <h2 className="text-gray-900">Find Biker</h2>
      </div>

      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-16 h-16 text-green-600" viewBox="0 0 24 24" fill="none">
                <path d="M5 18L9 12L13 16L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="5" cy="18" r="2" fill="currentColor"/>
                <circle cx="9" cy="12" r="2" fill="currentColor"/>
                <circle cx="13" cy="16" r="2" fill="currentColor"/>
                <circle cx="19" cy="8" r="2" fill="currentColor"/>
              </svg>
            </div>
            <div className="absolute inset-0 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="text-gray-900 mb-2">Finding nearby bikers...</h3>
          <p className="text-gray-500 text-center">
            We're searching for the best delivery drivers in your area
          </p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <p className="text-gray-500 mb-4">Available bikers near you</p>
            <div className="space-y-4">
              {mockBikers.map((biker) => (
                <div
                  key={biker.id}
                  className="bg-white rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={biker.avatar}
                      alt={biker.name}
                      className="w-16 h-16 rounded-full bg-gray-100"
                    />
                    <div className="flex-1">
                      <h4 className="text-gray-900 mb-1">{biker.name}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-gray-600">{biker.rating}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{biker.eta}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-gray-500">Delivery Fee</p>
                      <p className="text-green-600">${biker.fee}</p>
                    </div>
                    <Button
                      onClick={() => onNavigate('order-tracking')}
                      className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6"
                    >
                      Accept Biker
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
