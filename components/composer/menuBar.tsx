"use client";

import React, { useState, useCallback } from 'react';
import { 
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, 
  AlignJustify, List, ListOrdered, Undo, Redo, Heading1, Heading2, 
  Link as LinkIcon, Unlink, Printer
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const MenuBar = ({ editor }: { editor: any }) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const openLinkModal = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    setUrlInput(previousUrl || ''); 
    setIsLinkModalOpen(true);
  }, [editor]);
  
  const saveLink = useCallback(() => {
    if (!editor) return;
    if (urlInput === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: urlInput }).run();
    }
    setIsLinkModalOpen(false);
  }, [editor, urlInput]);
  
  const removeLink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    setIsLinkModalOpen(false);
  }, [editor]);
  
  if (!editor) return null;

  const ToolbarButton = ({ 
    isActive = false, onClick, children, title, disabled = false
  }: { isActive?: boolean, onClick: () => void, children: React.ReactNode, title: string, disabled?: boolean }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      type="button"
      className={`
        flex items-center justify-center rounded-md h-8 w-8 shrink-0 transition-all duration-200
        ${isActive 
          ? 'text-blue-600 bg-blue-100 shadow-sm' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
        ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
      `}
    >
      {children}
    </button>
  );

  const Separator = () => <div className="w-px h-5 bg-slate-200 mx-1 shrink-0" />;
  const iconSize = 18;

  return (
    <>
      <div className="
        fixed -top-2 left-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200 
        px-3 py-2 w-full
        flex items-center gap-1
        overflow-x-auto flex-nowrap
        md:flex-wrap md:overflow-visible md:h-auto
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
      ">
        <div className="flex items-center gap-0.5">
            <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} title="Undo">
                <Undo size={iconSize} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} title="Redo">
                <Redo size={iconSize} />
            </ToolbarButton>
        </div>
        <Separator />
        <div className="flex items-center gap-0.5">
            <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold">
                <Bold size={iconSize} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic">
                <Italic size={iconSize} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline">
                <Underline size={iconSize} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Strikethrough">
                <Strikethrough size={iconSize} />
            </ToolbarButton>
        </div>
        <Separator />
        <div className="flex items-center gap-0.5">
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Heading 1">
                <Heading1 size={iconSize} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Heading 2">
                <Heading2 size={iconSize} />
            </ToolbarButton>
        </div>
        <Separator />
        <div className="flex items-center gap-0.5">
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Align Left">
                <AlignLeft size={iconSize} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Align Center">
                <AlignCenter size={iconSize} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Align Right">
                <AlignRight size={iconSize} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} isActive={editor.isActive({ textAlign: 'justify' })} title="Justify">
                <AlignJustify size={iconSize} />
            </ToolbarButton>
        </div>
        <Separator />
        <div className="flex items-center gap-0.5">
            <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet List">
                <List size={iconSize} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Numbered List">
                <ListOrdered size={iconSize} />
            </ToolbarButton>
        </div>
        <Separator />
        <div className="flex items-center gap-0.5">
            <ToolbarButton onClick={openLinkModal} isActive={editor.isActive('link')} title="Insert Link">
                <LinkIcon size={iconSize} />
            </ToolbarButton>
             <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')} title="Remove Link">
                <Unlink size={iconSize} />
            </ToolbarButton>
        </div>
        <div className="hidden md:flex flex-1"></div>
        <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => window.print()} 
            className="text-slate-500 hover:text-slate-900 ml-auto md:ml-0 flex items-center gap-2 h-8"
        >
            <Printer size={16} />
            <span className="text-xs font-medium hidden sm:inline">Print</span>
        </Button>
      </div>
      <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
        <DialogContent className="sm:max-w-md top-[20%] translate-y-0">
          <DialogHeader>
            <DialogTitle>Insert Hyperlink</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-2">
            <Label htmlFor="link-url" className="sr-only">URL</Label>
            <Input
              id="link-url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com"
              onKeyDown={(e) => { if(e.key === 'Enter') saveLink(); }}
              autoFocus
            />
          </div>
          <DialogFooter className="flex-row justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsLinkModalOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={saveLink}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenuBar;