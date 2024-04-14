import "./index.scss";
import { MdKeyboardBackspace } from "react-icons/md";
import ReactQuill from "react-quill";
import { useState, useRef, useEffect } from "react";
import EditorToolbar, { modules, formats } from "../../Toolbar";
import "react-quill/dist/quill.snow.css";
import { editDoc, getCurrentDoc } from "../../API/Firestore";
// import {
//   DocumentEditorContainerComponent,
//   Toolbar,
//   Inject,
// } from "@syncfusion/ej2-react-documenteditor";

export default function EditDoc({ handleEdit, id }: functionInterface) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quillRef = useRef<any>(null);
  //const quillRef = useRef<ReactQuill & { getEditor: () => unknown } | null>(null);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [currentDocument, setCurrentDocument] = useState({
    title: "",
    value: "",
  });

  function editDocument() {
    const payload = {
      value,
      title,
    };
    editDoc(payload, id);
  }

  const getCurentDocument = () => {
    getCurrentDoc(id, setCurrentDocument);
  };

  useEffect(() => {
    const debounced = setTimeout(() => {
      editDocument();
    }, 2000);

    return () => clearTimeout(debounced);
  }, [value, title]);

  useEffect(() => {
    getCurentDocument();
    if (quillRef.current) {
      quillRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setTitle(currentDocument.title);
    setValue(currentDocument.value);
  }, [currentDocument]);

  console.log(currentDocument);

  return (
    <div className="edit-container">
      <MdKeyboardBackspace
        onClick={() => handleEdit()}
        size={30}
        className="react-icon"
      />

      <input
        onChange={(event) => {
          setTitle(event?.target.value);
        }}
        value={title}
        className="title-input"
        placeholder="Untitled"
      />

      <div className="quill-container">
        <EditorToolbar />
        <ReactQuill
          className="react-quill"
          theme="snow"
          ref={quillRef}
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
        />
      </div>
    </div>
  );
}
