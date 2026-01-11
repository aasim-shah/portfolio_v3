# Next.js Chatbot Component

## Overview

A production-ready React client component for the portfolio chatbot with streaming responses, dark/light theme support, and a minimal UI suitable for portfolio embedding.

## Component Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      CHATBOT COMPONENT TREE                              │
└─────────────────────────────────────────────────────────────────────────┘

  ChatProvider (Context)
       │
       ├── ChatWidget (Floating Button + Container)
       │        │
       │        ├── ChatHeader
       │        │     ├── Title
       │        │     ├── Status Indicator
       │        │     └── Close Button
       │        │
       │        ├── ChatMessages
       │        │     ├── WelcomeMessage
       │        │     ├── MessageBubble (user)
       │        │     ├── MessageBubble (assistant)
       │        │     └── TypingIndicator
       │        │
       │        └── ChatInput
       │              ├── TextArea
       │              ├── SendButton
       │              └── CharacterCount
       │
       └── ChatTrigger (Floating Action Button)
```

## File Structure

```
components/
└── Chatbot/
    ├── index.ts                    # Public exports
    ├── ChatWidget.tsx              # Main widget component
    ├── ChatProvider.tsx            # Context provider
    ├── ChatHeader.tsx              # Header with controls
    ├── ChatMessages.tsx            # Message list
    ├── ChatInput.tsx               # Input area
    ├── ChatTrigger.tsx             # Floating button
    ├── MessageBubble.tsx           # Individual message
    ├── TypingIndicator.tsx         # Loading animation
    ├── WelcomeMessage.tsx          # Initial greeting
    └── hooks/
        ├── useChatStream.ts        # Streaming hook
        ├── useChatState.ts         # State management
        └── useAutoScroll.ts        # Auto-scroll behavior
```

## Implementation

### 1. Chat Provider (Context)

```typescript
// File: components/Chatbot/ChatProvider.tsx

'use client';

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

interface ChatState {
  messages: Message[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

type ChatAction =
  | { type: 'TOGGLE_OPEN' }
  | { type: 'SET_OPEN'; payload: boolean }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'UPDATE_MESSAGE'; payload: { id: string; content: string; isStreaming?: boolean } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_MESSAGES' };

const initialState: ChatState = {
  messages: [],
  isOpen: false,
  isLoading: false,
  error: null,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'TOGGLE_OPEN':
      return { ...state, isOpen: !state.isOpen };
    case 'SET_OPEN':
      return { ...state, isOpen: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === action.payload.id
            ? { ...msg, content: action.payload.content, isStreaming: action.payload.isStreaming }
            : msg
        ),
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] };
    default:
      return state;
  }
}

