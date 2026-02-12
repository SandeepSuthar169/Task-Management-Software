import React, { useState } from "react";
import { FaDiagramProject } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { MdLogin } from "react-icons/md";
import { BsPersonPlusFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { User, Code, LogOut, LogIn } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js"
import { Link } from 'lucide-react';

function Navbar() {

  const {authUser} = useAuthStore()
  
  return (
    <nav className="sticky top-0 z-50 w-full py-5">
      <div className="flex w-full justify-between mx-auto max-w-4xl bg-black/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-gray-200/10 p-4 rounded-2xl">
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          {/* <FaDiagramProject className="text-3xl gap-3 text-orange-700" /> */}
          <span className="text-lg md:text-2xl font-bold tracking-tight text-white hidden md:block">FlowBoard</span>
        </Link>

        {/* User Profile and Dropdown */}
        <div className="flex items-center gap-8">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar flex flex-row ">
              <div className="w-10 rounded-full ">
                <img
                  src={
                    authUser?.image ||
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Fweb-design-and-development-2-6%2F512%2F87-1024.png&f=1&nofb=1&ipt=bc599ab4939712f61b120f5b3cb971f159b76e06fdab8ca67ed0640c21c7158c"
                  }
                  alt="User Avatar"
                  className="object-cover"
                />
              </div>
           
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52 space-y-3">
              <li>
                  <NavLink to="/login" className={"flex items-center"}>
                    <div className="btn btn-primary hover:bg-primary hover:text-white">
                        <LogIn className="w-5 h-4 mr-2" />
                      LogIn
                    </div>
                  </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
























// import React, { useState } from "react";
// import { FaDiagramProject } from "react-icons/fa6";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { FiHome } from "react-icons/fi";
// import { MdLogin } from "react-icons/md";
// import { BsPersonPlusFill } from "react-icons/bs";


// function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <nav className="w-full bg-gray-900 text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
          
//           <div className="flex items-center gap-2">
//             <FaDiagramProject className="text-3xl gap-3 text-orange-700" />
//             <h2 className=" font-semibold text-orange-400 ">FlowBoard</h2>
//           </div>

//           <div className="hidden md:flex gap-6">
//             <button className="hover:text-orange-400 transition flex items-center gap-2 text-right text-orange-400"><FiHome className="text-orange-400"/>Home
//             </button>
//             <button className="hover:text-orange-400 transition flex items-center gap-2 text-right text-orange-400"><MdLogin className="text-orange-400" />Login</button>
//             <button className="hover:bg-pink-500 transition flex items-center gap-2 text-right border text-white border-amber-600 bg-rose-500 py-2 px-3 rounded-xl"><BsPersonPlusFill className="text-white size-5"/>Sign Up</button>

//           </div>

//           <div className="md:hidden">
//             <button onClick={() => setOpen(!open)}>
//               {open ? <FaTimes size={20} /> : <FaBars size={20} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {open && (
//         <div className="md:hidden bg-neutral-950 px-4 pb-4 flex flex-col gap-3 py-3">
//            <button className="hover:text-orange-400 transition flex items-center gap-2 text-right text-orange-400"><FiHome className="text-orange-400"/>Home</button>
//             <button className="hover:text-orange-400 transition flex items-center gap-2 text-right text-orange-400"><MdLogin className="text-orange-400" />Login</button>
//             <button className="hover:bg-pink-500 transition flex items-center gap-2 text-right border text-white border-amber-600 bg-rose-500 py-2 px-3 rounded-xl"><BsPersonPlusFill className="text-white size-5"/>Sign Up</button>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;
