import { BsArrowLeftShort } from 'react-icons/bs';
import { IoMdHome } from "react-icons/io";
import { AiFillEnvironment } from 'react-icons/ai';
import { RiDashboardFill } from 'react-icons/ri';
import { PiCompassLight } from "react-icons/pi";
import { MdPeopleAlt } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { MdInfo } from "react-icons/md";

import { useState } from 'react';


function Sidebar() {
    const [open, setOpen] = useState(true);

    const Menus = [
        { title: "For You", icon: <IoMdHome/> },
        { title: "Explore", icon: <PiCompassLight/> },
        { title: "Friends", icon: <MdPeopleAlt/> },
        { title: "Messages", icon: <BiMessageDetail/> },
        { title: "Info", icon: <MdInfo/>, info: true }
    ]

    return (
    <div className='flex'>
        <div className={`bg-navbar h-screen p-5 pt-8 ${open ? "w-60" : "w-20"} duration-300 relative border-white border-r`}>
            <BsArrowLeftShort className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-1/3 border-2 
                                          cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}/>

            <div className='inline-flex'>
                <AiFillEnvironment className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-300 ${open && "rotate-[360deg]"}`}/>
                <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>Clipr</h1>
            </div>

            <ul className="pt-2">
                {Menus.map((menu, index) => (
                    <>
                        <li key={index} 
                            className={`text-white text-sm flex item-center gap-x-4 cursor-pointer p-2 
                        hover:bg-gray-700 rounded-md ${menu.info ? "mt-96" : "mt-4"}`}>
                            <span className='text-2xl block float-left'>
                                {menu.icon ? menu.icon : <RiDashboardFill/>}
                            </span>
                            <span className={`text-lg font-medium flex-1 duration-300 ${!open && "hidden"}`}>{menu.title}</span>
                        </li>
                    </>
                ))}
            </ul>  

        </div>
    </div>
    )
}

export { Sidebar }