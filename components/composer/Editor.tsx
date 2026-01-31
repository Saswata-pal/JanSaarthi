"use client";
import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { marked } from 'marked';
import MenuBar from './menuBar'; 
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import CharacterCount from '@tiptap/extension-character-count';
import {
  Check, Download, Copy, Save, Send, Sparkles, Languages,
  Settings as SettingsIcon, PanelLeft
} from 'lucide-react';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Editor = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  // --- TIPTAP SETUP ---
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CharacterCount,
    ],
    editorProps: {
      attributes: {
        class: `prose prose-zinc max-w-none focus:outline-none min-h-[300px] md:min-h-[400px] leading-relaxed text-slate-800 text-sm md:text-base prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-p:my-2`,
      },
    },
    immediatelyRender: false,
  });

  const generateDraft = async () => {
    if (!editor || !prompt) return;
    setIsGenerating(true);
    const currentContent = editor.getHTML();
    editor.commands.setContent(currentContent + '<p><em>AI is writing...</em></p>');
    await new Promise(r => setTimeout(r, 1000));
    const markdownResponse = `
I am writing to bring to your attention the critical issue of...

* **Issue:** ${prompt}
* **Impact:** Public safety risk
* **Request:** Immediate repair

Thank you for your prompt action.
    `;
    // @ts-ignore
    const html = await marked.parse(markdownResponse);
    editor.commands.setContent(html);
    setIsGenerating(false);
    setIsLeftSidebarOpen(false);
  };

  // --- SIDEBAR CONTENT COMPONENTS ---
  const LeftSidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-slate-100">
        <h2 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-4">Document Setup</h2>
        <div className="mb-6">
          <Label className="block text-sm font-medium mb-3 text-slate-900">Draft Type</Label>
          <RadioGroup defaultValue="application" className="space-y-1">
            {['Application', 'Appeal', 'Complaint', 'RTI', 'Grievance'].map((type) => (
              <div key={type} className="flex items-center space-x-2 p-2 rounded hover:bg-slate-50 transition-colors">
                <RadioGroupItem value={type.toLowerCase()} id={type.toLowerCase()} className="text-slate-900 border-slate-300" />
                <Label htmlFor={type.toLowerCase()} className="text-sm font-medium text-slate-700 cursor-pointer flex-1">{type}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="p-5">
        <h2 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-4">Progress</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
              <Check className="h-4 w-4" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-slate-900">Basic Details</p>
              <p className="text-xs text-slate-500">Completed</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-slate-900 flex items-center justify-center font-bold text-xs border border-blue-200 shrink-0">
              2
            </div>
            <div className="text-sm">
              <p className="font-medium text-slate-900">Drafting Content</p>
              <p className="text-xs text-blue-600 font-medium">In Progress</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 border-t border-slate-100 mt-auto bg-slate-50/50">
        <h2 className="text-xs uppercase tracking-wider text-amber-600 font-bold mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Draft with AI
        </h2>
        <div className="space-y-3">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your request..."
            className="min-h-[100px] resize-none bg-white text-sm"
          />
          <Button
            onClick={generateDraft}
            disabled={isGenerating}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white gap-2"
          >
            {isGenerating ? 'Writing...' : 'Generate'}
            <Send className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );

  const RightSidebarContent = () => (
    <div className="flex flex-col h-full p-6">
      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">Draft Settings</h3>
      <div className="space-y-8">
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-3 block">Tone</Label>
          <div className="bg-slate-100 p-1 rounded-lg flex">
            <button className="flex-1 py-2 px-3 text-xs font-bold rounded shadow-sm bg-white text-slate-900 border border-slate-200">Polite</button>
            <button className="flex-1 py-2 px-3 text-xs font-medium rounded text-slate-500 hover:text-slate-700">Formal</button>
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium text-slate-700 block mb-3">Language</Label>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between p-3 border border-slate-900 bg-slate-50 rounded cursor-pointer ring-1 ring-slate-900/10">
              <div className="flex items-center gap-3">
                <Languages className="h-4 w-4 text-slate-900" />
                <span className="text-sm font-medium text-slate-900">English</span>
              </div>
              <div className="h-2 w-2 rounded-full bg-slate-900"></div>
            </div>
            <div className="flex items-center justify-between p-3 border border-slate-200 rounded hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Languages className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-600">Hindi</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-slate-50 rounded border border-slate-100 flex justify-between items-center text-sm">
          <span className="text-slate-500 font-medium">Word Count</span>
          <Badge variant="secondary" className="font-mono">
            {editor ? editor.storage.characterCount.words() : 0}
          </Badge>
        </div>
      </div>
      <div className="pt-6 border-t border-slate-100 mt-auto space-y-3">
        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 shadow-md">
          <Download className="h-5 w-5 mr-2" />
          <span className="hidden sm:inline">Download PDF</span>
          <span className="inline sm:hidden">Download</span>
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-10 border-slate-300 text-slate-700 hover:bg-slate-50">
            <Save className="h-4 w-4 mr-2" /> Save
          </Button>
          <Button variant="outline" className="h-10 border-slate-300 text-slate-700 hover:bg-slate-50">
            <Copy className="h-4 w-4 mr-2" /> Copy
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* HEADER */}
      <header className="h-14 md:h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0 z-30 relative">
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* LEFT SIDEBAR TOGGLE (Visible below XL) */}
          <Sheet open={isLeftSidebarOpen} onOpenChange={setIsLeftSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden">
                <PanelLeft className="h-5 w-5 text-slate-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
              <LeftSidebarContent />
            </SheetContent>
          </Sheet>
          
          <span className="text-lg font-bold text-slate-900">JanSaarthi</span>
        </div>

        {/* RIGHT SIDEBAR TOGGLE (Visible below XL) */}
        <Sheet open={isRightSidebarOpen} onOpenChange={setIsRightSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="xl:hidden">
              <SettingsIcon className="h-5 w-5 text-slate-600" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 w-80">
            <RightSidebarContent />
          </SheetContent>
        </Sheet>
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex flex-1 overflow-hidden relative z-0">
        
        {/* DESKTOP LEFT SIDEBAR (Hidden below XL) */}
        <aside className="hidden xl:block w-72 bg-white border-r border-slate-200 shrink-0 z-20 h-full">
          <ScrollArea className="h-full">
            <LeftSidebarContent />
          </ScrollArea>
        </aside>

        {/* CENTER SCROLL AREA */}
        {/* min-w-0 is CRITICAL: Prevents the paper from pushing sidebars off-screen */}
        <ScrollArea className="flex-1 bg-slate-100 h-full w-full min-w-0">
          <div className="flex flex-col items-center p-4 md:p-8 min-h-full">
            
            {/* PAPER */}
            {/* w-full max-w-[210mm] ensures it shrinks on small screens but stays A4 on large ones */}
            <div className="w-full max-w-[210mm] min-h-[50vh] md:min-h-[297mm] bg-white shadow-sm md:shadow-lg flex flex-col transition-all rounded-sm md:rounded-none relative">
              
              {/* STICKY TOOLBAR */}
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-slate-100 md:border-none">
                 <div className="px-2 py-2 md:px-[20mm] md:pt-[10mm] md:pb-2">
                    <MenuBar editor={editor} />
                 </div>
              </div>

              {/* EDITOR */}
              <div 
                className="flex-1 p-4 md:p-[20mm] md:pt-0 cursor-text"
                onClick={() => editor?.commands.focus()}
              >
                <EditorContent editor={editor} />
              </div>
            </div>

            <div className="mt-8 text-xs text-slate-400 hidden md:block">
              A4 Size Preview
            </div>
            <div className="h-20 md:h-0" />
          </div>
        </ScrollArea>

        {/* DESKTOP RIGHT SIDEBAR (Hidden below XL) */}
        <aside className="hidden xl:block w-80 bg-white border-l border-slate-200 shrink-0 z-20 h-full">
          <ScrollArea className="h-full">
            <RightSidebarContent />
          </ScrollArea>
        </aside>

      </div>
    </div>
  );
};

export default Editor;