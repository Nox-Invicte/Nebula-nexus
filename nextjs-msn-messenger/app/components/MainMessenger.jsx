'use client'

import React from "react";
import { useAuth } from "../contexts/AuthContext";
import BuddyList from "./BuddyList";
import ChatWindow from "./ChatWindow";
import UserProfile from "./UserProfile";
import { useMessenger } from "../contexts/MessengerContext";

const MainMessenger = () => {
  const { user } = useAuth();
  const { activeChats } = useMessenger();

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900 flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-60 h-60 bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Layout */}
      <div className="flex h-full w-full relative z-10">
        {/* Left Sidebar - Buddy List */}
        <div className="w-80 flex flex-col border-r border-white/20 dark:border-gray-700/50 backdrop-blur-xl bg-white/40 dark:bg-black/20">
          <UserProfile />
          <BuddyList />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col relative">
          {Object.keys(activeChats).length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-6 max-w-md mx-auto p-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center shadow-2xl">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    Welcome to MSN Reimagined!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Select a buddy from your list to start chatting, or see who&apos;s online and ready to talk.
                  </p>
                </div>
                <div className="flex justify-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Your friends are waiting</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
              {Object.entries(activeChats).map(([chatId, chat]) => (
                <ChatWindow key={chatId} chatId={chatId} chat={chat} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Minimized Chat Tabs */}
      <div className="absolute bottom-0 left-80 right-0 h-12 bg-white/20 dark:bg-black/20 backdrop-blur-xl border-t border-white/20 dark:border-gray-700/50 flex items-center space-x-2 px-4">
        {Object.entries(activeChats)
          .filter(([_, chat]) => chat.isMinimized)
          .map(([chatId, chat]) => (
            <button
              key={chatId}
              onClick={() => {}}
              className="px-4 py-2 bg-white/30 dark:bg-black/30 rounded-t-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-black/40 transition-colors flex items-center space-x-2 max-w-40"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="truncate">{chat.buddy.name}</span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default MainMessenger;