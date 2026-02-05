import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
  COMMAND_PRIORITY_LOW,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from "@lexical/list";
import { activeStyle, disabledStyle, buttonStyle } from "./pluginsStyle";
import { formatHeading, formatParagraph, formatQuote } from "./pluginFormat";

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat("bold"));
            setIsItalic(selection.hasFormat("italic"));
            setIsUnderline(selection.hasFormat("underline"));
            setIsStrikethrough(selection.hasFormat("strikethrough"));
          }
        });
      }),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor]);

  return (
    <div className="flex gap-1 p-2.5 bg-[#f8f9fa] border-b border-[#ddd] flex-wrap items-center">
      <button
        disabled={!canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND)}
        style={canUndo ? buttonStyle : disabledStyle}
        title="Undo (Ctrl+Z)"
        type="button"
      >
        ↶ Undo
      </button>
      <button
        disabled={!canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND)}
        style={canRedo ? buttonStyle : disabledStyle}
        title="Redo (Ctrl+Y)"
        type="button"
      >
        ↷ Redo
      </button>

      <div
        style={{
          width: "1px",
          height: "24px",
          background: "#ddd",
          margin: "0 4px",
        }}
      />

      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        style={isBold ? activeStyle : buttonStyle}
        title="Bold (Ctrl+B)"
        type="button"
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        style={isItalic ? activeStyle : buttonStyle}
        title="Italic (Ctrl+I)"
        type="button"
      >
        <em>I</em>
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        style={isUnderline ? activeStyle : buttonStyle}
        title="Underline (Ctrl+U)"
        type="button"
      >
        <u>U</u>
      </button>
      <button
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
        style={isStrikethrough ? activeStyle : buttonStyle}
        title="Strikethrough"
        type="button"
      >
        <s>S</s>
      </button>

      <div
        style={{
          width: "1px",
          height: "24px",
          background: "#ddd",
          margin: "0 4px",
        }}
      />

      <button
        onClick={() => formatParagraph(editor)}
        style={buttonStyle}
        type="button"
      >
        Paragraph
      </button>
      <button
        onClick={() => formatHeading("h1", editor)}
        style={buttonStyle}
        type="button"
      >
        H1
      </button>
      <button
        onClick={() => formatHeading("h2", editor)}
        style={buttonStyle}
        type="button"
      >
        H2
      </button>
      <button
        onClick={() => formatHeading("h3", editor)}
        style={buttonStyle}
        type="button"
      >
        H3
      </button>

      <div
        style={{
          width: "1px",
          height: "24px",
          background: "#ddd",
          margin: "0 4px",
        }}
      />

      <button
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)}
        style={buttonStyle}
        title="Bullet List"
        type="button"
      >
        • List
      </button>
      <button
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND)}
        style={buttonStyle}
        title="Numbered List"
        type="button"
      >
        1. List
      </button>
      <button
        onClick={() => formatQuote(editor)}
        style={buttonStyle}
        title="Quote"
        type="button"
      >
        " Quote
      </button>

      <div
        style={{
          width: "1px",
          height: "24px",
          background: "#ddd",
          margin: "0 4px",
        }}
      />

      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
        style={buttonStyle}
        title="Align Left"
        type="button"
      >
        ⫷ Left
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
        style={buttonStyle}
        title="Align Center"
        type="button"
      >
        ☰ Center
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
        style={buttonStyle}
        title="Align Right"
        type="button"
      >
        ⫸ Right
      </button>
      <button
        onClick={() =>
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
        }
        style={buttonStyle}
        title="Justify"
        type="button"
      >
        ≡ Justify
      </button>
    </div>
  );
}

export default ToolbarPlugin;