interface ChatContextType {
  state: ChatState;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => string;
  updateMessage: (id: string, content: string, isStreaming?: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const toggleOpen = useCallback(() => dispatch({ type: 'TOGGLE_OPEN' }), []);
  const setOpen = useCallback((open: boolean) => dispatch({ type: 'SET_OPEN', payload: open }), []);
  
  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const id = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    dispatch({
      type: 'ADD_MESSAGE',
      payload: { ...message, id, timestamp: new Date() },
    });
    return id;
  }, []);

  const updateMessage = useCallback((id: string, content: string, isStreaming?: boolean) => {
    dispatch({ type: 'UPDATE_MESSAGE', payload: { id, content, isStreaming } });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const clearMessages = useCallback(() => dispatch({ type: 'CLEAR_MESSAGES' }), []);

  return (
    <ChatContext.Provider
      value={{
        state,
        toggleOpen,
        setOpen,
        addMessage,
        updateMessage,
        setLoading,
        setError,
        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
```

### 2. Streaming Hook

```typescript
// File: components/Chatbot/hooks/useChatStream.ts

'use client';

import { useCallback, useRef } from 'react';
import { useChatContext } from '../ChatProvider';

interface UseChatStreamOptions {
  onError?: (error: Error) => void;
  onComplete?: () => void;
}

export function useChatStream(options: UseChatStreamOptions = {}) {
  const { state, addMessage, updateMessage, setLoading, setError } = useChatContext();
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || state.isLoading) return;

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setError(null);
    setLoading(true);

    // Add user message
    addMessage({ role: 'user', content: content.trim() });

    // Create placeholder for assistant message
    const assistantMessageId = addMessage({
      role: 'assistant',
      content: '',
      isStreaming: true,
    });

    // Prepare conversation history
    const history = state.messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content.trim(),
          history,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      // Read the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              updateMessage(assistantMessageId, accumulatedContent, false);
              options.onComplete?.();
              break;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulatedContent += parsed.content;
                updateMessage(assistantMessageId, accumulatedContent, true);
              }
              if (parsed.error) {
                throw new Error(parsed.error);
              }
            } catch (e) {
              // Skip invalid JSON (might be partial chunk)
              if (data.trim() && !data.startsWith('{')) {
                accumulatedContent += data;
                updateMessage(assistantMessageId, accumulatedContent, true);
              }
            }
          }
        }
      }

      // Ensure streaming is marked as complete
      updateMessage(assistantMessageId, accumulatedContent, false);

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return; // Request was cancelled
      }

      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setError(errorMessage);
      updateMessage(
        assistantMessageId,
        'I apologize, but I encountered an issue. Please try again.',
        false
      );
      options.onError?.(error instanceof Error ? error : new Error(errorMessage));
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [state.messages, state.isLoading, addMessage, updateMessage, setLoading, setError, options]);

  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setLoading(false);
    }
  }, [setLoading]);

  return {
    sendMessage,
    cancelRequest,
    isLoading: state.isLoading,
  };
}
```

### 3. Main Chat Widget

```typescript
// File: components/Chatbot/ChatWidget.tsx

'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatContext } from './ChatProvider';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { ChatTrigger } from './ChatTrigger';

export function ChatWidget() {
  const { state, setOpen } = useChatContext();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && state.isOpen) {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [state.isOpen, setOpen]);

  return (
    <>
      {/* Floating Trigger Button */}
      <ChatTrigger />

      {/* Chat Window */}
      <AnimatePresence>
        {state.isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] 
                       h-[600px] max-h-[calc(100vh-8rem)]
                       bg-white dark:bg-zinc-900 
                       rounded-2xl shadow-2xl
                       border border-zinc-200 dark:border-zinc-800
                       flex flex-col overflow-hidden"
          >
            <ChatHeader />
            <ChatMessages />
            <ChatInput />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

### 4. Chat Header

```typescript
// File: components/Chatbot/ChatHeader.tsx

'use client';

import { X, Trash2, Minimize2 } from 'lucide-react';
import { useChatContext } from './ChatProvider';
import { Button } from '@/components/ui/Button';

export function ChatHeader() {
  const { setOpen, clearMessages, state } = useChatContext();

  return (
    <div className="flex items-center justify-between px-4 py-3 
                    border-b border-zinc-200 dark:border-zinc-800
                    bg-zinc-50 dark:bg-zinc-900/50">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 
                        flex items-center justify-center text-white font-semibold text-sm">
          AS
        </div>
        
        {/* Title & Status */}
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
            Portfolio Assistant
          </h3>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Online
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {state.messages.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearMessages}
            className="h-8 w-8 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            title="Clear chat"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(false)}
          className="h-8 w-8 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          title="Close chat"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
```

### 5. Chat Messages

```typescript
// File: components/Chatbot/ChatMessages.tsx

'use client';

import { useEffect, useRef } from 'react';
import { useChatContext } from './ChatProvider';
import { MessageBubble } from './MessageBubble';
import { WelcomeMessage } from './WelcomeMessage';
import { TypingIndicator } from './TypingIndicator';

export function ChatMessages() {
  const { state } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-4
                 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700
                 scrollbar-track-transparent"
    >
      {/* Welcome message when empty */}
      {state.messages.length === 0 && <WelcomeMessage />}

      {/* Message list */}
      {state.messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {/* Typing indicator */}
      {state.isLoading && !state.messages.some(m => m.isStreaming) && (
        <TypingIndicator />
      )}

      {/* Error message */}
      {state.error && (
        <div className="text-center py-2">
          <span className="text-sm text-red-500 dark:text-red-400">
            {state.error}
          </span>
        </div>
      )}

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
}
```

### 6. Message Bubble

```typescript
// File: components/Chatbot/MessageBubble.tsx

'use client';

import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';
import { Message } from './ChatProvider';
import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
          ${isUser 
            ? 'bg-blue-500 text-white' 
            : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
          }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Message Content */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5
          ${isUser
            ? 'bg-blue-500 text-white rounded-br-md'
            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-md'
          }
          ${message.isStreaming ? 'animate-pulse' : ''}`}
      >
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="text-sm prose prose-sm dark:prose-invert max-w-none
                          prose-p:my-1 prose-ul:my-1 prose-li:my-0.5
                          prose-headings:my-2 prose-headings:font-semibold">
            <ReactMarkdown>{message.content || '...'}</ReactMarkdown>
          </div>
        )}
        
        {/* Streaming cursor */}
        {message.isStreaming && (
          <span className="inline-block w-2 h-4 ml-1 bg-current animate-blink" />
        )}
      </div>
    </motion.div>
  );
}
```

### 7. Chat Input

```typescript
// File: components/Chatbot/ChatInput.tsx

