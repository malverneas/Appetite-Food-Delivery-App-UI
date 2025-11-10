import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import type { Screen } from '../../App';

interface ChatScreenProps {
  chatWith: { name: string; image: string } | null;
  onNavigate: (screen: Screen) => void;
}

interface Message {
  id: string;
  text: string;
  sent: boolean;
  time: string;
}

const mockMessages: Message[] = [
  {
    id: '1',
    text: "Hi! I'm on my way to pick up your order.",
    sent: false,
    time: '10:30 AM'
  },
  {
    id: '2',
    text: 'Great! How long do you think it will take?',
    sent: true,
    time: '10:31 AM'
  },
  {
    id: '3',
    text: 'About 10-15 minutes. Traffic is light today.',
    sent: false,
    time: '10:32 AM'
  },
  {
    id: '4',
    text: 'Perfect, thank you!',
    sent: true,
    time: '10:33 AM'
  }
];

export default function ChatScreen({ chatWith, onNavigate }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sent: true,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-6 shadow-sm flex items-center gap-4">
        <button
          onClick={() => window.history.back()}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
        <img
          src={chatWith?.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
          alt={chatWith?.name || 'User'}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <h3 className="text-gray-900">{chatWith?.name || 'User'}</h3>
          <p className="text-gray-500">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[75%] ${message.sent ? 'order-2' : 'order-1'}`}>
              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.sent
                    ? 'bg-green-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-900 rounded-bl-sm shadow-sm'
                }`}
              >
                <p>{message.text}</p>
              </div>
              <p
                className={`text-xs text-gray-400 mt-1 px-2 ${
                  message.sent ? 'text-right' : 'text-left'
                }`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white px-6 py-4 shadow-lg border-t border-gray-100">
        <div className="flex items-center gap-3">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 h-12 rounded-xl border-gray-200 bg-gray-50"
          />
          <Button
            onClick={handleSend}
            className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl flex-shrink-0 p-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
