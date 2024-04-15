/* eslint-disable @typescript-eslint/no-explicit-any */
import { firestore, auth } from "../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDocs,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import mammoth from "mammoth";

//import firebase from "firebase/app";

const docs = collection(firestore, "docs");

type payloadType = {
  value: string;
  title: string;
};

export const createDoc = (payload: payloadType) => {
  addDoc(docs, {
    ...payload,
    userName: auth.currentUser?.displayName,
  });
};

export const getDocuments = (setDocs: any) => {
  getDocs(docs)
    .then((response) => {
      setDocs(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editDoc = (
  payload: { value: string; title: string },
  id: string
) => {
  const docToEdit = doc(docs, id);
  updateDoc(docToEdit, payload);
};

export const getCurrentDoc = (id: string, setCurrentDocument: any) => {
  const docToGet = doc(docs, id);

  getDoc(docToGet)
    .then((response) => {
      setCurrentDocument(response.data());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteDocument = async (id: string) => {
  const docToDelete = doc(docs, id);
  await deleteDoc(docToDelete);
};

export const handleFileChange = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setValue: React.Dispatch<React.SetStateAction<string>>
) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target) {
        const result = event.target.result as ArrayBuffer;
        // Chuyển đổi tệp .docx thành HTML bằng mammoth
        const { value } = await mammoth.convertToHtml({ arrayBuffer: result });
        // Lưu nội dung HTML vào Firestore
        //await addDoc(collection(firestore, 'docs'), { content: result });
        await addDoc(collection(firestore, "docs"), { value });
        // Cập nhật state của nội dung để hiển thị trên trang
        setValue(value.substring(0, 100));
      }
    };
    reader.readAsArrayBuffer(file);
  }
};

//   event: React.ChangeEvent<HTMLInputElement>,
//   setValue: React.Dispatch<React.SetStateAction<string>>
// ) => {
//   const file = event.target.files?.[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = async (event) => {
//       if (event.target) {
//         const result = event.target.result as ArrayBuffer;
//         const { value } = await mammoth.convertToHtml({ arrayBuffer: result });

//         // Phân tích HTML và lấy ra văn bản
//         const parser = new DOMParser();
//         const htmlDoc = parser.parseFromString(value, "text/html");
//         const text = htmlDoc.body.textContent || "";

//         // Lưu văn bản vào Firestore
//         await addDoc(collection(firestore, "docs"), { value });

//         // Cập nhật state của nội dung để hiển thị trên trang
//         setValue(text.substring(0, 100));
//       }
//     };
//     reader.readAsArrayBuffer(file);
//   }
// };
