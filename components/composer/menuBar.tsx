import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  List, 
  ListOrdered, 
  Undo, 
  Redo,
  Heading1,
  Heading2
} from 'lucide-react';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  // Button Base Class
  const btnClass = (isActive: boolean) => 
    `p-2 rounded hover:bg-gray-100 transition-colors ${
      isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
    }`;

  const iconSize = 18;

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 p-2 mb-4 sticky top-0 bg-white z-50">
      
      {/* --- GROUP 1: BASIC FORMATTING --- */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={btnClass(editor.isActive('bold'))}
        title="Bold (Ctrl+B)"
      >
        <Bold size={iconSize} />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={btnClass(editor.isActive('italic'))}
        title="Italic (Ctrl+I)"
      >
        <Italic size={iconSize} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={btnClass(editor.isActive('underline'))}
        title="Underline (Ctrl+U)"
      >
        <Underline size={iconSize} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={btnClass(editor.isActive('strike'))}
        title="Strike"
      >
        <Strikethrough size={iconSize} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-2"></div>

      {/* --- GROUP 2: ALIGNMENT --- */}
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={btnClass(editor.isActive({ textAlign: 'left' }))}
        title="Align Left"
      >
        <AlignLeft size={iconSize} />
      </button>
      
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={btnClass(editor.isActive({ textAlign: 'center' }))}
        title="Align Center"
      >
        <AlignCenter size={iconSize} />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={btnClass(editor.isActive({ textAlign: 'right' }))}
        title="Align Right"
      >
        <AlignRight size={iconSize} />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={btnClass(editor.isActive({ textAlign: 'justify' }))}
        title="Justify"
      >
        <AlignJustify size={iconSize} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-2"></div>

      {/* --- GROUP 3: HEADINGS & LISTS --- */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={btnClass(editor.isActive('heading', { level: 1 }))}
        title="Heading 1"
      >
        <Heading1 size={iconSize} />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btnClass(editor.isActive('heading', { level: 2 }))}
        title="Heading 2"
      >
        <Heading2 size={iconSize} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnClass(editor.isActive('bulletList'))}
        title="Bullet List"
      >
        <List size={iconSize} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btnClass(editor.isActive('orderedList'))}
        title="Numbered List"
      >
        <ListOrdered size={iconSize} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-2"></div>

      {/* --- GROUP 4: ACTIONS --- */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-2 text-gray-400 hover:text-gray-700 disabled:opacity-30"
        title="Undo (Ctrl+Z)"
      >
        <Undo size={iconSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-2 text-gray-400 hover:text-gray-700 disabled:opacity-30"
        title="Redo (Ctrl+Y)"
      >
        <Redo size={iconSize} />
      </button>

    </div>
  );
};

export default MenuBar;