"use client";
import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './menuBar'; 
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import CharacterCount from '@tiptap/extension-character-count';
import { Settings as SettingsIcon, PanelLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LeftSidebar } from './leftSidebar';
import { RightSidebar } from './rightSidebar';

const Editor = () => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CharacterCount,
    ],
    editorProps: {
      attributes: {
        class: `prose prose-zinc max-w-none focus:outline-none min-h-[300px] md:min-h-[400px] leading-relaxed text-zinc-800 text-sm md:text-base prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-p:my-2`,
      },
    },
    immediatelyRender: false,
  });

  return (
    <div className="flex flex-col h-screen bg-zinc-50 font-sans text-zinc-900 overflow-hidden">
      <header className="h-14 md:h-16 bg-white/80 backdrop-blur-sm border-b border-zinc-200 flex items-center justify-between px-4 md:px-6 shrink-0 z-30 relative">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet open={isLeftSidebarOpen} onOpenChange={setIsLeftSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden hover:bg-zinc-100">
                <PanelLeft className="h-5 w-5 text-zinc-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80 border-r-zinc-200">
              <LeftSidebar 
               editor={editor}
              />
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-zinc-900 flex items-center justify-center text-white font-bold text-xs">J</div>
            <span className="text-lg font-bold text-zinc-900 tracking-tight">JanSaarthi</span>
          </div>
        </div>

        <Sheet open={isRightSidebarOpen} onOpenChange={setIsRightSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="xl:hidden hover:bg-zinc-100">
              <SettingsIcon className="h-5 w-5 text-zinc-600" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 w-80 border-l-zinc-200">
            <RightSidebar editor={editor} />
          </SheetContent>
        </Sheet>
      </header>

      <div className="flex flex-1 overflow-hidden relative z-0">

        <aside className="hidden xl:block w-72 bg-white border-r border-zinc-200 shrink-0 z-20 h-full shadow-[2px_0_20px_rgba(0,0,0,0.02)]">
            <LeftSidebar 
              editor={editor}
            />
        </aside>

        <ScrollArea className="flex-1 bg-zinc-100/50 h-full w-full min-w-0">
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-zinc-200/60 shadow-sm transition-all">
             <div className="px-2 py-2 md:px-[20mm] md:pt-5 md:pb-3 max-w-screen-2xl mx-auto">
                <MenuBar editor={editor} />
             </div>
          </div>
          
          <div className="flex flex-col items-center p-4 md:p-8 min-h-full pb-20">
            <div className="w-full max-w-[210mm] min-h-[50vh] md:min-h-[297mm] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-zinc-200/60 flex flex-col transition-all rounded-sm relative py-6 ring-1 ring-black/5">
              <div 
                className="flex-1 p-8 md:p-[20mm] md:pt-4 cursor-text"
                onClick={() => editor?.commands.focus()}
              >
                <EditorContent editor={editor} />
              </div>
            </div>

            <div className="h-20 md:h-0" />
          </div>
        </ScrollArea>
        <aside className="hidden xl:block w-80 bg-white border-l border-zinc-200 shrink-0 z-20 h-full shadow-[-2px_0_20px_rgba(0,0,0,0.02)]">
          <ScrollArea className="h-full">
            <RightSidebar editor={editor} />
          </ScrollArea>
        </aside>

      </div>
    </div>
  );
};

export default Editor;