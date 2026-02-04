"use client";
import { Editor } from '@tiptap/react';
import { Download, Copy, Save, Languages } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import React, { useEffect, useState, useRef } from 'react';

interface RightSidebarProps {
  editor: Editor | null;
}

const draftOptions = ['Application', 'Appeal', 'Complaint', 'RTI', 'Grievance'];
const languages = [
  { id: 'english', label: 'English' },
  { id: 'hindi', label: 'Hindi' },
  { id: 'bengali', label: 'Bengali' }, 
];

export const RightSidebar = ({ editor }: RightSidebarProps) => {
  const [draftType, setDraftType] = useState('application');
  const [tone, setTone] = useState<'polite' | 'formal'>('polite');
  const [language, setLanguage] = useState('english');
  const [wordCount, setWordCount] = useState(0);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!editor) return;
    const handleUpdate = () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        setWordCount(editor.storage.characterCount.words());
      }, 500);
    };
    editor.on('update', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [editor]);
  return (
    <div className="flex flex-col h-full p-6 bg-background border-l border-border">
      <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-6">
        Draft Settings
      </h3>
      
      <div className="space-y-8">
        <div>
          <Label className="block text-sm font-medium mb-2 text-foreground">Draft Type</Label>
          <Select value={draftType} onValueChange={setDraftType}>
            <SelectTrigger className="w-full h-10 bg-background border-input ring-offset-background focus:ring-ring">
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              {draftOptions.map((type) => (
                <SelectItem 
                  key={type} 
                  value={type.toLowerCase()} 
                  className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground mb-3 block">Tone</Label>
          <div className="flex gap-2">
            <Button
              variant={tone === 'polite' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTone('polite')}
              className="flex-1"
            >
              Polite
            </Button>
            <Button
              variant={tone === 'formal' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTone('formal')}
              className="flex-1"
            >
              Formal
            </Button>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground block mb-3">Language</Label>
          <div className="flex flex-col gap-2">
            {languages.map((lang) => {
              const isSelected = language === lang.id;
              return (
                <div 
                  key={lang.id}
                  onClick={() => setLanguage(lang.id)}
                  className={`
                    flex items-center justify-between p-3 rounded-md cursor-pointer transition-all border
                    ${isSelected 
                      ? 'border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm' 
                      : 'border-border hover:bg-accent hover:text-accent-foreground'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Languages className={`h-4 w-4 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                      {lang.label}
                    </span>
                  </div>
                  
                  {isSelected && (
                    <div className="h-2 w-2 rounded-full bg-primary shadow-sm"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-4 bg-muted/30 rounded-md border border-border flex justify-between items-center text-sm">
          <span className="text-muted-foreground font-medium">Word Count</span>
          <Badge variant="secondary" className="font-mono bg-background border border-border text-foreground">
            {wordCount}
          </Badge>
        </div>
      </div>

      <div className="pt-6 border-t border-border mt-auto space-y-3">
        <Button className="w-full font-medium h-11 shadow-md">
          <Download className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Download PDF</span>
          <span className="inline sm:hidden">Download</span>
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-10 text-foreground hover:bg-accent hover:text-accent-foreground">
            <Save className="h-4 w-4 mr-2" /> Save
          </Button>
          <Button variant="outline" className="h-10 text-foreground hover:bg-accent hover:text-accent-foreground">
            <Copy className="h-4 w-4 mr-2" /> Copy
          </Button>
        </div>
      </div>
    </div>
  );
};