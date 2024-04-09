import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

export default function useCheckAuth() {
  const [isAuthenticated, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({
    photoURL: "",
  });
  useEffect(() => {
    onAuthStateChanged(auth, (response: User | null) => {
      if (response) {
        setUserData({
          photoURL: response.photoURL || "",
        });
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  return { isAuthenticated, userData };
}
