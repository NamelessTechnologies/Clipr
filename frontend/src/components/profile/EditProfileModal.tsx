import CreateAccount from "../../pages/CreateAccount";
import EditProfileForm from "../../pages/EditProfileForm";

interface ModalProps {
  onClose: () => void;
}

export default function ModalBox({ onClose }: ModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-70">
      <div className="bg-white rounded-md overflow-hidden max-w-md w-full mx-4">
        <nav className="bg-black text-white flex justify-between px-4 py-2">
          <span className="text-lg">Edit Profile</span>
          <button
            className="bg-gray-300 bg-opacity-50 py-1 px-2 hover:bg-gray-500 hover:bg-opacity-70 transition-all rounded-full text-sm"
            onClick={onClose}
          >
            &#10005;
          </button>
        </nav>
       
       <EditProfileForm />
      </div>
    </div>
  );
};