'use client';

import { useState, useRef, useCallback, KeyboardEvent } from 'react';
import { Send, Square } from 'lucide-react';
import { useChatStream } from './hooks/useChatStream';
import { Button } from '@/components/ui/Button';

const MAX_LENGTH = 2000;

export function ChatInput() {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, cancelRequest, isLoading } = useChatStream();

  const handleSubmit = useCallback(() => {
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  }, [input, isLoading, sendMessage]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      setInput(value);
      
      // Auto-resize textarea
      const textarea = e.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 
                    bg-white dark:bg-zinc-900">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask about my experience, services, or projects..."
            disabled={isLoading}
            rows={1}
            className="w-full resize-none rounded-xl border border-zinc-300 dark:border-zinc-700
                       bg-zinc-50 dark:bg-zinc-800
                       px-4 py-3 pr-12
                       text-sm text-zinc-900 dark:text-zinc-100
                       placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          
          {/* Character count */}
          {input.length > MAX_LENGTH * 0.8 && (
            <span className={`absolute right-3 bottom-1 text-xs
              ${input.length >= MAX_LENGTH ? 'text-red-500' : 'text-zinc-400'}`}>
              {input.length}/{MAX_LENGTH}
            </span>
          )}
        </div>

        {/* Send/Cancel Button */}
        {isLoading ? (
          <Button
            onClick={cancelRequest}
            variant="destructive"
            size="icon"
            className="h-12 w-12 rounded-xl flex-shrink-0"
            title="Cancel"
          >
            <Square className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!input.trim()}
            variant="default"
            size="icon"
            className="h-12 w-12 rounded-xl flex-shrink-0 
                       bg-blue-500 hover:bg-blue-600 
                       disabled:opacity-50 disabled:cursor-not-allowed"
            title="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Helper text */}
      <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 text-center">
        Press Enter to send • Shift+Enter for new line
      </p>
    </div>
  );
}
```

### 8. Chat Trigger (Floating Button)

```typescript
// File: components/Chatbot/ChatTrigger.tsx

'use client';

import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useChatContext } from './ChatProvider';

