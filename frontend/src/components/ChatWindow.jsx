import React, { useState, useRef, useEffect } from "react";
import { useMessenger } from "../contexts/MessengerContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog";
import { 
  X, 
  Minus, 
  MoreHorizontal, 
  Send, 
  Smile, 
  Paperclip,
  Phone,
  Video,
  Zap,
  Volume2,
  VolumeX
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { mockEmojis } from "../data/mockData";

const EmojiPicker = ({ onEmojiSelect }) => (
  <div className="grid grid-cols-8 gap-2 p-4 max-h-48 overflow-y-auto">
    {mockEmojis.map((emoji, index) => (
      <button
        key={index}
        onClick={() => onEmojiSelect(emoji)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-lg"
      >
        {emoji}
      </button>
    ))}
  </div>
);

const Message = ({ message, isOwn, buddy }) => {
  const getMessageTime = (timestamp) => {
    const now = new Date();
    const msgDate = new Date(timestamp);
    const diffInHours = (now - msgDate) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return format(msgDate, 'HH:mm');
    } else {
      return format(msgDate, 'MMM dd, HH:mm');
    }
  };

  if (message.type === "system") {
    return (
      <div className="flex justify-center my-2">
        <Badge variant="secondary" className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
          {message.content}
        </Badge>
      </div>
    );
  }

  return (
    <div className={`flex mb-3 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[70%] ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isOwn && (
          <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
            <AvatarImage src={buddy?.avatar} alt={buddy?.name} />
            <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white text-sm">
              {buddy?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        )}
        
        <div className={`space-y-1 ${isOwn ? 'mr-2' : ''}`}>
          <div className={`px-4 py-2 rounded-2xl shadow-sm ${
            isOwn 
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-br-md' 
              : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-md border border-gray-200 dark:border-gray-600'
          }`}>
            <p className="text-sm leading-relaxed break-words">
              {message.content}
            </p>
          </div>
          
          <div className={`text-xs text-gray-500 dark:text-gray-400 px-2 ${
            isOwn ? 'text-right' : 'text-left'
          }`}>
            {getMessageTime(message.timestamp)}
          </div>
        </div>
        
        {isOwn && (
          <Avatar className="h-8 w-8 ml-2 flex-shrink-0">
            <AvatarFallback className="bg-gradient-to-r from-green-400 to-teal-400 text-white text-sm">
              Y
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

const ChatWindow = ({ chatId, chat }) => {
  const { sendMessage, closeChat, minimizeChat, nudgeBuddy } = useMessenger();
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [chat.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(chatId, message.trim());
      setMessage("");
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(prev => prev + emoji);
    inputRef.current?.focus();
  };

  const handleNudge = () => {
    nudgeBuddy(chatId);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  if (chat.isMinimized) {
    return null;
  }

  return (
    <div className="flex flex-col h-full max-h-96 bg-white/40 dark:bg-black/20 backdrop-blur-xl rounded-lg border border-white/20 dark:border-gray-700/50 shadow-xl">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20 dark:border-gray-700/50 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="h-10 w-10 border-2 border-white/30 shadow-md">
              <AvatarImage src={chat.buddy.avatar} alt={chat.buddy.name} />
              <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold">
                {chat.buddy.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white dark:border-gray-900 rounded-full shadow-sm ${
              chat.buddy.status === "online" ? "bg-green-500" :
              chat.buddy.status === "away" ? "bg-yellow-500" :
              chat.buddy.status === "busy" ? "bg-red-500" : "bg-gray-500"
            }`}></div>
          </div>
          
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 truncate">
              {chat.buddy.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {chat.buddy.status === "online" ? "Online" : 
               `Last seen ${formatDistanceToNow(chat.buddy.lastSeen, { addSuffix: true })}`}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white/30 dark:hover:bg-black/30"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white/30 dark:hover:bg-black/30"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50">
              <DropdownMenuItem 
                onClick={handleNudge}
                className="hover:bg-white/50 dark:hover:bg-black/50"
              >
                <Zap className="h-4 w-4 mr-2" />
                Send Nudge
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/20 dark:bg-gray-700/50" />
              <DropdownMenuItem 
                disabled
                className="hover:bg-white/50 dark:hover:bg-black/50 opacity-50"
              >
                <Phone className="h-4 w-4 mr-2" />
                Voice Call
              </DropdownMenuItem>
              <DropdownMenuItem 
                disabled
                className="hover:bg-white/50 dark:hover:bg-black/50 opacity-50"
              >
                <Video className="h-4 w-4 mr-2" />
                Video Call
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white/30 dark:hover:bg-black/30"
            onClick={() => minimizeChat(chatId)}
          >
            <Minus className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={() => closeChat(chatId)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-2">
          {chat.messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center opacity-20">
                <Send className="h-8 w-8" />
              </div>
              <p className="text-sm">Start the conversation!</p>
              <p className="text-xs mt-1">Say hello to {chat.buddy.name}</p>
            </div>
          ) : (
            chat.messages.map((msg) => (
              <Message 
                key={msg.id} 
                message={msg} 
                isOwn={msg.sender === "You"} 
                buddy={chat.buddy}
              />
            ))
          )}
          
          {isTyping && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Avatar className="h-6 w-6">
                <AvatarImage src={chat.buddy.avatar} alt={chat.buddy.name} />
                <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white text-xs">
                  {chat.buddy.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-1">
                <span>{chat.buddy.name} is typing</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-white/20 dark:border-gray-700/50 bg-white/20 dark:bg-black/20 rounded-b-lg">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white/30 dark:hover:bg-black/30 flex-shrink-0"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50">
              <EmojiPicker onEmojiSelect={handleEmojiSelect} />
            </DialogContent>
          </Dialog>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled
            className="h-9 w-9 text-gray-400 opacity-50 flex-shrink-0"
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          <Input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${chat.buddy.name}...`}
            className="flex-1 bg-white/50 dark:bg-black/50 border-white/30 dark:border-gray-700/50 focus:border-purple-400 focus:ring-purple-400/50"
            maxLength={500}
          />

          <Button
            type="submit"
            disabled={!message.trim()}
            className="h-9 w-9 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:hover:scale-100 flex-shrink-0 p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          Press Enter to send • Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;