import { Link } from 'react-router-dom';
import { MdFileUpload } from "react-icons/md";

function NavBar() {
    return (
    <nav className="bg-navbar text-white py-6 px-6 border-b border-white">
        <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">The Nameless</Link>

            <ul className="flex space-x-4">
            <li>
                <Link to="Clipr/Upload"><MdFileUpload className='w-7 h-7 rounded-full hover:bg-gray-600'/></Link>
            </li>
            <li>
                <Link to="Clipr/Tables" className="text-lg hover:bg-gray-600 px-3 py-2 rounded">Tables</Link>
            </li>  
            <li>
                <Link to="Clipr/SignUp" className="text-lg hover:bg-gray-600 px-3 py-2 rounded">Sign Up</Link>
            </li>   
            <li>
                <Link to="Clipr/LogIn" className="text-lg hover:bg-gray-600 px-3 py-2 rounded">Log In</Link>
            </li>
            <li>
                <Link to="Clipr/SetReceiver" className="text-lg hover:bg-gray-600 px-3 py-2 rounded">Messages</Link>
            </li>

            </ul>
        </div>
    </nav>
    )
}

export { NavBar }