export function ChatTrigger() {
  const { state, toggleOpen } = useChatContext();

  return (
    <motion.button
      onClick={toggleOpen}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50
                 w-14 h-14 rounded-full
                 bg-gradient-to-br from-blue-500 to-purple-600
                 text-white shadow-lg
                 flex items-center justify-center
                 hover:shadow-xl
                 transition-shadow duration-200"
      aria-label={state.isOpen ? 'Close chat' : 'Open chat'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: state.isOpen ? 90 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {state.isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.div>

      {/* Notification badge (optional) */}
      {!state.isOpen && state.messages.length === 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-4 h-4 
                     bg-red-500 rounded-full
                     flex items-center justify-center
                     text-[10px] font-bold"
        >
          1
        </motion.span>
      )}
    </motion.button>
  );
}
```

### 9. Welcome Message

```typescript
// File: components/Chatbot/WelcomeMessage.tsx

'use client';

import { motion } from 'framer-motion';
import { Sparkles, Code, Briefcase, Mail } from 'lucide-react';
import { useChatStream } from './hooks/useChatStream';

const QUICK_ACTIONS = [
  { icon: Code, label: 'What services do you offer?', query: 'What services do you offer?' },
  { icon: Briefcase, label: 'Tell me about your experience', query: 'What is your professional experience?' },
  { icon: Mail, label: 'How can I contact you?', query: 'How can I contact you?' },
];

export function WelcomeMessage() {
  const { sendMessage } = useChatStream();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center py-6"
    >
      {/* Welcome Icon */}
      <div className="w-16 h-16 mx-auto mb-4 rounded-full 
                      bg-gradient-to-br from-blue-500/20 to-purple-600/20
                      flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-blue-500" />
      </div>

      {/* Welcome Text */}
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
        Hi! I'm Aasim's Portfolio Assistant
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 max-w-[280px] mx-auto">
        I can answer questions about Aasim's experience, services, projects, and skills. 
        How can I help you today?
      </p>

      {/* Quick Action Buttons */}
      <div className="space-y-2">
        {QUICK_ACTIONS.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => sendMessage(action.query)}
            className="w-full flex items-center gap-3 px-4 py-3
                       bg-zinc-50 dark:bg-zinc-800/50
                       hover:bg-zinc-100 dark:hover:bg-zinc-800
                       rounded-xl text-left
                       text-sm text-zinc-700 dark:text-zinc-300
                       transition-colors duration-200"
          >
            <action.icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>{action.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
```

### 10. Typing Indicator

```typescript
// File: components/Chatbot/TypingIndicator.tsx

'use client';

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full 
                      bg-zinc-200 dark:bg-zinc-700 
                      flex items-center justify-center
                      text-zinc-600 dark:text-zinc-300">
        <Bot className="w-4 h-4" />
      </div>

      {/* Typing Dots */}
      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-500"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

### 11. Public Exports

```typescript
// File: components/Chatbot/index.ts

export { ChatWidget } from './ChatWidget';
export { ChatProvider, useChatContext } from './ChatProvider';
export type { Message } from './ChatProvider';
```

## Integration in Layout

```typescript
// File: app/layout.tsx (updated)

import { ChatProvider } from '@/components/Chatbot';
import { ChatWidget } from '@/components/Chatbot';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ChatProvider>
            {children}
            <ChatWidget />
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Required Dependencies

```bash
npm install framer-motion lucide-react react-markdown lru-cache
npm install -D @tailwindcss/typography
```

## Tailwind Configuration Update

```typescript
// tailwind.config.ts

export default {
  // ...existing config
  plugins: [
    require('@tailwindcss/typography'),
    // Add custom scrollbar styles
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
        '.scrollbar-thumb-zinc-300': {
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#d4d4d8',
            borderRadius: '9999px',
          },
        },
        '.scrollbar-thumb-zinc-700': {
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#3f3f46',
            borderRadius: '9999px',
          },
        },
        '.scrollbar-track-transparent': {
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
        },
      });
    },
  ],
};
```

## CSS Additions

```css
/* Add to globals.css */

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.animate-blink {
  animation: blink 1s infinite;
}
```
