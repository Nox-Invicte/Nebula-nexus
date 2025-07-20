import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { MessengerProvider } from "./contexts/MessengerContext";
import LoginScreen from "./components/LoginScreen";
import MainMessenger from "./components/MainMessenger";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <AuthProvider>
          <MessengerProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route path="/messenger" element={<MainMessenger />} />
              </Routes>
              <Toaster />
            </BrowserRouter>
          </MessengerProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;