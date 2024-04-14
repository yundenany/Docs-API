import "./index.scss";
import { getDocuments } from "../../API/Firestore";
//import FileSaver from "file-saver"; // Import thư viện file-saver
import { useEffect, useState, useCallback } from "react";
// import {
//   DocumentEditorContainerComponent,
//   Toolbar,
//   Inject,
// } from "@syncfusion/ej2-react-documenteditor";

type OpenDocType = {
  openDoc: (id: string, value: string, title: string) => void;
};

export default function DocsList({ openDoc }: OpenDocType) {
  const [docs, setDocs] = useState([
    {
      title: "",
      id: "",
      userName: "",
      value: "",
    },
  ]);
  const getDocs = async () => {
    await getDocuments(setDocs);
  };
  useEffect(() => {
    getDocs();
  }, []);

  const handleOpenDoc = useCallback(
    (id: string, title: string, value: string) => {
      openDoc(id, title, value);
    },
    [openDoc]
  );

  return (
    <div className="docs-main">
      {docs.map((doc) => {
        return (
          <div
            key={doc.id}
            onClick={() => handleOpenDoc(doc.id, doc.title, doc.value)}
            className="doc-card"
          >
            <p
              className="doc-content"
              dangerouslySetInnerHTML={{
                __html: doc.value.substring(0, 100),
              }}
            ></p>
            <p className="doc-title">{doc.title}</p>
          </div>
        );
      })}
    </div>
  );
}
