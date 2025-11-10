import React from 'react';
import { Package, Clock, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import BottomNav from '../common/BottomNav';
import type { Screen } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface OrdersScreenProps {
  onNavigate: (screen: Screen) => void;
  onOrderSelect: (orderId: string) => void;
}

interface Order {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  items: string[];
  total: number;
  status: 'completed' | 'in-progress' | 'cancelled';
  date: string;
  time: string;
}

const mockOrders: Order[] = [
  {
    id: 'o1',
    restaurantName: 'Pizza Palace',
    restaurantImage: 'https://images.unsplash.com/photo-1727198826083-6693684e4fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBpenphfGVufDF8fHx8MTc2MjgwMTM3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    items: ['Margherita Pizza', 'Caesar Salad', 'Iced Coffee'],
    total: 28.97,
    status: 'in-progress',
    date: 'Today',
    time: '10:30 AM'
  },
  {
    id: 'o2',
    restaurantName: 'Burger House',
    restaurantImage: 'https://images.unsplash.com/photo-1607013401178-f9c15ab575bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBtZWFsfGVufDF8fHx8MTc2MjcyNDczMnww&ixlib=rb-4.1.0&q=80&w=1080',
    items: ['Cheeseburger Deluxe', 'French Fries'],
    total: 15.98,
    status: 'completed',
    date: 'Yesterday',
    time: '6:45 PM'
  },
  {
    id: 'o3',
    restaurantName: 'Sushi Station',
    restaurantImage: 'https://images.unsplash.com/photo-1563612116891-9b03e4bb9318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGZvb2R8ZW58MXx8fHwxNzYyODAxMzc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    items: ['Sushi Platter', 'Miso Soup', 'Green Tea'],
    total: 32.50,
    status: 'completed',
    date: 'Nov 8',
    time: '1:20 PM'
  },
  {
    id: 'o4',
    restaurantName: 'Pasta Paradise',
    restaurantImage: 'https://images.unsplash.com/photo-1749169337822-d875fd6f4c9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGl0YWxpYW4lMjBmb29kfGVufDF8fHx8MTc2MjcyMTUxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    items: ['Carbonara Pasta'],
    total: 16.99,
    status: 'cancelled',
    date: 'Nov 7',
    time: '7:30 PM'
  },
  {
    id: 'o5',
    restaurantName: 'Pizza Palace',
    restaurantImage: 'https://images.unsplash.com/photo-1727198826083-6693684e4fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBpenphfGVufDF8fHx8MTc2MjgwMTM3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    items: ['Pepperoni Pizza', 'Garlic Bread', 'Coke'],
    total: 24.50,
    status: 'completed',
    date: 'Nov 5',
    time: '8:15 PM'
  }
];

export default function OrdersScreen({ onNavigate, onOrderSelect }: OrdersScreenProps) {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'cancelled':
        return 'Cancelled';
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-6 shadow-sm">
        <h2 className="text-gray-900">My Orders</h2>
        <p className="text-gray-500">Track and view your order history</p>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <button
              key={order.id}
              onClick={() => {
                if (order.status === 'in-progress') {
                  onOrderSelect(order.id);
                  onNavigate('order-tracking');
                }
              }}
              className={`w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all ${
                order.status === 'in-progress' ? 'ring-2 ring-green-500 ring-opacity-50' : ''
              }`}
            >
              <div className="p-4">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={order.restaurantImage}
                      alt={order.restaurantName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-gray-900 mb-1">{order.restaurantName}</h4>
                    <p className="text-gray-500 mb-2">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''} • ${order.total.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">{order.date}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-400">{order.time}</span>
                    </div>
                  </div>
                  {order.status === 'in-progress' && (
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </div>

                {/* Items Preview */}
                <div className="bg-gray-50 rounded-xl p-3 mb-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Package className="w-4 h-4 flex-shrink-0" />
                    <p className="line-clamp-1">{order.items.join(', ')}</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span>{getStatusText(order.status)}</span>
                  </div>
                  {order.status === 'in-progress' && (
                    <span className="text-green-600">Track Order →</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="orders" onNavigate={onNavigate} />
    </div>
  );
}
