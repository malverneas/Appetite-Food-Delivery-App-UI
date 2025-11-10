import React from 'react';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import type { Screen, CartItem } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CartScreenProps {
  cart: CartItem[];
  onNavigate: (screen: Screen) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export default function CartScreen({ cart, onNavigate, onUpdateQuantity }: CartScreenProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-6 shadow-sm flex items-center gap-4">
        <button
          onClick={() => onNavigate('restaurant-menu')}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
        <h2 className="text-gray-900">Your Cart</h2>
      </div>

      {cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Trash2 className="w-16 h-16 text-gray-300" />
          </div>
          <p className="text-gray-500 mb-6 text-center">Your cart is empty</p>
          <Button
            onClick={() => onNavigate('customer-home')}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-8"
          >
            Browse Restaurants
          </Button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 shadow-sm flex gap-4"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">{item.name}</h4>
                    <p className="text-green-600 mb-3">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="text-gray-900 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center hover:bg-green-700"
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 0)}
                    className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center self-start hover:bg-red-100"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white px-6 py-6 shadow-lg rounded-t-3xl">
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="text-gray-900">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Total</span>
                <span className="text-green-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={() => onNavigate('find-biker')}
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-xl"
            >
              Find Biker
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
