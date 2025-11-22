
"use client"; // This must be a client component

import { useState } from "react";

// TypeScript helper to avoid errors with window.puter
declare global {
  interface Window {
    puter: any;
  }
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatInterface() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful, friendly AI assistant named Alex.");

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Check if Puter is loaded
    if (!window.puter) {
      alert("Puter.js hasn't loaded yet. Please wait a moment.");
      return;
    }

    const userMessage: Message = { role: "user", content: input };
    
    // Add user message to history
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Clear input immediately
    setIsLoading(true);

    try {
      // Keep only last 20 messages for context (19 previous + 1 new user message)
      const contextMessages = [...messages, userMessage].slice(-20);
      
      // Format messages for the AI with system prompt
      const chatHistory = [
        { role: "system", content: systemPrompt },
        ...contextMessages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      // CALLING THE AI WITH CHAT HISTORY
      const result = await window.puter.ai.chat(chatHistory, {
        model: "gpt-4o-mini",
      });
      
      const assistantMessage: Message = {
        role: "assistant",
        content: result?.message?.content || result
      };

      // Add assistant response and keep only last 20 messages
      setMessages((prev) => [...prev, assistantMessage].slice(-20));
    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Something went wrong. Ensure you are logged into Puter."
      };
      setMessages((prev) => [...prev, errorMessage].slice(-20));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-none sm:rounded-xl shadow-none sm:shadow-md border-0 sm:border sm:mt-4 md:mt-10 h-[100vh] sm:h-[600px] md:h-[700px] flex flex-col">
      <div className="p-3 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI Chat Assistant (Powered by Puter)</h2>
        
        {/* System Prompt Input */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            AI Persona (System Prompt):
          </label>
          <input
            type="text"
            className="w-full p-2 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="e.g., You are a pirate captain who speaks in nautical terms..."
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
          />
        </div>
      </div>
      
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto mb-3 sm:mb-4 space-y-3 sm:space-y-4 px-3 sm:px-6 py-2 sm:py-4 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center text-sm sm:text-base">Start a conversation...</p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[70%] p-2.5 sm:p-3 rounded-lg text-sm sm:text-base ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 p-2.5 sm:p-3 rounded-lg">
              <p className="animate-pulse text-sm sm:text-base">Thinking...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="px-3 sm:px-6 pb-3 sm:pb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <textarea
            className="flex-1 p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black resize-none text-sm sm:text-base"
            rows={2}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="px-4 sm:px-6 py-2.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition self-stretch sm:self-end text-sm sm:text-base font-medium"
          >
            Send
          </button>
        </div>

        {/* Message Counter */}
        <p className="text-xs text-gray-500 mt-2 text-right">
          {messages.length} / 20 messages in context
        </p>
      </div>
    </div>
  );
}
