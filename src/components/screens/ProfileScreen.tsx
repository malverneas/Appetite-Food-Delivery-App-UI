import React from 'react';
import { 
  ArrowLeft, 
  User, 
  Clock, 
  CreditCard, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import type { Screen, Mode } from '../../App';

interface ProfileScreenProps {
  mode: Mode;
  onNavigate: (screen: Screen) => void;
  onModeSwitch: (mode: Mode) => void;
}

export default function ProfileScreen({ mode, onNavigate, onModeSwitch }: ProfileScreenProps) {
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 px-6 pt-14 pb-8">
        <button
          onClick={() => onNavigate(mode === 'customer' ? 'customer-home' : 'biker-home')}
          className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* Profile Info */}
        <div className="flex items-center gap-4">
          <img
            src={mode === 'customer' 
              ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=Customer' 
              : 'https://api.dicebear.com/7.x/avataaars/svg?seed=Biker'
            }
            alt="Profile"
            className="w-20 h-20 rounded-full bg-white"
          />
          <div className="flex-1">
            <h2 className="text-white mb-1">
              {mode === 'customer' ? 'John Doe' : 'James Moyo'}
            </h2>
            <p className="text-green-100">
              {mode === 'customer' ? 'Customer' : 'Delivery Driver'}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Mode Switch */}
        <div className="bg-white rounded-2xl mb-4 overflow-hidden shadow-sm">
          <button
            onClick={() => onModeSwitch(mode === 'customer' ? 'biker' : 'customer')}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Switch Mode</p>
                <p className="text-gray-500">
                  Switch to {mode === 'customer' ? 'Biker' : 'Customer'} Mode
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-2xl mb-4 overflow-hidden shadow-sm">
          <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-900">My Profile</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-gray-900">Order History</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-gray-900">Payment Info</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Settings & Support */}
        <div className="bg-white rounded-2xl mb-4 overflow-hidden shadow-sm">
          <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-gray-900">Settings</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-gray-900">Help & Support</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Logout */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => onNavigate('login')}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-red-600">Log Out</span>
            </div>
            <ChevronRight className="w-5 h-5 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
