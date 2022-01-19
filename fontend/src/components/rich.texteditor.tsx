import { useState } from "react";
import ReactQuill from "react-quill";

export interface IEditorModules {
  toolbar: Array<any>;
  clipboard: object;
}
export interface IRichTextEditor {
  htmlString: string;
}

const RichTextEditor: React.FC<IRichTextEditor> = ({
  htmlString,
}) => {
  const [content, setContent] = useState<string>(htmlString);

  const [editorModules] = useState<IEditorModules>({
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  });

  const editorFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const handleChange = (value: any) => {
    setContent(value);
  };
  return (
    <ReactQuill
      value={content}
      onChange={handleChange}
      theme="snow"
      modules={editorModules}
      formats={editorFormats}
      placeholder={"Write a comment"}
    />
  );
};
export default RichTextEditor;
