import { useEffect } from "react";
import ToolbarPlugin from "./plugins/toolbarPlugin";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $insertNodes } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const theme = {
  ltr: "ltr",
  rtl: "rtl",
  paragraph: "editor-paragraph",
  quote: "editor-quote",
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5",
  },
  list: {
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol ml-4 list-decimal",
    ul: "editor-list-ul ml-4 list-disc",
    listitem: "editor-listitem",
  },
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    underline: "editor-text-underline",
    strikethrough: "editor-text-strikethrough",
    code: "editor-text-code",
  },
  code: "editor-code",
  link: "editor-link",
};

function Placeholder({ placeholder }) {
  return (
    <div className="absolute top-[15px] left-[15px] text-[#999] pointer-events-none select-none">
      {placeholder}
    </div>
  );
}

function onError(error) {
  console.error(error);
}

const editorConfig = {
  namespace: "MyEditor",
  theme,
  onError,
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    AutoLinkNode,
    LinkNode,
  ],
};

function EditorContent({ value, onChangeEvent, placeholder }) {
  const [editor] = useLexicalComposerContext();

  const handleEditorChange = (editorState) => {
    editorState.read(() => {
      const htmlString = $generateHtmlFromNodes(editor);
      onChangeEvent(htmlString);
    });
  };

  useEffect(() => {
    if (value && editor) {
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(value, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);

        $getRoot().clear();
        $getRoot().select();
        $insertNodes(nodes);
      });
    }
  }, [value, editor]);

  return (
    <>
      <ToolbarPlugin />
      <div className="relative bg-white">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-32 p-[15px] outline-none" />
          }
          placeholder={<Placeholder placeholder={placeholder} />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={handleEditorChange} />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </div>
    </>
  );
}

function Editor({ value, onChangeEvent, placeholder }) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="rounded-xl overflow-hidden">
        <EditorContent
          value={value}
          onChangeEvent={onChangeEvent}
          placeholder={placeholder}
        />
      </div>
    </LexicalComposer>
  );
}

export default Editor;
