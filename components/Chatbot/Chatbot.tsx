'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Aasim's AI assistant. I can answer questions about his experience, services, projects, and skills. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: errorData.message || 'An error occurred.' },
        ]);
        setIsLoading(false);
        return;
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      if (reader) {
        setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                break;
              }

              try {
                const parsed = JSON.parse(data);
                if (parsed.chunk) {
                  assistantMessage += parsed.chunk;
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1].content = assistantMessage;
                    return updated;
                  });
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'I apologize, but I encountered an issue. Please try again.' 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "What services does Aasim offer?",
    "Tell me about his experience",
    "What are his rates?",
    "How can I contact him?",
  ];

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-white shadow-lg transition-all hover:bg-gray-700 hover:scale-110 hover:shadow-xl border border-gray-700"
          aria-label="Open chat"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[400px] flex-col rounded-2xl border border-gray-700 bg-gray-900 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl bg-gray-800 border-b border-gray-700 p-4 text-white">
            <div className="flex items-center gap-3">
              <Bot className="h-6 w-6 text-blue-400" />
              <div>
                <h3 className="font-semibold">Ask Aasim's AI</h3>
                <p className="text-xs opacity-70">Portfolio Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 transition-colors hover:bg-gray-700"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-100 border border-gray-700'
                  }`}
                >
                  <ReactMarkdown
                    className="prose prose-sm prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                    components={{
                      p: ({ children }) => <p className="mb-2 last:mb-0 text-gray-100">{children}</p>,
                      ul: ({ children }) => <ul className="mb-2 ml-4 list-disc text-gray-100">{children}</ul>,
                      ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal text-gray-100">{children}</ol>,
                      li: ({ children }) => <li className="mb-1 text-gray-100">{children}</li>,
                      strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                      code: ({ children }) => <code className="bg-gray-700 px-1.5 py-0.5 rounded text-sm text-blue-300">{children}</code>,
                      a: ({ children, href }) => <a href={href} className="text-blue-400 hover:text-blue-300 underline">{children}</a>,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-gray-800 border border-gray-700 px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                  <span className="text-sm text-gray-300">Thinking...</span>
                </div>
              </div>
            )}

            {/* Suggested Questions (only show initially) */}
            {messages.length === 1 && !isLoading && (
              <div className="space-y-2 pt-2">
                <p className="text-xs text-gray-400">Try asking:</p>
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(question)}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2.5 text-left text-sm text-gray-200 transition-colors hover:bg-gray-750 hover:border-gray-600"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="border-t border-gray-700 p-4 bg-gray-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Aasim's work..."
                disabled={isLoading}
                className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-white transition-all hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Answers are based on portfolio data only
            </p>
          </form>
        </div>
      )}
    </>
  );
}
