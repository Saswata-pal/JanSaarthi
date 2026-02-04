"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Editor } from '@tiptap/react';
import { marked } from 'marked';
import { cn } from "@/lib/utils";

interface LeftSidebarProps {
  editor: Editor | null;
}

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'ai',
    content: "Hello! I am your legal drafting assistant. Describe the document you need, and I will draft it for you directly in the editor.",
  },
  {
    id: '2',
    role: 'user',
    content: "I need an application for sick leave.",
  },
  {
    id: '3',
    role: 'ai',
    content: "I've drafted a formal sick leave application for you. Please review the dates and medical details in the document.",
  }
];

export const LeftSidebar = ({ editor }: LeftSidebarProps) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
    };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');
    setIsGenerating(true);

    try {
      const res = await fetch("/api/action-composer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage.content }),
      });

      const data = await res.json();

      if (data.text) {
        const htmlContent = await marked.parse(data.text);
        editor?.commands.setContent(htmlContent);
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: "I have updated the document based on your request.",
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "Sorry, I encountered an error while processing your request.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-full bg-background border-r border-border overflow-hidden">
      <div className="p-5 border-b border-border  bg-background">
        <h2 className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-2">
          <Bot className="h-4 w-4" />
          AI Composer
        </h2>
      </div>
     <div className="flex-1 relative overflow-hidden">
  <ScrollArea className="absolute inset-0 h-full w-full">
          <div className="p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex w-full gap-3",
                  msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center shrink-0 border border-border",
                  msg.role === 'ai' ? "bg-primary/10 text-primary" : "bg-muted text-foreground"
                )}>
                  {msg.role === 'ai' ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <div className={cn(
                  "p-3 rounded-lg text-sm max-w-[85%] shadow-sm",
                  msg.role === 'user' 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted/50 text-foreground border border-border"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isGenerating && (
              <div className="flex w-full gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center  border border-border animate-pulse">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="p-3 rounded-lg text-sm bg-muted/50 text-muted-foreground border border-border">
                  Drafting content...
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>
      <div className="p-4 border-t border-border bg-gradient-to-b from-background to-primary/5 ">
        <div className="space-y-3">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe what you want to add or change..."
            className="min-h-[80px] resize-none bg-background border-input text-sm focus-visible:ring-primary/20 shadow-sm"
          />
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full gap-2 shadow-md transition-all"
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-3 w-3 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Generate
                <Send className="h-3 w-3 opacity-70" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};