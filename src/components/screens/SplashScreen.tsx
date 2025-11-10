import React from 'react';
import { UtensilsCrossed, Loader2 } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="h-full bg-white flex flex-col items-center justify-center px-8">
      {/* Logo */}
      <div className="mb-8 relative">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl">
          <UtensilsCrossed className="w-16 h-16 text-white" strokeWidth={2} />
        </div>
      </div>

      {/* App Name */}
      <h1 className="text-green-600 mb-2">Appetite</h1>
      
      {/* Tagline */}
      <p className="text-gray-500 text-center mb-12">
        Fast, Fresh, and Right to You.
      </p>

      {/* Loading Spinner */}
      <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
    </div>
  );
}
