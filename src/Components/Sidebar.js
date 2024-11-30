import React, { useState } from "react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleSlide = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className="mt-2 p-5 bg-gray-800 h-screen rounded-lg ">
            <button className="text-white bg-red-600 px-3 py-1 rounded-lg" onClick={handleSlide}> X</button>

        {
        isOpen && 
        <div>
            <ul className="place-items-start mt-8">
            <li className="pt-1 bg-orange-600 mt-2 rounded-lg px-3 py-2 w-full hover:bg-orange-700">Documents</li>
            <li className="pt-1 bg-orange-600 mt-2 rounded-lg px-3 py-2 w-full hover:bg-orange-700">Pictures</li>
            <li className="pt-1 bg-orange-600 mt-2 rounded-lg px-3 py-2 w-full hover:bg-orange-700">Music</li>
        </ul>
        </div>
        }
        </div>
    )
}

export default Sidebar;