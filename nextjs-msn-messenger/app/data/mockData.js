export const mockBuddies = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    status: "online",
    statusMessage: "Working on some cool projects! 🚀",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b8f5?w=150&h=150&fit=crop&crop=face",
    lastSeen: new Date(),
  },
  {
    id: "2", 
    name: "Mike Rodriguez",
    email: "mike.rodriguez@email.com",
    status: "away",
    statusMessage: "Out for lunch, be back soon!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    lastSeen: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "3",
    name: "Emily Johnson", 
    email: "emily.j@email.com",
    status: "busy",
    statusMessage: "Do not disturb - in an important meeting",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    lastSeen: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@email.com", 
    status: "offline",
    statusMessage: "Gaming all night! 🎮",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "5",
    name: "Lisa Park",
    email: "lisa.park@email.com",
    status: "online",
    statusMessage: "Coffee and code ☕️",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    lastSeen: new Date(),
  },
  {
    id: "6",
    name: "Alex Thompson",
    email: "alex.t@email.com",
    status: "away", 
    statusMessage: "Walking the dog 🐕",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    lastSeen: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: "7",
    name: "Jessica Wu",
    email: "jessica.wu@email.com",
    status: "busy",
    statusMessage: "Studying for exams 📚",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
    lastSeen: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: "8",
    name: "Ryan Miller",
    email: "ryan.miller@email.com",
    status: "offline",
    statusMessage: "Catch you later! 👋",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    lastSeen: new Date(Date.now() - 4 * 60 * 60 * 1000),
  }
];

export const mockChats = {
  "1": [
    {
      id: "1",
      sender: "Sarah Chen",
      content: "Hey! How are you doing? 😊",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      type: "text"
    },
    {
      id: "2", 
      sender: "You",
      content: "Hi Sarah! I'm doing great, thanks for asking!",
      timestamp: new Date(Date.now() - 9 * 60 * 1000),
      type: "text"
    },
    {
      id: "3",
      sender: "Sarah Chen",
      content: "That's awesome! Working on anything interesting lately?",
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      type: "text"
    }
  ],
  "5": [
    {
      id: "1",
      sender: "Lisa Park",
      content: "Morning! Ready for another productive day? ☕️",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: "text"
    },
    {
      id: "2",
      sender: "You", 
      content: "Absolutely! Coffee first though 😄",
      timestamp: new Date(Date.now() - 29 * 60 * 1000),
      type: "text"
    }
  ]
};

export const mockEmojis = [
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
  "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
  "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸",
  "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️",
  "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡",
  "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓",
  "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄",
  "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵"
];