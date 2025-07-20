import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { 
  Settings, 
  LogOut, 
  Edit3, 
  Sun, 
  Moon, 
  Circle, 
  Clock, 
  Minus,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StatusButton = ({ status, icon: Icon, label, isActive, onClick }) => (
  <Button
    variant={isActive ? "default" : "ghost"}
    size="sm"
    onClick={onClick}
    className={`justify-start w-full ${
      isActive 
        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" 
        : "text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-black/30"
    }`}
  >
    <Icon className="h-4 w-4 mr-2" />
    {label}
  </Button>
);

const UserProfile = () => {
  const { user, logout, updateUserStatus } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newStatusMessage, setNewStatusMessage] = useState(user?.statusMessage || "");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleStatusChange = (status) => {
    updateUserStatus(status, user.statusMessage);
  };

  const handleStatusMessageUpdate = () => {
    updateUserStatus(user.status, newStatusMessage);
    setIsEditingStatus(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500"; 
      case "busy": return "bg-red-500";
      case "offline": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "online": return "Online";
      case "away": return "Away";
      case "busy": return "Busy";
      case "offline": return "Offline";
      default: return "Unknown";
    }
  };

  return (
    <div className="p-4 border-b border-white/20 dark:border-gray-700/50 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-4">
        <div className="relative">
          <Avatar className="h-12 w-12 border-2 border-white/30 shadow-lg">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(user?.status)} border-2 border-white dark:border-gray-900 rounded-full shadow-sm`}></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 truncate">
            {user?.name}
          </h3>
          <Badge variant="secondary" className="text-xs bg-white/30 dark:bg-black/30 text-gray-700 dark:text-gray-300">
            {getStatusLabel(user?.status)}
          </Badge>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/30 dark:hover:bg-black/30">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50">
            <DropdownMenuItem 
              onClick={toggleTheme}
              className="hover:bg-white/50 dark:hover:bg-black/50"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 mr-2" />
              ) : (
                <Moon className="h-4 w-4 mr-2" />
              )}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/20 dark:bg-gray-700/50" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Status Message */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          {isEditingStatus ? (
            <div className="flex-1 flex items-center space-x-2">
              <Input
                value={newStatusMessage}
                onChange={(e) => setNewStatusMessage(e.target.value)}
                placeholder="What's on your mind?"
                className="flex-1 bg-white/30 dark:bg-black/30 border-white/30 dark:border-gray-700/50 text-sm"
                maxLength={100}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleStatusMessageUpdate();
                  if (e.key === "Escape") setIsEditingStatus(false);
                }}
                autoFocus
              />
              <Button 
                size="sm" 
                onClick={handleStatusMessageUpdate}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                ✓
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setIsEditingStatus(false)}
                className="hover:bg-white/30 dark:hover:bg-black/30"
              >
                ✕
              </Button>
            </div>
          ) : (
            <div 
              className="flex-1 text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 transition-colors p-2 rounded-md hover:bg-white/30 dark:hover:bg-black/30"
              onClick={() => setIsEditingStatus(true)}
            >
              {user?.statusMessage || "Click to set status message..."}
            </div>
          )}
        </div>

        {/* Status Selector */}
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start bg-white/30 dark:bg-black/30 border-white/30 dark:border-gray-700/50 hover:bg-white/40 dark:hover:bg-black/40"
            >
              <div className={`w-3 h-3 ${getStatusColor(user?.status)} rounded-full mr-2`}></div>
              Change Status
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50">
            <DialogHeader>
              <DialogTitle>Change Your Status</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <StatusButton
                status="online"
                icon={Circle}
                label="Online"
                isActive={user?.status === "online"}
                onClick={() => handleStatusChange("online")}
              />
              <StatusButton
                status="away"
                icon={Clock}
                label="Away"
                isActive={user?.status === "away"}
                onClick={() => handleStatusChange("away")}
              />
              <StatusButton
                status="busy"
                icon={Minus}
                label="Busy"
                isActive={user?.status === "busy"}
                onClick={() => handleStatusChange("busy")}
              />
              <StatusButton
                status="offline"
                icon={X}
                label="Appear Offline"
                isActive={user?.status === "offline"}
                onClick={() => handleStatusChange("offline")}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserProfile;