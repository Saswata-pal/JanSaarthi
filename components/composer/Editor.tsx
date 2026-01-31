"use client";
import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { marked } from 'marked';
import MenuBar from './menuBar';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

const Editor = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [jsonState, setJsonState] = useState(null);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    editorProps: {
      attributes: {
        class: `prose prose-zinc max-w-none focus:outline-none min-h-[200mm] prose-headings:font-title prose-headings:font-bold  prose-h1:text-4xl prose-h2:text-2xl prose-p:text-base`,
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // @ts-ignore
      setJsonState(editor.getJSON());
    },
  });

  const generateDraft = async () => {
    if (!editor || !prompt) return;
    setIsGenerating(true);
    editor.commands.setContent('<p><em>AI is writing...</em></p>');

    await new Promise(r => setTimeout(r, 1000));
    const markdownResponse = `
# Resignation Letter

**Date:** ${new Date().toLocaleDateString()}

Dear Manager,

I am writing to formally resign from my position.

* Last day: 2 weeks from now
* Reason: New opportunity

Thank you for the guidance.
    `;
    const html = marked.parse(markdownResponse);
    editor.commands.setContent(html);
    setIsGenerating(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="w-1/3 min-w-[300px] bg-white border-r border-gray-200 p-6 flex flex-col z-10 shadow-xl">
        <h2 className="text-xl font-bold mb-4">AI Writer</h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-32 p-3 border rounded mb-4 text-sm"
          placeholder="What should the letter say?"
        />
        <button
          onClick={generateDraft}
          disabled={isGenerating}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          {isGenerating ? 'Generating...' : 'Generate Draft'}
        </button>
        
        {/* DEBUG: Show the synched state */}
        <div className="mt-auto pt-4 border-t">
            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Live JSON State</p>
            <div className="text-[10px] font-mono h-32 overflow-auto bg-gray-50 p-2 rounded border">
                {JSON.stringify(jsonState, null, 2)}
            </div>
        </div>
      </div>

      {/* CANVAS */}
      <div className="flex-1 bg-gray-100 overflow-y-auto p-8 flex justify-center">
            <div className="w-[210mm] min-h-[297mm] bg-white shadow-lg flex flex-col">
                
                {/* Menu Bar with Alignment Tools */}
                <MenuBar editor={editor} />

                <div 
                    className="flex-1 p-[20mm] pt-0 cursor-text" 
                    onClick={() => editor?.commands.focus()}
                >
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>

    </div>
  );
};

export default Editor;