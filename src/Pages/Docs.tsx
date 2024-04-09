import React from "react";
import ModalComponent from "../Components/Modal";
import { loginWithGoogle } from "../API/Auth";
import useCheckAuth from "../Hooks/useCheckAuth";
import Document from "../Components/Document";

const Docs: React.FC = () => {
  const handleLogin = () => {
    loginWithGoogle();
  };

  const { isAuthenticated, userData } = useCheckAuth();
  console.log(userData);

  return (
    <div className="docs-container">
      {!isAuthenticated ? (
        <ModalComponent
          title="Login with Google"
          handleLogin={handleLogin}
        ></ModalComponent>
      ) : (
        <>
          <Document photoURL={userData?.photoURL} />
        </>
      )}
    </div>
  );
};

export default Docs;
