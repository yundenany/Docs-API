import "./index.scss";
import { MdKeyboardBackspace } from "react-icons/md";
import ReactQuill from "react-quill";
import { useState, useRef, useEffect } from "react";
import EditorToolbar, { modules, formats } from "../../Toolbar";
import "react-quill/dist/quill.snow.css";
import { editDoc, getCurentDoc } from "../../API/Firestore";

export default function EditDoc({ handleEdit, id }: functionInterface) {
  const quillRef = useRef<ReactQuill>(null);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [currentDocument, setCurrentDocument] = useState({
    title: "",
    value: "",
  });

  function editDoccument() {
    const payload = {
      value,
      title,
    };
    editDoc(payload, id);
  }

  const getCurentDocument = () => {
    getCurentDoc(id, setCurrentDocument);
  };

  useEffect(() => {
    const debounced = setTimeout(() => {
      editDoccument();
    }, 2000);

    return () => clearTimeout(debounced);
  }, [value, title]);

  useEffect(() => {
    getCurentDocument();
    quillRef.current?.focus();
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
        className="title-ipnut"
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
