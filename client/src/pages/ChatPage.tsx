import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLocation } from 'wouter';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'trainer';
  timestamp: Date;
}

export default function ChatPage() {
  const [_, setLocation] = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'مرحباً، كيف يمكنني مساعدتك اليوم؟',
      sender: 'trainer',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    }]);
    setNewMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 h-screen flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">المحادثة مع المعالج</h1>
        <Button variant="outline" onClick={() => setLocation('/')}>
          العودة للرئيسية
        </Button>
      </div>

      <Card className="flex-1">
        <ScrollArea className="h-[calc(100vh-200px)] p-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>
                <Avatar>
                  <AvatarImage src={message.sender === 'trainer' ? '/trainer.jpg' : '/user.jpg'} />
                  <AvatarFallback>{message.sender === 'trainer' ? 'م' : 'أ'}</AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
        <CardContent className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              onKeyPress={e => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend}>إرسال</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
