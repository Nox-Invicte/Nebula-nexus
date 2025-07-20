import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Moon, Sun, MessageCircle, Users, Smile, Zap } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !displayName.trim()) return;

    setLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      const userData = {
        id: "user-" + Date.now(),
        name: displayName,
        email: email,
        status: "online",
        statusMessage: "Ready to chat! 💬",
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face`
      };
      
      login(userData);
      navigate("/messenger");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-full"
      >
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>

      {/* Main Login Card */}
      <Card className="w-full max-w-md backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            MSN Reimagined
          </CardTitle>
          <CardDescription className="text-white/80 text-lg">
            Connect, chat, and stay in touch with a modern twist
          </CardDescription>
          
          {/* Feature Badges */}
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors">
              <Users className="h-3 w-3 mr-1" />
              Group Chats
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors">
              <Smile className="h-3 w-3 mr-1" />
              Emojis
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors">
              <Zap className="h-3 w-3 mr-1" />
              Instant
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-white/90 font-medium">
                Display Name
              </Label>
              <Input
                id="displayName"
                type="text"
                placeholder="Enter your display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-purple-400 focus:ring-purple-400/50 backdrop-blur-sm"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-purple-400 focus:ring-purple-400/50 backdrop-blur-sm"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl disabled:opacity-70 disabled:hover:scale-100"
              disabled={loading || !email.trim() || !displayName.trim()}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In to Messenger"
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-white/60 text-sm">
            <p>Experience the nostalgia with modern design</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-8 text-white/40 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Retro. Reimagined.</span>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;