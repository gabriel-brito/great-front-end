import { useState } from "react";

export default function ModalDialog({ children, title }) {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  if (!openModal) {
    return <button onClick={handleModal}>Show modal</button>;
  }

  return (
    <div className="backdrop">
      <div className="modal">
        <h1>{title}</h1>

        {children}

        <button onClick={handleModal}>Close</button>
      </div>
    </div>
  );
}
