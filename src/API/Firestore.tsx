/* eslint-disable @typescript-eslint/no-explicit-any */
import { firestore, auth } from "../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";

const docs = collection(firestore, "docs");

type payloadType = {
  value: string;
  title: string;
};

export const createDoc = (payload: payloadType) => {
  addDoc(docs, { ...payload, userName: auth.currentUser?.displayName });
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
  updateDoc(docToEdit, { payload });
};

export const getCurentDoc = (id: string, setcurrentDocument: any) => {
  const docToGet = doc(docs, id);

  getDoc(docToGet)
    .then((response) => {
      setcurrentDocument(response.data());
    })
    .catch((err) => {
      console.log(err);
    });
};
