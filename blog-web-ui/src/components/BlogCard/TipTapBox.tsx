"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Button } from "../ui/button";

type TiptapEditorProps = {
  initialValue?: string;
  onChange: (html: string) => void;
};

const TiptapEditor: React.FC<TiptapEditorProps> = ({
  initialValue = "",
  onChange,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    immediatelyRender: false, // This prevents SSR from triggering a render
    content: initialValue,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) return <p>Loading editor...</p>;

  return (
    <div>
      <div className="flex items-center space-x-2 mb-2">
        <Button
          variant={"outline"}
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 border rounded ${
            editor.isActive("bold") ? "bg-gray-200" : ""
          }`}
        >
          B
        </Button>

        <Button
          variant={"outline"}
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 border rounded ${
            editor.isActive("italic") ? "bg-gray-200" : ""
          }`}
        >
          I
        </Button>

        <Button
          variant={"outline"}
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 border rounded ${
            editor.isActive("underline") ? "bg-gray-200" : ""
          }`}
        >
          U
        </Button>

        <Button
          variant={"outline"}
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 border rounded ${
            editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""
          }`}
        >
          Left
        </Button>
        <Button
          variant={"outline"}
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2 border rounded ${
            editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""
          }`}
        >
          Center
        </Button>
        <Button
          type="button"
          variant={"outline"}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2 border rounded ${
            editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""
          }`}
        >
          Right
        </Button>
        <Button
          variant={"outline"}
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`p-2 border rounded ${
            editor.isActive({ textAlign: "justify" }) ? "bg-gray-200" : ""
          }`}
        >
          Justify
        </Button>

        <select
          onChange={(e) => {
            const level = parseInt(e.target.value) as any;
            if (level === 0) {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level }).run();
            }
          }}
          defaultValue="0"
          className="p-2 border rounded"
        >
          <option value="0">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
        </select>
      </div>

      <EditorContent editor={editor} className="border  rounded " />
    </div>
  );
};

export default TiptapEditor;
