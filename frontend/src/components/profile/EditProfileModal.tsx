import EditProfileForm from "../../pages/EditProfileForm";
import { MdOutlineCancel } from "react-icons/md";

interface ModalProps {
  onClose: () => void;
}

export default function ModalBox({ onClose }: ModalProps) {
  return (
    <div className="fixed z-20 top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-70" onClick={onClose} />
        <div className="relative bg-white rounded-md overflow-hidden max-w-md w-full mx-4 ">
        <MdOutlineCancel className="absolute right-2 top-2 w-8 h-8 text-zinc-300 hover:text-gray-500 cursor-pointer" onClick={onClose}/>
        <EditProfileForm />
      </div>
    </div>
  );
}
