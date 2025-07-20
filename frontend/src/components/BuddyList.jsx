import React, { useState } from "react";
import { useMessenger } from "../contexts/MessengerContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { 
  Search, 
  MessageCircle, 
  UserPlus, 
  Phone, 
  Video,
  MoreHorizontal,
  Zap
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const BuddyItem = ({ buddy }) => {
  const { openChat, nudgeBuddy } = useMessenger();

  const getStatusColor = (status) => {
    switch (status) {
      case "online": return "bg-green-500 shadow-green-500/50";
      case "away": return "bg-yellow-500 shadow-yellow-500/50";
      case "busy": return "bg-red-500 shadow-red-500/50";
      case "offline": return "bg-gray-500 shadow-gray-500/50";
      default: return "bg-gray-500";
    }
  };

  const getLastSeenText = (lastSeen, status) => {
    if (status === "online") return "Online now";
    return `Last seen ${formatDistanceToNow(lastSeen, { addSuffix: true })}`;
  };

  const handleDoubleClick = () => {
    openChat(buddy.id);
  };

  const handleNudge = () => {
    nudgeBuddy(buddy.id);
    openChat(buddy.id);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className="group flex items-center space-x-3 p-3 hover:bg-white/30 dark:hover:bg-black/30 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
          onDoubleClick={handleDoubleClick}
        >
          <div className="relative">
            <Avatar className="h-10 w-10 border-2 border-white/30 shadow-md">
              <AvatarImage src={buddy.avatar} alt={buddy.name} />
              <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold">
                {buddy.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(buddy.status)} border-2 border-white dark:border-gray-900 rounded-full shadow-lg`}></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 truncate">
                {buddy.name}
              </h4>
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    openChat(buddy.id);
                  }}
                >
                  <MessageCircle className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNudge();
                  }}
                >
                  <Zap className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate mt-1">
              {buddy.statusMessage}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {getLastSeenText(buddy.lastSeen, buddy.status)}
            </p>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50">
        <ContextMenuItem 
          onClick={() => openChat(buddy.id)}
          className="hover:bg-white/50 dark:hover:bg-black/50"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Send Message
        </ContextMenuItem>
        <ContextMenuItem 
          onClick={handleNudge}
          className="hover:bg-white/50 dark:hover:bg-black/50"
        >
          <Zap className="h-4 w-4 mr-2" />
          Send Nudge
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-white/20 dark:bg-gray-700/50" />
        <ContextMenuItem 
          disabled
          className="hover:bg-white/50 dark:hover:bg-black/50 opacity-50"
        >
          <Phone className="h-4 w-4 mr-2" />
          Call
        </ContextMenuItem>
        <ContextMenuItem 
          disabled
          className="hover:bg-white/50 dark:hover:bg-black/50 opacity-50"
        >
          <Video className="h-4 w-4 mr-2" />
          Video Call
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

const BuddyList = () => {
  const { buddies } = useMessenger();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBuddies = buddies.filter(buddy =>
    buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    buddy.statusMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedBuddies = filteredBuddies.reduce((groups, buddy) => {
    const status = buddy.status;
    if (!groups[status]) groups[status] = [];
    groups[status].push(buddy);
    return groups;
  }, {});

  const statusOrder = ["online", "away", "busy", "offline"];
  const statusLabels = {
    online: "Online",
    away: "Away", 
    busy: "Busy",
    offline: "Offline"
  };

  const getStatusCount = (status) => groupedBuddies[status]?.length || 0;

  return (
    <div className="flex flex-col h-full">
      {/* Search Header */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Contacts
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white/30 dark:hover:bg-black/30"
          >
            <UserPlus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/30 dark:bg-black/30 border-white/30 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 placeholder:text-gray-500 focus:border-purple-400 focus:ring-purple-400/50"
          />
        </div>

        {/* Status Summary */}
        <div className="flex flex-wrap gap-2">
          {statusOrder.map(status => {
            const count = getStatusCount(status);
            if (count === 0) return null;
            
            return (
              <Badge
                key={status}
                variant="secondary"
                className="text-xs bg-white/20 dark:bg-black/20 text-gray-700 dark:text-gray-300"
              >
                <div className={`w-2 h-2 ${
                  status === "online" ? "bg-green-500" :
                  status === "away" ? "bg-yellow-500" :
                  status === "busy" ? "bg-red-500" : "bg-gray-500"
                } rounded-full mr-1`}></div>
                {count} {statusLabels[status]}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Buddy List */}
      <ScrollArea className="flex-1">
        <div className="px-2 pb-4 space-y-1">
          {statusOrder.map(status => {
            const statusBuddies = groupedBuddies[status];
            if (!statusBuddies || statusBuddies.length === 0) return null;

            return (
              <div key={status} className="space-y-1">
                <div className="px-2 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider flex items-center space-x-2">
                  <div className={`w-2 h-2 ${
                    status === "online" ? "bg-green-500" :
                    status === "away" ? "bg-yellow-500" :
                    status === "busy" ? "bg-red-500" : "bg-gray-500"
                  } rounded-full`}></div>
                  <span>{statusLabels[status]} ({statusBuddies.length})</span>
                </div>
                
                {statusBuddies.map(buddy => (
                  <BuddyItem key={buddy.id} buddy={buddy} />
                ))}
              </div>
            );
          })}

          {filteredBuddies.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No contacts found</p>
              {searchQuery && (
                <p className="text-sm mt-1">Try a different search term</p>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default BuddyList;