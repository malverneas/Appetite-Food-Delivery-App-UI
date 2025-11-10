import React, { useState, useEffect } from 'react';
import SplashScreen from './components/screens/SplashScreen';
import LoginScreen from './components/screens/LoginScreen';
import CustomerHomeScreen from './components/screens/CustomerHomeScreen';
import RestaurantMenuScreen from './components/screens/RestaurantMenuScreen';
import CartScreen from './components/screens/CartScreen';
import FindBikerScreen from './components/screens/FindBikerScreen';
import OrderTrackingScreen from './components/screens/OrderTrackingScreen';
import OrdersScreen from './components/screens/OrdersScreen';
import BikerHomeScreen from './components/screens/BikerHomeScreen';
import ActiveDeliveryScreen from './components/screens/ActiveDeliveryScreen';
import ChatScreen from './components/screens/ChatScreen';
import ProfileScreen from './components/screens/ProfileScreen';

export type Screen = 
  | 'splash'
  | 'login'
  | 'customer-home'
  | 'restaurant-menu'
  | 'cart'
  | 'find-biker'
  | 'order-tracking'
  | 'orders'
  | 'biker-home'
  | 'active-delivery'
  | 'chat'
  | 'profile';

export type Mode = 'customer' | 'biker';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  distance: string;
  category: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [mode, setMode] = useState<Mode>('customer');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [chatWith, setChatWith] = useState<{ name: string; image: string } | null>(null);

  useEffect(() => {
    // Auto navigate from splash to login after 2 seconds
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <LoginScreen onLogin={() => navigate(mode === 'customer' ? 'customer-home' : 'biker-home')} />;
      case 'customer-home':
        return (
          <CustomerHomeScreen 
            onNavigate={navigate}
            onRestaurantSelect={(restaurant) => {
              setSelectedRestaurant(restaurant);
              navigate('restaurant-menu');
            }}
          />
        );
      case 'restaurant-menu':
        return (
          <RestaurantMenuScreen 
            restaurant={selectedRestaurant}
            cart={cart}
            onNavigate={navigate}
            onAddToCart={addToCart}
          />
        );
      case 'cart':
        return (
          <CartScreen 
            cart={cart}
            onNavigate={navigate}
            onUpdateQuantity={updateCartQuantity}
          />
        );
      case 'find-biker':
        return <FindBikerScreen onNavigate={navigate} />;
      case 'order-tracking':
        return (
          <OrderTrackingScreen 
            onNavigate={navigate}
            onOpenChat={(biker) => {
              setChatWith(biker);
              navigate('chat');
            }}
          />
        );
      case 'orders':
        return (
          <OrdersScreen 
            onNavigate={navigate}
            onOrderSelect={(orderId) => {
              // Handle order selection
              console.log('Selected order:', orderId);
            }}
          />
        );
      case 'biker-home':
        return <BikerHomeScreen onNavigate={navigate} />;
      case 'active-delivery':
        return (
          <ActiveDeliveryScreen 
            onNavigate={navigate}
            onOpenChat={(customer) => {
              setChatWith(customer);
              navigate('chat');
            }}
          />
        );
      case 'chat':
        return (
          <ChatScreen 
            chatWith={chatWith}
            onNavigate={navigate}
          />
        );
      case 'profile':
        return (
          <ProfileScreen 
            mode={mode}
            onNavigate={navigate}
            onModeSwitch={(newMode) => {
              setMode(newMode);
              navigate(newMode === 'customer' ? 'customer-home' : 'biker-home');
            }}
          />
        );
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Mobile Frame */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-800">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-800 rounded-b-3xl z-50"></div>
        
        {/* Screen Content */}
        <div className="w-full h-full overflow-y-auto">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}