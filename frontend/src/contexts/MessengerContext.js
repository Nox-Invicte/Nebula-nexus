import React, { createContext, useContext, useState } from "react";
import { mockBuddies, mockChats } from "../data/mockData";

const MessengerContext = createContext();

export const useMessenger = () => {
  const context = useContext(MessengerContext);
  if (!context) {
    throw new Error("useMessenger must be used within a MessengerProvider");
  }
  return context;
};

export const MessengerProvider = ({ children }) => {
  const [buddies, setBuddies] = useState(mockBuddies);
  const [activeChats, setActiveChats] = useState({});
  const [notifications, setNotifications] = useState([]);

  const sendMessage = (chatId, message) => {
    const newMessage = {
      id: Date.now().toString(),
      sender: "You",
      content: message,
      timestamp: new Date(),
      type: "text"
    };

    setActiveChats(prev => ({
      ...prev,
      [chatId]: {
        ...prev[chatId],
        messages: [...(prev[chatId]?.messages || []), newMessage]
      }
    }));

    // Mock response after 1-3 seconds
    setTimeout(() => {
      const buddy = buddies.find(b => b.id === chatId);
      if (buddy && buddy.status === "online") {
        const responses = [
          "Hey there! 😊",
          "What's up?",
          "Nice to hear from you!",
          "How's your day going?",
          "That's cool! 😎",
          "lol",
          "Totally agree!",
          "Let me think about that...",
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const responseMessage = {
          id: (Date.now() + 1).toString(),
          sender: buddy.name,
          content: randomResponse,
          timestamp: new Date(),
          type: "text"
        };

        setActiveChats(prev => ({
          ...prev,
          [chatId]: {
            ...prev[chatId],
            messages: [...(prev[chatId]?.messages || []), responseMessage]
          }
        }));
      }
    }, Math.random() * 2000 + 1000);
  };

  const openChat = (buddyId) => {
    const buddy = buddies.find(b => b.id === buddyId);
    if (buddy && !activeChats[buddyId]) {
      setActiveChats(prev => ({
        ...prev,
        [buddyId]: {
          buddy,
          messages: mockChats[buddyId] || [],
          isMinimized: false
        }
      }));
    }
  };

  const closeChat = (chatId) => {
    setActiveChats(prev => {
      const newChats = { ...prev };
      delete newChats[chatId];
      return newChats;
    });
  };

  const minimizeChat = (chatId) => {
    setActiveChats(prev => ({
      ...prev,
      [chatId]: {
        ...prev[chatId],
        isMinimized: !prev[chatId].isMinimized
      }
    }));
  };

  const nudgeBuddy = (buddyId) => {
    const buddy = buddies.find(b => b.id === buddyId);
    if (buddy) {
      const nudgeMessage = {
        id: Date.now().toString(),
        sender: "System",
        content: `You sent a nudge to ${buddy.name}! 👋`,
        timestamp: new Date(),
        type: "system"
      };

      setActiveChats(prev => ({
        ...prev,
        [buddyId]: {
          ...prev[buddyId],
          messages: [...(prev[buddyId]?.messages || []), nudgeMessage]
        }
      }));

      // Simulate nudge response
      setTimeout(() => {
        const responseMessage = {
          id: (Date.now() + 1).toString(),
          sender: buddy.name,
          content: "Why did you nudge me? 😅",
          timestamp: new Date(),
          type: "text"
        };

        setActiveChats(prev => ({
          ...prev,
          [buddyId]: {
            ...prev[buddyId],
            messages: [...(prev[buddyId]?.messages || []), responseMessage]
          }
        }));
      }, 1500);
    }
  };

  return (
    <MessengerContext.Provider value={{
      buddies,
      setBuddies,
      activeChats,
      setActiveChats,
      notifications,
      setNotifications,
      sendMessage,
      openChat,
      closeChat,
      minimizeChat,
      nudgeBuddy
    }}>
      {children}
    </MessengerContext.Provider>
  );
};