import React from "react";
import { Button } from "antd";

type ModalProps = {
  title: string;
  handleLogin: () => void;
};

const ModalComponent: React.FC<ModalProps> = ({
  title,
  handleLogin,
}: ModalProps) => {
  //   setIsModalOpen(true);
  // };

  return (
    <>
      <Button size="large" type="primary" onClick={handleLogin}>
        {title}
      </Button>
    </>
  );
};

export default ModalComponent;
