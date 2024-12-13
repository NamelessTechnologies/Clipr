import EditProfileForm from "../../pages/EditProfileForm";
import { RxCross2  } from "react-icons/rx";

interface ModalProps {
  onClose: () => void;
}

export default function ModalBox({ onClose }: ModalProps) {
  return (
    <div className="fixed z-20 top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" onClick={onClose} />
        <div className="relative bg-white rounded-md overflow-hidden max-w-md w-full mx-4 ">
        <RxCross2 className={`absolute top-2 right-2 rounded-md w-8 h-8 text-white hover:cursor-pointer hover:text-zinc-400`} onClick={onClose}/>
        <EditProfileForm />
      </div>
    </div>
  );
}
