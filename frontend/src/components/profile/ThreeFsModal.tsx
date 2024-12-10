// import { useNavigate } from "react-router-dom";
// import { uri } from "../../App";
import React from "react";


interface propTypes {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ThreeFsModal: React.FC<propTypes> = ({ open, onClose, children }) => {
  console.log(open, onClose, children);

  return (
    <div 
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center 
      bg-gray-500 bg-opacity-70 ${open ? "visible bg-black/20" : "invisible"}`} 
      onClick={onClose}>
        <div
          className={`bg-gray-500 rounded-lg shadow p-6 transition-all max-w-md
          ${open ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
          onClick={(e) => e.stopPropagation()}>
          <button 
          className={`absolute top-2 right-2 py-2 px-2 border border-neutral-200 rounded-md 
          text-gray-400 bg-gray-500 bg-opacity-70`}
          onClick={onClose}>
            x
          </button>
          {children}
        </div>
    </div>
  );
}

export { ThreeFsModal }